import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import PortableText from '../components/PortableText';

const AboutContentStyles = styled.div``;

export default function aboutPage({ data }) {
  const pageHeading = data ? data.aboutPageText.heading : '';
  const text = data ? data.aboutPageText._rawContent : [];
  return (
    <>
      <SEO title={'about'} />
      <main>
        <h1 className='pageHeading whiteText'>{pageHeading}</h1>
        <AboutContentStyles className='contentBox'>
          <PortableText blocks={text} />
        </AboutContentStyles>
      </main>
    </>
  );
}

export const query = graphql`
  query AboutPageQuery {
    aboutPageText: sanityTextBlock(name: { eq: "About Page Content" }) {
      id
      heading
      _rawContent
    }
  }
`;
