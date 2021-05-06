import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import CoffeeDisplay from '../components/CoffeeDisplay';
import PortableText from '../components/PortableText';

const HomeMainStyle = styled.main`
  text-align: center;
`;

const HomePageTextStyles = styled.div`
  color: var(--white);
  margin-bottom: 1rem;
  margin-top: 1rem;
  a {
    padding: 0;
    color: inherit;
  }
`;

// *** STATICALLY BUILT PAGE
export default function homePage({ data }) {
  const pageHeading = data ? data.homePageText.heading : '';
  const text = data ? data.homePageText._rawContent : [];
  return (
    <>
      <SEO title={'neighborly coffee'} />
      <HomeMainStyle>
        <h1 className='pageHeading'>{pageHeading}</h1>
        <HomePageTextStyles>
          <PortableText blocks={text} />
        </HomePageTextStyles>
        <CoffeeDisplay allCoffee={data.coffees.nodes} />
      </HomeMainStyle>
    </>
  );
}
export const query = graphql`
  query HomePageQuery {
    coffees: allSanityCoffee(filter: { stock: { gt: 0 } }) {
      nodes {
        _id
        name
        price
        region
        roastLevel
        singleOrigin
        description
        grade
        stock
        roastDate
        slug {
          current
        }
      }
    }
    homePageText: sanityTextBlock(name: { eq: "Home Page Lead" }) {
      id
      heading
      _rawContent
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
//             <p key={entry._ref}>{entry.children[0].text}</p>
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
