import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import CoffeeDisplay from '../components/CoffeeDisplay';
// import CoffeeCard from '../components/CoffeeCard';
// import useLatestHomePageData from '../utils/useLatestHomePageData';
// import HomePageText from '../components/HomePageText';

const HomeMainStyles = styled.main``;

const HomePageTextStyles = styled.div`
  a {
    padding: 0;
    color: green;
  }
`;

// *** STATICALLY BUILT PAGE
export default function homePage({ data }) {
  const text = data.textQuery.nodes[0].content;
  return (
    <>
      <SEO title={'Neighborly Coffee'} />
      <HomeMainStyles>
        <h2>Our Roasts of the Week</h2>
        <HomePageTextStyles>
          {text.map((entry, i) => (
            <p key={i}>{entry._rawChildren[0].text}</p>
          ))}
        </HomePageTextStyles>
        <CoffeeDisplay allCoffee={data.coffees.nodes} />
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

// *** DYNAMIC DATA PAGE QUERIED FROM SANITY
// export default function HomePage() {
//   const { featuredCoffee, homePageLead } = useLatestHomePageData();
//   const { addToCart } = useCart();
//   return (
//     <>
//       <SEO title={'Neighborly Coffee'} />
//       <HomeMainStyles>
//         <h2>Our Roasts of the Week</h2>
//         <HomePageTextStyles>
//           {homePageLead?.contentRaw.map((entry) => (
//             <p key={entry._key}>{entry.children[0].text}</p>
//           ))}
//         </HomePageTextStyles>
//         <CoffeeDisplay>
//           {featuredCoffee?.map((coffee) => (
//             <div>
//               <CoffeeCard key={coffee._id} coffee={coffee} />
//               <button
//                 onClick={() =>
//                   addToCart({
//                     quantity: 1,
//                     coffee: coffee.name,
//                     grind: 'whole',
//                   })
//                 }
//               >
//                 Order Now!
//               </button>
//             </div>
//           ))}
//         </CoffeeDisplay>
//       </HomeMainStyles>
//     </>
//   );
// }
