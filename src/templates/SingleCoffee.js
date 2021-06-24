import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import AddToCartForm from '../components/AddToCartForm';
import { GatsbyImage } from 'gatsby-plugin-image';
import PortableText from '../components/PortableText';
import Layout from '../components/Layout';

const CoffeeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CoffeeBody = styled.div`
  .descriptionLong {
    p {
      font-size: 1.1rem;
    }
    grid-column: 1/-1;
    max-width: 500px;
    margin: 0 auto 1.5rem auto;
  }
`;
const LongDescription = styled.div`
  grid-column: 1/-1;
  max-width: 500px;
  margin: 0 auto 1.5rem auto;
  p {
    font-size: 1.1rem;
  }
  a {
    color: var(--blueYonder);
  }
`;
const DeetsAndForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const CoffeeDetails = styled.dl`
  width: 300px;
  padding-right: 20px;
  dt {
    padding: 0.5rem 0;
    justify-self: left;
    font-size: 18px;
    margin-right: 14px;
  }
  dd {
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
    flex-direction: row;

    p {
      &:first-of-type {
        font-weight: bold;
        color: darkgreen;
        font-size: 1.1rem;
      }
    }
  }
`;
const ImageDiv = styled.div`
  max-width: 400px;
`;
export default function SingleCoffeePage({ data }) {
  const coffee = data?.coffee;
  const image = data.coffee.image?.asset.gatsbyImageData;
  const text = data.coffee ? data.coffee._rawDescriptionLong : [];

  return (
    <Layout>
      <SEO title={coffee.name} />
      <main>
        {/* <Img fluid={coffee.image.asset.fluid} /> */}
        <div className='contentBox'>
          <CoffeeHeader className=''>
            <h2>{coffee.name}</h2>
            {coffee.flavorProfile && <p>{coffee.flavorProfile}</p>}
            {image && (
              <ImageDiv>
                <GatsbyImage image={image} alt={`image of ${coffee.name}`} />
              </ImageDiv>
            )}
          </CoffeeHeader>
          <CoffeeBody>
            <LongDescription>
              {coffee._rawDescriptionLong && <PortableText blocks={text} />}
            </LongDescription>

            <DeetsAndForm>
              <CoffeeDetails>
                {coffee.roastDate && (
                  <div className='content-item'>
                    <>
                      <dt>roasted</dt>
                      <dd>{coffee.roastDate}</dd>
                    </>
                  </div>
                )}
                {coffee.grade && (
                  <div className='content-item'>
                    <>
                      <dt>grade</dt>
                      <dd>{coffee.grade}</dd>
                    </>
                  </div>
                )}
                {coffee.region && (
                  <div className='content-item'>
                    <>
                      <dt>region</dt>
                      <dd>{coffee.region}</dd>
                    </>
                  </div>
                )}
                {coffee.cultivar && (
                  <div className='content-item'>
                    <>
                      <dt>cultivar</dt>
                      <dd>{coffee.cultivar}</dd>
                    </>
                  </div>
                )}
                {coffee.elevation && (
                  <div className='content-item'>
                    <>
                      <dt>elevation</dt>
                      <dd>{coffee.elevation}</dd>
                    </>
                  </div>
                )}
                {coffee.process && (
                  <div className='content-item'>
                    <>
                      <dt>process</dt>
                      <dd>{coffee.process}</dd>
                    </>
                  </div>
                )}
              </CoffeeDetails>
              {coffee.stock > 0 ? (
                <AddToCartForm coffee={coffee} />
              ) : (
                <p>out of stock</p>
              )}
            </DeetsAndForm>
          </CoffeeBody>
        </div>
      </main>
    </Layout>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    coffee: sanityCoffee(slug: { current: { eq: $slug } }) {
      _id
      name
      description
      _rawDescriptionLong
      image {
        asset {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      mainImage {
        asset {
          gatsbyImageData(
            fit: FILL
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
          )
        }
        alt
        caption
      }
      flavorProfile
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
