import React from 'react';
import styled from 'styled-components';
import CheckoutPage_CartContents from '../components/CheckoutPage_CartContents';
import SEO from '../components/SEO';
import { useCart } from '../components/CartContext';
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee';
import Layout from '../components/Layout';

const CheckoutPageWrapper = styled.div`
  font-family: monospace;
`;

function CheckoutPage() {
  const { cartContents } = useCart();
  const { availableCoffee } = useCurrentAvailableCoffee();
  if (!availableCoffee) {
    return <p>Loading...</p>;
  }
  if (!cartContents.length) {
    return (
      <main>
        <div className='contentBox'>
          <p>Your cart is empty!</p>
        </div>
      </main>
    );
  }

  return (
    <Layout>
      <CheckoutPageWrapper>
        <SEO title='Checkout' />
        <main>
          <CheckoutPage_CartContents availableCoffee={availableCoffee} />
        </main>
      </CheckoutPageWrapper>
    </Layout>
  );
}
export default CheckoutPage;
