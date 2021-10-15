import React from 'react';
import Checkout from '../components/Checkout';
import SEO from '../components/SEO';
import { useCart } from '../components/CartContext';
import Layout from '../components/Layout';

export default function CheckoutPage() {
  const { cartContents } = useCart();
  if (!cartContents.length) {
    return (
      <Layout>
        <main>
          <div className='contentBox'>
            <p>Your cart is empty!</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <SEO title='Checkout' />
        <main>
          <Checkout />
        </main>
      </div>
    </Layout>
  );
}
