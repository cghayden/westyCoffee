import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import CoffeeDisplay from '../components/CoffeeDisplay';
import PortableText from '../components/PortableText';
import Layout from '../components/Layout';

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
export default function CoffeePage({ data }) {
  const pageHeading = data ? data.pageContent.heading : '';
  const text = data ? data.pageContent._rawTopText : [];

  return (
    <Layout>
      <SEO title={'neighborly coffee'} />
      <HomeMainStyle>
        <h1 className='pageHeading'>{pageHeading}</h1>
        <HomePageTextStyles>
          <PortableText blocks={text} />
        </HomePageTextStyles>
        <CoffeeDisplay allCoffee={data.coffees.nodes} />
      </HomeMainStyle>
    </Layout>
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
    pageContent: sanityCoffeePage(_id: { eq: "coffeePage" }) {
      heading
      _rawTopText(resolveReferences: { maxDepth: 10 })
    }
  }
`;
