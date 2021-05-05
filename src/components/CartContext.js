import React, { createContext, useContext, useState } from 'react';
import formatMoney from '../utils/formatMoney';
import calcOrderTotal from '../utils/calcOrderTotal';
import calcTotalPoundsInCart from '../utils/calcTotalPoundsInCart';
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee';
const CartContext = createContext();
const CartProvider = CartContext.Provider;

function CartStateProvider({ children }) {
  // Closed cart by default
  const [cartOpen, setCartOpen] = useState(false);
  const [cartContents, setCartContents] = useState([]);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  function sortCart(a, b) {
    const itemA = a.name.toUpperCase();
    const itemB = b.name.toUpperCase();
    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return comparison;
  }

  function addToCart({ quantity, name, grind, unitPrice, size, _ref }) {
    if (!cartContents.length) {
      setCartContents((cartContents) => [
        ...cartContents,
        { quantity, name, grind, unitPrice, size, _ref },
      ]);
      return;
    }
    //is there a match of type and grind amd size?
    const matchingCartItemIndex = cartContents.findIndex(
      (cartItem) =>
        cartItem.name === name &&
        cartItem.grind === grind &&
        cartItem.size == size
    );
    //item of same size, grind and type IS NOT in the cart already
    if (matchingCartItemIndex === -1) {
      // const cartCopy=[...cartContents]
      setCartContents((cartContents) =>
        [
          ...cartContents,
          { quantity, name, grind, unitPrice, size, _ref },
        ].sort(sortCart)
      );
      return;
    }
    //item of same size, grind and type IS in the cart already
    if (matchingCartItemIndex > -1) {
      //make a copy of cart,
      const cartCopy = [...cartContents];
      //take out matching item,
      const existingCartItem = cartCopy.splice(matchingCartItemIndex, 1);
      //add / (TODO : subtract) to it,
      existingCartItem[0].quantity = existingCartItem[0].quantity + quantity;
      // put back in
      cartCopy.push(existingCartItem[0]);
      cartCopy.sort(sortCart);
      //set To State
      setCartContents(cartCopy);
      return;
    }
  }

  function removeFromCart(cartItem) {
    const cartCopy = [...cartContents];
    const newCart = cartCopy.filter((item) => {
      console.log('filter item', item);
      if (
        item.name === cartItem.name &&
        item.grind === cartItem.grind &&
        item.size === cartItem.size
      ) {
        return false;
      } else return true;
    });
    setCartContents(newCart);
  }
  function emptyCart() {
    setCartContents([]);
  }
  const orderTotal = formatMoney(calcOrderTotal(cartContents));
  const totalCartPounds = calcTotalPoundsInCart(cartContents);
  const gql = String.raw;

  async function processOrder(
    billingDetails,
    shippingDetails,
    paymentMethod,
    botBait
  ) {
    // const result={error:false}
    //1. set prices on each order item and calculate order total
    //(coffeePrices is from the checkout page dynamic query of all coffees and their prices, to guard against client changing the prices in the browser state before submitting order.)

    //extract coffee name and price into array of sets of arrays [...[name, price]]
    const sanityQuery = await fetch(
      process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: gql`
            query {
              allCoffee {
                _id
                name
                price
                stock
              }
            }
          `,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log('error fetching current price data', err);
        return { error: err };
      });

    const coffee_price = sanityQuery.data.allCoffee.map((coffee) => [
      coffee.name,
      coffee.price,
    ]);
    //create object of coffeename:price
    const coffeePriceObj = Object.fromEntries(coffee_price);
    // set prices on the cart contents with the price obtained from sanity(db)
    const cartCopy = cartContents.map((cartItem) => {
      const price = coffeePriceObj[cartItem.name];
      const validatedUnitPrice =
        cartItem.size === 'half pound' ? price / 2 : price;
      return { ...cartItem, price, unitPrice: validatedUnitPrice };
    });
    // send order with valid prices to serverless function
    const body = {
      order: cartCopy,
      total: calcOrderTotal(cartCopy),
      name: billingDetails.name,
      email: billingDetails.email,
      phone: billingDetails.phone,
      shippingDetails,
      mapleSyrup: botBait,
      paymentMethod: paymentMethod.id,
      totalCartPounds,
    };
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    ).catch((err) => console.log('ERR in caught in Context', err));
    return res;
  }

  return (
    <CartProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
        cartContents,
        setCartContents,
        addToCart,
        removeFromCart,
        emptyCart,
        processOrder,
        orderTotal,
        totalCartPounds,
      }}
    >
      {children}
    </CartProvider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  // We use a consumer here to access the local state
  const all = useContext(CartContext);
  return all;
}
export { CartStateProvider, useCart };
