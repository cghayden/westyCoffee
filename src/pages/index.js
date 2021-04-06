import React from 'react';
// import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import CoffeeCard from '../components/CoffeeCard';
import useLatestHomePageData from '../utils/useLatestHomePageData';
import { useCart } from '../components/CartContext';
// import HomePageText from '../components/HomePageText';

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

export default function HomePage() {
  const { featuredCoffee, homePageLead } = useLatestHomePageData();
  const { addToCart } = useCart();
  // const content = data.textQuery.nodes[0];
  // const text = data.textQuery.nodes[0].content;
  return (
    <>
      <SEO title={'Neighborly Coffee'} />
      <HomeMainStyles>
        <h2>Our Roasts of the Week</h2>
        <HomePageTextStyles>
          {homePageLead?.contentRaw.map((entry) => (
            <p key={entry._key}>{entry.children[0].text}</p>
          ))}
        </HomePageTextStyles>
        <CoffeeDisplay>
          {featuredCoffee?.map((coffee) => (
            <div>
              <CoffeeCard key={coffee._id} coffee={coffee} />
              <button
                onClick={() =>
                  addToCart({
                    quantity: 1,
                    coffee: coffee.name,
                    grind: 'whole',
                  })
                }
              >
                Order Now!
              </button>
            </div>
          ))}
        </CoffeeDisplay>
      </HomeMainStyles>
    </>
  );
}

// export const query = graphql`
//   query {
//     coffees: allSanityCoffee {
//       nodes {
//         id
//         name
//         price
//         region
//         roastLevel
//         description
//         grade
//       }
//     }
//     textQuery: allSanityTextBlock(filter: { name: { eq: "Home Page Lead" } }) {
//       nodes {
//         name
//         heading
//         content {
//           _rawChildren
//         }
//       }
//     }
//   }
// `;
