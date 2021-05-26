import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderListItem from '../components/OrderListItem';
import SEO from '../components/SEO';
import CartPageStyles from '../styles/CartPageStyles';
import formatMoney from '../utils/formatMoney';
import Layout from '../components/Layout';

const OrderPageStyles = styled(CartPageStyles)`
  h1,
  h2 {
    font-size: 1.5em;
    font-weight: 400;
  }
  h2 {
    font-size: 1.25em;
  }
  p {
    margin: 5px 0;
    font-size: 14px;
  }
  display: block;
  .paymentDetails {
    border-top: 2px solid black;
    color: darkred;
    text-align: right;
    margin-bottom: 1rem;
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
  // console.log('location', location.state);
  const [orderItems, setOrderItems] = useState([]);
  const [charge, setCharge] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({});
  useEffect(() => {
    if (location?.state) {
      setOrderItems(location.state.orderItems);
      setCharge(location.state.charge);
      setShippingDetails(location.state.shippingDetails);
    } else return;
  }, []);
  // const payment = location.state.orderRes.charge

  return (
    <Layout>
      <CheckoutPageWrapper>
        <SEO title={'Order Summary'} />
        <main>
          <OrderPageStyles className='contentBox'>
            <h1>Thank You For Your Order!</h1>
            <p>
              We'll contact you when your order
              {shippingDetails.deliveryMethod === 'Pickup'
                ? ' is ready for pickup'
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
            <DeliveryMethodDiv>
              {shippingDetails.deliveryMethod === 'Pickup' ? (
                <>
                  <h4>picking up at</h4>
                  <PickupDetailsReview shippingDetails={shippingDetails} />
                </>
              ) : (
                <>
                  <h4>shipping to:</h4>
                  <ShippingDetailsReview shippingDetails={shippingDetails} />
                </>
              )}
            </DeliveryMethodDiv>
          </OrderPageStyles>
        </main>
      </CheckoutPageWrapper>
    </Layout>
  );
}

const DeliveryMethodDiv = styled.div`
  h4 {
    margin-bottom: 0.5rem;
  }
`;

function ShippingDetailsReview({ shippingDetails }) {
  return (
    <>
      <p>{shippingDetails?.shippingName}</p>
      <p>{shippingDetails?.addressLine1}</p>
      <p>{shippingDetails?.addressLine2}</p>
      <p>
        <span>{shippingDetails?.city}</span>,{' '}
        <span>{shippingDetails?.state}</span>{' '}
        <span>{shippingDetails?.zip}</span>
      </p>
    </>
  );
}

const PickupAddressStyles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2rem;
  p {
    margin: 0;
    font-size: 14px;
  }
  .pickup-locationName {
    font-size: 17px;
  }
`;

function PickupDetailsReview({ shippingDetails }) {
  if (shippingDetails.pickupLocation === 'Edge') {
    return (
      <PickupAddressStyles>
        <p className='pickup-locationName'>Neighborly Coffee</p>
        <p>36 Lincoln Rd.</p>
        <p>Sharon, MA 02067</p>
      </PickupAddressStyles>
    );
  }

  if (shippingDetails.pickupLocation === 'Daniels') {
    return (
      <PickupAddressStyles>
        <p className='pickup-locationName'>Edge Studio</p>
        <p>905 Turnpike St,</p>
        <p>Suite. F</p>
        <p>Canton, MA 02021</p>
      </PickupAddressStyles>
    );
  }
}
