import React from 'react';
import styled from 'styled-components';
import CartCount from './CartCount';
import CoffeeCupIcon from './Icons/CoffeeCupIcon';
import { useCart } from './CartContext';

const CartButtonStyle = styled.button`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  padding: 0 0.25rem 0.25rem;
  min-width: initial;
  text-align: center;
  svg {
    grid-column: 1/-1;
    grid-row: 1/-1;
  }
  div {
    grid-column: 1/-1;
    grid-row: 1/-1;
  }
`;

function CartButton() {
  const { openCart } = useCart();
  return (
    <CartButtonStyle type='button' title='Your Cart' onClick={openCart}>
      <CoffeeCupIcon w={32} h={32} />
      <CartCount />
    </CartButtonStyle>
  );
}

export default CartButton;
