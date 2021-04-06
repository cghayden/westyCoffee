import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';

const AboutContentStyles = styled.div`
  margin: 2rem;
  text-align: left;
`;

export default function aboutPage({ data }) {
  const content = data.contentQuery.nodes[0];
  const text = data.contentQuery.nodes[0].content;
  return (
    <>
      <SEO title={'Our Story'} />
      <main>
        <h1>{content.heading}</h1>
        <AboutContentStyles>
          {text.map((entry, i) => (
            <p key={i}>{entry._rawChildren[0].text}</p>
          ))}
        </AboutContentStyles>
      </main>
    </>
  );
}

export const query = graphql`
  query {
    contentQuery: allSanityTextBlock(
      filter: { name: { eq: "About Page Content" } }
    ) {
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
