import React from 'react';
import styled from 'styled-components';
import CartStyles from '../styles/CartStyles';
import { useCart } from './CartContext';
import CloseButton from './CloseButton';
import formatMoney from '../utils/formatMoney';
import TrashIcon from './Icons/TrashIcon';

function Cart() {
  const { cartOpen, closeCart, cartContents } = useCart();

  function calcTotalPrice(cartContents) {
    return cartContents.reduce((tally, cartItem) => {
      //   if (!cartItem.) return tally; // products can be deleted, but they could still be in your cart
      return tally + cartItem.quantity * cartItem.unitPrice;
    }, 0);
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <h3>Your Cart</h3>
        <CloseButton
          title='Close Cart'
          aria-label='Close Your Cart Modal'
          onClick={closeCart}
        >
          &times;
        </CloseButton>
      </header>
      <ul>
        {cartContents.map((cartItem, i) => (
          <CartItem cartItem={cartItem} key={`${i}-${cartItem.coffee}`} />
        ))}
      </ul>
      <footer>
        <h3>Total: $ {formatMoney(calcTotalPrice(cartContents))}</h3>
        <p>Checkout</p>
        {/* <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            <Checkout /> */}
      </footer>
    </CartStyles>
  );
}

const CartItemLi = styled.li`
  width: 100%;
  position: relative;
  /* display: grid; */
  /* grid-template-columns: auto 12ch 2rem auto; */
  /* border-bottom: 1px solid black; */
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
    /* text-align: right; */
    grid-template-columns: 1fr 2ch max-content 2ch max-content;
    justify-content: end;
    grid-gap: 0.5rem;
    margin: 0.5rem;
  }
`;

function CartItem({ cartItem }) {
  const { removeFromCart } = useCart();
  if (!cartItem) return null;
  const totalCost = formatMoney(cartItem.quantity * cartItem.unitPrice);
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
            removeFromCart(cartItem);
        }}
      >
        <TrashIcon />
      </button>
      <p className='grind'>{cartItem.grind}</p>
      <p className='price'>
        <span>{`${cartItem.quantity} ${cartItem.size} bag`} </span>
        {/* <span>{``}</span> */}
        <span>&times; </span>
        <span>${formatMoney(cartItem.unitPrice)} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
    </CartItemLi>
  );
}

export default Cart;
