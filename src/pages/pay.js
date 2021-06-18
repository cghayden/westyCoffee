import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import CheckoutPage_CartContents from '../components/CheckoutPage_CartContents';
import SEO from '../components/SEO';
import { useCart } from '../components/CartContext';
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee';
import Layout from '../components/Layout';

const CheckoutPageWrapper = styled.div`
  font-family: monospace;
`;

export default function CheckoutPage({ data, errors }) {
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
  const bg = data.siteSettings.backgroundImage
    ? `url(${data.siteSettings.backgroundImage.asset.gatsbyImageData.images.fallback.src})`
    : data.siteSettings.backgroundColor.hex;
  return (
    <Layout bg={bg}>
      <CheckoutPageWrapper>
        <SEO title='Checkout' />
        <main>
          <CheckoutPage_CartContents availableCoffee={availableCoffee} />
        </main>
      </CheckoutPageWrapper>
    </Layout>
  );
}

export const query = graphql`
  query CheckoutPageQuery {
    siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      backgroundImage {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      backgroundColor {
        hex
      }
    }
  }
`;
