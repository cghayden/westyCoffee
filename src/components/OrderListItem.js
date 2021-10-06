import React from 'react';
import formatMoney from '../utils/formatMoney';
import LineItemLi from '../styles/LineItemLi';

export default function OrderListItem({ item }) {
  if (!item) return null;
  const totalCost = formatMoney(item.quantity * item.unitPrice);
  return (
    <LineItemLi>
      <div className='cartItem-heading'>
        <h2>{item.name}</h2>
      </div>
      <p className='grind'>{item.grind}</p>
      <p className='price'>
        <span>{`${item.quantity} ${item.size} bag`} </span>
        <span>&times; </span>
        <span>${formatMoney(item.unitPrice)} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
    </LineItemLi>
  );
}
