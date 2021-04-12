import React, { createContext, useContext, useState } from 'react';
import formatMoney from '../utils/formatMoney';
import calcOrderTotal from '../utils/calcOrderTotal';
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

  function addToCart({ quantity, coffee, grind, unitPrice, size }) {
    console.log('unitPrice', unitPrice);
    // quantity will be -1 or +1
    if (!cartContents.length) {
      setCartContents((cartContents) => [
        ...cartContents,
        { quantity, coffee, grind, unitPrice, size },
      ]);
      return;
    }

    //is there a match of type and grind amd size?

    const matchingCartItemIndex = cartContents.findIndex(
      (cartItem) =>
        cartItem.coffee === coffee &&
        cartItem.grind === grind &&
        cartItem.size == size
    );
    if (matchingCartItemIndex === -1) {
      console.log('no match');
      setCartContents((cartContents) => [
        ...cartContents,
        { quantity, coffee, grind, unitPrice, size },
      ]);
      return;
    }
    if (matchingCartItemIndex > -1) {
      console.log('match');
      //make a copy of cart,
      const cartCopy = [...cartContents];
      //take out,
      const existingCartItem = cartCopy.splice(matchingCartItemIndex, 1);
      //add to it,
      existingCartItem[0].quantity = existingCartItem[0].quantity + quantity;
      // put back in
      cartCopy.push(existingCartItem[0]);
      //set To State
      setCartContents(cartCopy);
      return;
    }
  }

  function removeFromCart(cartItem) {
    console.log('cartItem', cartItem);
    const cartCopy = [...cartContents];
    const newCart = cartCopy.filter((item) => {
      console.log('filter item', item);
      if (
        item.coffee === cartItem.coffee &&
        item.grind === cartItem.grind &&
        item.size === cartItem.size
      ) {
        return false;
      } else return true;
    });
    console.log('newCart', newCart);
    setCartContents(newCart);
  }

  async function submitOrder(inputs) {
    // gather all the data
    const body = {
      order: cartContents,
      total: formatMoney(calcOrderTotal(cartContents)),
      name: inputs.name,
      email: inputs.email,
      mapleSyrup: inputs.mapleSyrup,
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
    );
    console.log('res.body', res.body.json());
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
        submitOrder,
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
