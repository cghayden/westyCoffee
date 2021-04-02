import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
export default function homePage({ data, pageContext }) {
  console.log('data', data);
  return (
    <>
      <SEO title={'Coffee'} />
      <main>
        <h2>Our Weekly Roasts</h2>
      </main>
    </>
  );
}

export const query = graphql`
  query {
    allSanityCoffee {
      edges {
        node {
          id
          name
          price
          region
          roast
          description
          grade
        }
      }
    }
  }
`;
