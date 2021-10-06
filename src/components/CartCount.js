import React from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';

const Dot = styled.div`
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  background: var(--redFlame);
  color: white;
  border-radius: 50%;
  padding: 1px;
  line-height: 1.3;
  min-width: 16px;
  height: 16px;
  margin-right: 4px;
  margin-top: 7px;
  font-size: 14px;
`;
function CartCount() {
  const { cartContents } = useCart();

  function calcTotalQuantity(cartContents) {
    return cartContents.reduce((tally, cartItem) => {
      return tally + cartItem.quantity;
    }, 0);
  }
  if (calcTotalQuantity(cartContents) === 0) {
    return null;
  }
  return <Dot>{calcTotalQuantity(cartContents)}</Dot>;
}

export default CartCount;
