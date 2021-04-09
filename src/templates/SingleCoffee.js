import React from 'react';
import { graphql } from 'gatsby';
// import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

// const PizzaGrid = styled.div`
//   display: grid;
//   grid-gap: 2rem;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
// `;

export default function SingleCoffeePage({ data: { coffee } }) {
  return (
    <>
      <SEO title={coffee.name} />
      <div>
        {/* <Img fluid={pizza.image.asset.fluid} /> */}
        <div>
          <h2>{coffee.name}</h2>
          <p>coffee details....</p>
          <p>Order form.... </p>
        </div>
      </div>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    coffee: sanityCoffee(slug: { current: { eq: $slug } }) {
      name
      description
      grade
      id
      price
      process
      region
      roastDate
      roastLevel
      stock
    }
  }
`;
