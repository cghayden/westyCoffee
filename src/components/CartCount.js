import React from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';

const Dot = styled.div`
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  background: var(--green);
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
  console.log('cartContents', cartContents);
  //   const totalQuantity = cartContents.reduce();

  return <Dot>{2}</Dot>;
}

export default CartCount;
