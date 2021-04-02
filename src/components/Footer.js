import React from 'react';
import styled from 'styled-components';
import '@fontsource/raleway';
import InstagramSvg from './Icons/instagramSvg';
const FooterStyle = styled.footer`
  font-family: 'Raleway';
  position: fixed;
  height: 100px;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 2rem;
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
        <a href='https://www.instagram.com/neighborlycoffee'>
          <InstagramSvg />
        </a>
      </Contact>
    </FooterStyle>
  );
}

export default Footer;
