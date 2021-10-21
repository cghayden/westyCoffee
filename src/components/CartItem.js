import React from 'react';
import styled from 'styled-components';
import TrashIcon from './Icons/TrashIcon';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';
import formatMoney from '../utils/formatMoney';
import { useCart } from './CartContext';

export default function CartItem({ cartItem }) {
  const { removeFromCart, addToCart } = useCart();

  if (!cartItem) return null;
  const totalCost = formatMoney(cartItem.quantity * cartItem.unitPrice);
  return (
    <CartItemLi>
      <div className='cartItem-heading'>
        <h3>{cartItem.name}</h3>
        <QuantitySelector>
          <button
            type='button'
            title='Remove One From Cart'
            disabled={cartItem.quantity === 1}
            onClick={() => {
              addToCart({
                quantity: -1,
                name: cartItem.name,
                grind: cartItem.grind,
                unitPrice: cartItem.unitPrice,
                size: cartItem.size,
                _ref: cartItem._ref,
                _id: cartItem._id,
              });
            }}
          >
            <MinusSvg w={'18'} h={'18'} />
          </button>
          <p>{cartItem.quantity}</p>
          <button
            type='button'
            title='Add One To Cart'
            onClick={() => {
              addToCart({
                quantity: 1,
                name: cartItem.name,
                grind: cartItem.grind,
                unitPrice: cartItem.unitPrice,
                size: cartItem.size,
                _ref: cartItem._ref,
                _id: cartItem._id,
              });
            }}
          >
            <PlusSvg w={'18'} h={'18'} />
          </button>
        </QuantitySelector>
        <button
          type='button'
          className='btn-icon trashButton'
          onClick={() => {
            if (
              // eslint-disable-next-line no-restricted-globals
              confirm(
                `Would you like to remove all ${cartItem.size}, ${cartItem.grind}, ${cartItem.name} form your cart?`
              )
            )
              removeFromCart(cartItem);
          }}
        >
          <TrashIcon />
        </button>
      </div>
      <p className='grind'>{`${cartItem.grind}, ${cartItem.size} bag`}</p>
      <p className='details'>
        <span>{`${cartItem.quantity}`}</span>
        <span>&times; </span>
        <span>{`${formatMoney(cartItem.unitPrice)} ea.`} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
    </CartItemLi>
  );
}
const CartItemLi = styled.li`
  width: 100%;
  position: relative;
  padding-top: 1rem;
  .cartItem-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .trashButton {
      color: red;
    }
  }
  h3 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    grid-column: 1/-1;
    justify-self: left;
  }
  .grind {
    text-align: left;
    margin: 0;
  }
  .details {
    place-items: center;
    display: grid;
    grid-template-columns: max-content 2ch max-content 1ch max-content;
    justify-content: end;
    justify-items: end;
    align-items: baseline;
    grid-gap: 0.5rem;
    margin: 0.5rem;
  }
`;
const QuantitySelector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 15ch;
  margin-left: auto;
  color: green;
  button {
    padding: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.6rem;
    padding-bottom: 4px;
  }
`;
