import React from 'react'
import styled from 'styled-components'
import formatMoney from '../utils/formatMoney'

const CartItemLi = styled.li`
  width: 100%;
  position: relative;
  .cartItem-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h3 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    grid-column: 1/-1;
    justify-self: left;
  }
  .grind {
    /* margin: 0.5rem; */
  }
  .price {
    place-items: center;
    display: grid;
    grid-template-columns: 1fr 2ch max-content 2ch max-content;
    justify-content: end;
    justify-items: end;
    grid-gap: 0.5rem;
    margin: 0.5rem;
  }
`

export default function OrderListItem({ item }) {
  //TODO - move the useCart call up to Cart
  if (!item) return null
  const totalCost = formatMoney(item.quantity * item.unitPrice)
  return (
    <CartItemLi>
      <div className='cartItem-heading'>
        <h2>{item.coffee}</h2>
      </div>
      <p className='grind'>{item.grind}</p>
      <p className='price'>
        <span>{`${item.quantity} ${item.size} bag`} </span>
        <span>&times; </span>
        <span>${formatMoney(item.unitPrice)} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
    </CartItemLi>
  )
}
