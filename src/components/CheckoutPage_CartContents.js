import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';
import TrashIcon from './Icons/TrashIcon';
import formatMoney from '../utils/formatMoney';
import CartPageStyles from '../styles/CartPageStyles';
import calcPoundsAvailable from '../utils/calcPoundsAvailable';
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee';
import StripeCheckout from './StripeCheckout';
import CartAlerts from './CartAlerts';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';
import compileCurrentStockAndPrice from '../utils/compileCurrentStockAndPriceListing';
import checkStock from '../utils/checkStock';

function CheckoutPage_CartContents({ availableCoffee }) {
  const {
    cartContents,
    removeFromCart,
    orderTotal,
    addToCart,
    totalCartPounds,
  } = useCart();

  const currentStockAndPrice = compileCurrentStockAndPrice(availableCoffee);
  const stockAlerts = checkStock(currentStockAndPrice, totalCartPounds);

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
            addToCart={addToCart}
            key={`${i}-${cartItem.coffee}`}
          />
        ))}
      </ul>
      <footer>
        <h3>Total: $ {orderTotal}</h3>
      </footer>
      {stockAlerts.length > 0 && <CartAlerts alerts={stockAlerts} />}
      {!!cartContents.length && !stockAlerts.length && <StripeCheckout />}
    </CartPageStyles>
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
    font-size: 1.2rem;
    padding-bottom: 4px;
  }
`;
function CartItem({ cartItem, removeFromCart, addToCart }) {
  if (!cartItem) return null;
  const totalCost = formatMoney(cartItem.quantity * cartItem.unitPrice);
  return (
    <CartItemLi>
      <div className='cartItem-heading'>
        <h3>{cartItem.coffee}</h3>
        <QuantitySelector>
          <button
            type='button'
            title='Remove One From Cart'
            disabled={cartItem.quantity === 1}
            onClick={() => {
              addToCart({
                quantity: -1,
                coffee: cartItem.coffee,
                grind: cartItem.grind,
                unitPrice: cartItem.unitPrice,
                size: cartItem.size,
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
                coffee: cartItem.coffee,
                grind: cartItem.grind,
                unitPrice: cartItem.unitPrice,
                size: cartItem.size,
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
              confirm(
                `Would you like to remove all ${cartItem.size}, ${cartItem.grind}, ${cartItem.coffee} form your cart?`
              )
            )
              removeFromCart(cartItem);
          }}
        >
          <TrashIcon />
        </button>
      </div>
      <p className='grind'>{cartItem.grind}</p>
      <p className='price'>
        <span>
          {`${cartItem.quantity} ${cartItem.size} bag${
            cartItem.quantity > 1 ? 's' : ''
          }`}{' '}
        </span>
        <span>&times; </span>
        <span>${formatMoney(cartItem.unitPrice)} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
    </CartItemLi>
  );
}

export default CheckoutPage_CartContents;
