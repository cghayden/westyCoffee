import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import AddToCartForm from '../components/AddToCartForm';
import { GatsbyImage } from 'gatsby-plugin-image';

const CoffeeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  margin-bottom: 1rem;
  h1,
  h2 {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
  }
  p {
    font-style: italic;
  }
`;
const ShortDescriptionDiv = styled.div`
  max-width: 85%;
  margin: 0 auto;
  text-align: center;
`;

const CoffeeBody = styled.div`
  .descriptionLong {
    grid-column: 1/-1;
    max-width: 500px;
    margin: 0 auto 1.5rem auto;
  }
`;
const DeetsAndForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const CoffeeDetails = styled.dl`
  margin: 0 auto 20px auto;
  width: max-content;
  display: grid;
  grid-template-columns: max-content auto;
  align-items: baseline;
  dt {
    text-transform: uppercase;
    padding: 0.5rem 0;
    justify-self: left;
    font-size: 0.85rem;
    margin-right: 20px;
  }
  dd {
    /* margin-left: 2rem; */
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
  const image = coffee.image?.asset.gatsbyImageData;

  return (
    <>
      <SEO title={coffee.name} />
      <main>
        {/* <Img fluid={coffee.image.asset.fluid} /> */}
        <CoffeeHeader className=''>
          <h2>{coffee.name}</h2>
          {image && (
            <div>
              <GatsbyImage image={image} alt={image.alt} />
            </div>
          )}
          <ShortDescriptionDiv>
            {coffee.description && <p>{coffee.description}</p>}
          </ShortDescriptionDiv>
        </CoffeeHeader>
        <CoffeeBody className='contentBox'>
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
      _id
      name
      description
      descriptionLong {
        children {
          text
        }
      }
      image {
        asset {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      singleOrigin
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
