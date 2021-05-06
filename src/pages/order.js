import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderListItem from '../components/OrderListItem';
import SEO from '../components/SEO';
import CartPageStyles from '../styles/CartPageStyles';
import formatMoney from '../utils/formatMoney';

const OrderPageStyles = styled(CartPageStyles)`
  p {
    font-size: 14px;
  }
  display: block;
  .paymentDetails {
    border-top: 2px solid black;
    color: darkred;
    text-align: right;
    p {
      margin-right: 0.5rem;
      font-size: 1.1rem;
    }
  }
`;
const CheckoutPageWrapper = styled.div`
  font-family: monospace;
  padding: 0 1rem;
`;
export default function orderPage({ location }) {
  console.log('location', location.state);
  const [orderItems, setOrderItems] = useState([]);
  const [charge, setCharge] = useState([]);
  const [shippingDetails, setShippingDetails] = useState([]);
  useEffect(() => {
    if (location?.state) {
      setOrderItems(location.state.orderItems);
      setCharge(location.state.charge);
      setShippingDetails(location.state.shippingDetails);
    } else return;
  }, []);
  // const payment = location.state.orderRes.charge

  return (
    <CheckoutPageWrapper>
      <SEO title={'Order Summary'} />
      <main>
        <h1 className='whiteText'>Your Order</h1>
        <OrderPageStyles className='contentBox'>
          <p>Thank You for your business!</p>
          <p>A summary of your order is below.</p>
          <p>
            We will text and/or email you when your order
            {shippingDetails.deliveryMethod === 'Pickup'
              ? 'is ready for pickup'
              : ' ships'}
          </p>
          <p>Check your email for a receipt of your order</p>
          <ul>
            {orderItems.map((orderItem, i) => (
              <OrderListItem item={orderItem} key={`${orderItem.name}-`} />
            ))}
          </ul>

          <div className='paymentDetails'>
            {shippingDetails.deliveryMethod === 'Shipping' && (
              <p
                style={{
                  textAlign: 'right',
                  color: 'darkgreen',
                  fontSize: '1rem',
                }}
              >
                Shipping: {charge.amount < 5000 ? '$10.00' : '$0.00'}
              </p>
            )}
            <p>Total Amount Charged: ${formatMoney(charge.amount)}</p>
          </div>
        </OrderPageStyles>
      </main>
    </CheckoutPageWrapper>
  );
}
