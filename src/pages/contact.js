import React from 'react';
// import { graphql } from 'gatsby';
import styled from 'styled-components';
import GraphQLErrorList from '../components/GraphqlErrorList';
import InstagramSvg from '../components/Icons/InstagramSvg';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Address = styled.div`
  a {
    color: green;
    padding: 0;
  }
`;
const Contact = styled.p`
  display: flex;
  align-items: center;
  svg {
    margin-bottom: -5px;
    margin-left: 10px;
  }
`;

export default function ContactPage({ data, errors }) {
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  return (
    <Layout>
      <SEO title={'Contact'} />
      <main>
        <div className='contentBox'>
          <Address className='address'>
            <p>neighborly coffee</p>
            <p>36 lincoln rd.</p>
            <p>sharon, ma 02067</p>
            <Contact>
              <a href='tel:617-894-5656'>617-894-5656</a>
              <a
                href='https://www.instagram.com/neighborlycoffee'
                rel='noopener noreferrer'
                target='_blank'
              >
                <span>
                  <InstagramSvg w={24} h={24} />
                </span>
              </a>
            </Contact>
          </Address>
        </div>
      </main>
    </Layout>
  );
}

// export const query = graphql`
//   query ContactPageQuery {
//     pageContent: sanityContactPage(_id: { eq: "contactPage" }) {
//       heading
//       _rawText(resolveReferences: { maxDepth: 10 })
//     }
//   }
// `;
