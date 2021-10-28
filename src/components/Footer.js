import React from 'react';
import styled from 'styled-components';
import '@fontsource/raleway';
import InstagramSvg from './Icons/InstagramSvg';
const FooterStyle = styled.footer`
  background: var(--white);
  font-family: 'Raleway';
  margin-top: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  padding: 0.5rem 0;
  * {
    font-size: 0.9rem;
  }
  a.phone {
    padding: 0.5rem;
  }
  a {
    color: green;
  }
  p {
    margin: 5px;
  }
`;

const Address = styled.div`
  padding-top: 5px;
`;
const Contact = styled.div`
  display: flex;
  align-items: center;
`;

function Footer() {
  return (
    <FooterStyle>
      <Address>
        <p>westy coffee</p>
        <p>foxboro, ma</p>
        <p>website by Corey Hayden</p>
        <p>cghayden@gmail.com</p>
      </Address>
      <Contact>
        <a className='phone' href='tel:123-456-7890'>
          123-456-7890
        </a>
        <a
          href='https://www.instagram.com'
          rel='noopener noreferrer'
          target='_blank'
          aria-label='Link to Instagram'
        >
          <InstagramSvg w={24} h={24} />
        </a>
      </Contact>
    </FooterStyle>
  );
}

export default Footer;
