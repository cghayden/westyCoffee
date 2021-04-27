import React from 'react';
import { graphql } from 'gatsby';
// import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';
import AddToCartForm from '../components/AddToCartForm';

const CoffeeHeader = styled.div`
  margin-bottom: 2rem;
  h1,
  h2 {
    font-size: 1.8rem;
    margin: 0;
  }
  p {
    font-style: italic;
  }
`;
const CoffeeBody = styled.div`
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  place-items:center;
  grid-gap: 1rem; */

  .descriptionLong {
    grid-column: 1/-1;
    max-width: 500px;
    margin: 1.5rem auto;
    /* justify-self: center; */
  }
`;
const DeetsAndForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
`;
const CoffeeDetails = styled.dl`
  margin: 0 auto 20px auto;
  width: max-content;
  display: grid;
  grid-template-columns: 80px auto;
  align-items: baseline;
  dt {
    text-transform: uppercase;
    padding: 0.5rem 0;
    justify-self: left;
    font-size: 0.85rem;
  }
  dd {
    margin-left: 2rem;
    color: darkgreen;
    font-weight: bold;
    justify-self: left;
    margin: 0;
  }
  .content-item {
    align-items: baseline;
    display: flex;
    padding: 8px 0;
    margin-left: 10px;
    flex-direction: column;

    p {
      &:first-of-type {
        font-weight: bold;
        color: darkgreen;
        font-size: 1.1rem;
      }
      &:nth-of-type(2) {
        /* color: red; */
      }
    }
  }
`;
export default function SingleCoffeePage({ data: { coffee } }) {
  console.log('coffee', coffee);
  // coffee.flavorProfile = 'Amaretto, Fruity, Light  ';
  // coffee.process = 'washed';
  // coffee.elevation = '1200m';
  // coffee.cultivar = 'sumatra eliongata';
  return (
    <>
      <SEO title={coffee.name} />
      <main>
        {/* <Img fluid={coffee.image.asset.fluid} /> */}
        <CoffeeHeader>
          <h2>{coffee.name}</h2>
          {coffee.description && <p>{coffee.description}</p>}
        </CoffeeHeader>
        <CoffeeBody>
          <div className='descriptionLong'>
            {coffee.descriptionLong &&
              coffee.descriptionLong.map((obj, i) => (
                <p key={i}>{obj.children[0].text}</p>
              ))}
          </div>
          <DeetsAndForm>
            <CoffeeDetails>
              {coffee.grade && (
                // <div className='content-item'>
                <>
                  <dt>Grade</dt>
                  <dd>{coffee.grade}</dd>
                </>
                //</div>
              )}
              {coffee.process && (
                // <div className='content-item'>
                <>
                  <dt>Process</dt>
                  <dd>{coffee.process}</dd>
                </>
                //</div>
              )}
              {coffee.cultivar && (
                // <div className='content-item'>
                <>
                  <dt>Cultivar</dt>
                  <dd>{coffee.cultivar}</dd>
                </>
                //</div>
              )}
              {coffee.elevation && (
                // <div className='content-item'>
                <>
                  <dt>Elevation</dt>
                  <dd>{coffee.elevation}</dd>
                </>
                //</div>
              )}
              {coffee.roastDate && (
                // <div className='content-item'>
                <>
                  <dt>Roasted</dt>
                  <dd>{coffee.roastDate}</dd>
                </>
                // </div>
              )}
            </CoffeeDetails>

            {coffee.stock > 0 ? (
              <AddToCartForm coffee={coffee} />
            ) : (
              <p>Out of Stock</p>
            )}
          </DeetsAndForm>
        </CoffeeBody>
      </main>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    coffee: sanityCoffee(slug: { current: { eq: $slug } }) {
      id
      name
      description
      descriptionLong {
        children {
          text
        }
      }
      roastLevel
      grade
      roastDate
      price
      region
      cultivar
      elevation
      process
      stock
    }
  }
`;
