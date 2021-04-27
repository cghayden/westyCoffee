import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderListItem from '../components/OrderListItem';
import SEO from '../components/SEO';
import CartPageStyles from '../styles/CartPageStyles';
import formatMoney from '../utils/formatMoney';

const OrderPageStyles = styled(CartPageStyles)`
  display: block;
  .paymentDetails {
    border-top: 2px solid black;
    color: darkred;
    text-align: right;
    p {
      font-size: 1.2rem;
    }
  }
`;
const CheckoutPageWrapper = styled.div`
  font-family: monospace;
  padding: 1rem;
`;
export default function orderPage({ location }) {
  console.log('location', location.state);
  const [orderItems, setOrderItems] = useState([]);
  const [charge, setCharge] = useState([]);
  useEffect(() => {
    if (location?.state) {
      setOrderItems(location.state.orderItems);
      setCharge(location.state.charge);
    } else return;
  }, []);
  // const payment = location.state.orderRes.charge

  return (
    <CheckoutPageWrapper>
      <SEO title={'Order Summary'} />
      <main>
        <OrderPageStyles>
          <h1>Your Order</h1>
          <ul>
            {orderItems.map((orderItem, i) => (
              <OrderListItem item={orderItem} key={`${orderItem.name}-`} />
            ))}
          </ul>
          <div className='paymentDetails'>
            <p>Total Amount Charged: {formatMoney(charge.amount)}</p>
          </div>
        </OrderPageStyles>
      </main>
    </CheckoutPageWrapper>
  );
}
