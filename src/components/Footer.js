import React from 'react';
import styled from 'styled-components';
import '@fontsource/raleway';
import InstagramSvg from './Icons/InstagramSvg';
const FooterStyle = styled.footer`
  /* background: linear-gradient(
    to top,
    white 70%,
    hsla(0, 100%, 100%, 0.6) 95%,
    transparent
  ); */
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
        <p>neighborly coffee</p>
        <p>36 lincoln rd.</p>
        <p>sharon, ma 02067</p>
      </Address>
      <Contact>
        <a className='phone' href='tel:617-894-5656'>
          617-894-5656
        </a>
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
