import React from 'react';
import styled from 'styled-components';
import InstagramSvg from '../components/Icons/InstagramSvg';
import SEO from '../components/SEO';

const ContactContentStyles = styled.div``;
const Address = styled.div`
  p {
    margin: 0.5rem;
  }
`;
const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: green;
  }
`;

export default function contactPage() {
  return (
    <>
      <SEO title={'Contact'} />
      <main>
        <h1>Neighborly Coffee</h1>
        <ContactContentStyles>
          <Address>
            <p>neighborly coffee</p>
            <p>36 Lincoln Rd.</p>
            <p>Sharon, Ma 02067</p>
          </Address>
          <Contact>
            <a href='tel:617-894-5656'>617-894-5656</a>
            <a
              href='https://www.instagram.com/neighborlycoffee'
              rel='noopener noreferrer'
              target='_blank'
            >
              <InstagramSvg w={24} h={24} />
            </a>
          </Contact>
        </ContactContentStyles>
      </main>
    </>
  );
}
