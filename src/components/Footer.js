import React from 'react';
import styled from 'styled-components';
import '@fontsource/raleway';
import InstagramSvg from './Icons/InstagramSvg';
const FooterStyle = styled.footer`
  background: linear-gradient(
    to top,
    white 60%,
    hsla(0, 100%, 100%, 0.6) 95%,
    transparent
  );
  font-family: 'Raleway';
  margin-top: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  padding: 1rem 0;
  a {
    color: green;
  }
  p {
    margin: 5px;
  }
`;

const Address = styled.div``;
const Contact = styled.div`
  display: flex;
  align-items: center;
`;

function Footer() {
  return (
    <FooterStyle>
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
    </FooterStyle>
  );
}

export default Footer;
