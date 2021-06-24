import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import PortableText from '../components/PortableText';
import Layout from '../components/Layout';

const AboutContentStyles = styled.div``;

export default function aboutPage({ data }) {
  const pageHeading = data?.pageContent.heading;
  const text = data?.pageContent._rawText;

  return (
    <Layout>
      <SEO title={'about'} />
      <main>
        <h1 className='pageHeading whiteText'>{pageHeading}</h1>
        <AboutContentStyles className='contentBox'>
          {text && <PortableText blocks={text} />}
        </AboutContentStyles>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query AboutPageQuery {
    pageContent: sanityAboutPage(_id: { eq: "aboutPage" }) {
      heading
      _rawText(resolveReferences: { maxDepth: 10 })
    }
  }
`;
