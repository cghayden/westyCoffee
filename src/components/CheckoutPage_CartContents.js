import React from 'react'
import styled from 'styled-components'
import { useCart } from './CartContext'
import TrashIcon from './Icons/TrashIcon'
import formatMoney from '../utils/formatMoney'
import CartPageStyles from '../styles/CartPageStyles'
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee'

function CheckoutPage_CartContents() {
  const { cartContents, removeFromCart, orderTotal } = useCart()
  const { availableCoffee } = useCurrentAvailableCoffee()
  console.log('availableCoffee', availableCoffee)
  return (
    <CartPageStyles>
      <header>
        <h3>Review Your Cart</h3>
      </header>
      <ul>
        {cartContents.map((cartItem, i) => (
          <CartItem
            cartItem={cartItem}
            removeFromCart={removeFromCart}
            key={`${i}-${cartItem.coffee}`}
          />
        ))}
      </ul>
      <footer>
        <h3>Total: $ {orderTotal}</h3>
      </footer>
    </CartPageStyles>
  )
}

const CartItemLi = styled.li`
  width: 100%;
  position: relative;
  .trashButton {
    position: absolute;
    top: 0;
    right: 0;
    color: red;
  }
  h3 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    grid-column: 1/-1;
    justify-self: left;
  }
  .grind {
    margin: 0.5rem;
  }
  .price {
    place-items: center;
    display: grid;
    grid-template-columns: 1fr 2ch max-content 2ch max-content;
    justify-content: end;
    grid-gap: 0.5rem;
    margin: 0.5rem;
  }
`

function CartItem({ cartItem, removeFromCart }) {
  if (!cartItem) return null
  const totalCost = formatMoney(cartItem.quantity * cartItem.unitPrice)
  return (
    <CartItemLi>
      <h3>{cartItem.coffee}</h3>
      <button
        type='button'
        className='btn-icon trashButton'
        onClick={() => {
          if (
            confirm(
              `Would you like to remove all ${cartItem.size}, ${cartItem.grind}, ${cartItem.coffee} form your cart?`
            )
          )
            removeFromCart(cartItem)
        }}
      >
        <TrashIcon />
      </button>
      <p className='grind'>{cartItem.grind}</p>
      <p className='price'>
        <span>{`${cartItem.quantity} ${cartItem.size} bag`} </span>
        <span>&times; </span>
        <span>${formatMoney(cartItem.unitPrice)} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
    </CartItemLi>
  )
}

export default CheckoutPage_CartContents
