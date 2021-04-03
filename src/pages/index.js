import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import CoffeeCard from '../components/CoffeeCard';
import HomePageText from '../components/HomePageText';

const HomeMainStyles = styled.main``;
const CoffeeDisplay = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 275px);
  place-content: center;
  place-items: center;
`;

const HomePageTextStyles = styled.div`
  a {
    padding: 0;
    color: green;
  }
`;

export default function homePage({ data }) {
  // const content = data.textQuery.nodes[0];
  const text = data.textQuery.nodes[0].content;
  console.log('text', text);
  return (
    <>
      <SEO title={'Neighborly Coffee'} />
      <HomeMainStyles>
        <h2>Our Roasts of the Week</h2>
        {/* <HomePageText /> */}
        <HomePageTextStyles>
          {text.map((entry, i) => (
            <p key={i}>{entry._rawChildren[0].text}</p>
          ))}
        </HomePageTextStyles>
        <CoffeeDisplay>
          {data.coffees.nodes.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </CoffeeDisplay>
      </HomeMainStyles>
    </>
  );
}

export const query = graphql`
  query {
    coffees: allSanityCoffee {
      nodes {
        id
        name
        price
        region
        roastLevel
        description
        grade
      }
    }
    textQuery: allSanityTextBlock(filter: { name: { eq: "Home Page Lead" } }) {
      nodes {
        name
        heading
        content {
          _rawChildren
        }
      }
    }
  }
`;
