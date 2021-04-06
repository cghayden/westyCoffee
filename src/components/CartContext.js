import React, { createContext, useContext, useState } from 'react';

const CartContext = React.createContext();
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

  function addToCart({ quantity, coffee, grind }) {
    // quantity will be -1 or +1
    if (!cartContents.length) {
      setCartContents((cartContents) => [
        ...cartContents,
        { quantity, coffee, grind },
      ]);
      return;
    }

    //is there a match of type and grind?

    const matchingCartItemIndex = cartContents.findIndex(
      (cartItem) => cartItem.coffee === coffee && cartItem.grind === grind
    );
    if (matchingCartItemIndex === -1) {
      console.log('no match');
      setCartContents((cartContents) => [
        ...cartContents,
        { quantity, coffee, grind },
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
