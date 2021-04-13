import React, { createContext, useContext, useState } from 'react'
import formatMoney from '../utils/formatMoney'
import calcOrderTotal from '../utils/calcOrderTotal'
const CartContext = createContext()
const CartProvider = CartContext.Provider

function CartStateProvider({ children }) {
  // Closed cart by default
  const [cartOpen, setCartOpen] = useState(false)
  const [cartContents, setCartContents] = useState([])

  function toggleCart() {
    setCartOpen(!cartOpen)
  }

  function closeCart() {
    setCartOpen(false)
  }

  function openCart() {
    setCartOpen(true)
  }

  function addToCart({ quantity, coffee, grind, unitPrice, size }) {
    // quantity will be -1 or +1
    if (!cartContents.length) {
      setCartContents((cartContents) => [
        ...cartContents,
        { quantity, coffee, grind, unitPrice, size },
      ])
      return
    }
    //is there a match of type and grind amd size?
    const matchingCartItemIndex = cartContents.findIndex(
      (cartItem) =>
        cartItem.coffee === coffee &&
        cartItem.grind === grind &&
        cartItem.size == size
    )
    //item of same size, grind and type IS NOT in the cart already
    if (matchingCartItemIndex === -1) {
      setCartContents((cartContents) => [
        ...cartContents,
        { quantity, coffee, grind, unitPrice, size },
      ])
      return
    }
    //item of same size, grind and type IS in the cart already
    if (matchingCartItemIndex > -1) {
      //make a copy of cart,
      const cartCopy = [...cartContents]
      //take out matching item,
      const existingCartItem = cartCopy.splice(matchingCartItemIndex, 1)
      //add / (TODO : subtract) to it,
      existingCartItem[0].quantity = existingCartItem[0].quantity + quantity
      // put back in
      cartCopy.push(existingCartItem[0])
      //set To State
      setCartContents(cartCopy)
      return
    }
  }

  function removeFromCart(cartItem) {
    const cartCopy = [...cartContents]
    const newCart = cartCopy.filter((item) => {
      console.log('filter item', item)
      if (
        item.coffee === cartItem.coffee &&
        item.grind === cartItem.grind &&
        item.size === cartItem.size
      ) {
        return false
      } else return true
    })
    setCartContents(newCart)
  }

  async function processOrder(inputs, coffeePrices, paymentMethod) {
    //1. set prices on each order item and calculate order total
    //(coffeePrices is from the checkout page dynamic query of all coffees and their prices, to guard against client changing the prices in the browser state before submitting order.)

    //extract coffee name and price into array of sets of arrays [...[name, price]]
    const coffee_price = coffeePrices.map((coffee) => [
      coffee.name,
      coffee.price,
    ])
    //create object of coffeename:price
    const coffeePriceObj = Object.fromEntries(coffee_price)
    // set prices on the cart contents with the price obtained from sanity(db)
    const cartCopy = cartContents.map((cartItem) => {
      const price = coffeePriceObj[cartItem.coffee]
      const validatedUnitPrice =
        cartItem.size === 'half pound' ? price / 2 : price
      return { ...cartItem, price, unitPrice: validatedUnitPrice }
    })
    // send order with valid prices to serverless function
    const body = {
      order: cartCopy,
      total: calcOrderTotal(cartCopy),
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      mapleSyrup: inputs.mapleSyrup,
      paymentMethod: paymentMethod.id,
    }
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
    return res
  }
  const orderTotal = formatMoney(calcOrderTotal(cartContents))

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
        processOrder,
        orderTotal,
      }}
    >
      {children}
    </CartProvider>
  )
}

// make a custom hook for accessing the cart local state
function useCart() {
  // We use a consumer here to access the local state
  const all = useContext(CartContext)
  return all
}
export { CartStateProvider, useCart }
