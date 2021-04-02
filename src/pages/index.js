import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import CoffeeCard from '../components/CoffeeCard';

const HomeMainStyles = styled.main``;
const CoffeeDisplay = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 275px);
  place-content: center;
  place-items: center;
`;

const HomePageText = styled.div`
  a {
    padding: 0;
    color: green;
  }
`;

export default function homePage({ data }) {
  console.log('coffees', data);
  // const coffees = data.coffees;
  return (
    <>
      <SEO title={'Coffee'} />
      <HomeMainStyles>
        <h2>Our Weekly Roasts</h2>
        <HomePageText>
          <p>
            Contact Richie @ <a href='tel:617-894-5656'>617-894-5656</a> to
            order
          </p>
          <p>venmo: @juliedaniels</p>
        </HomePageText>
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
  }
`;
