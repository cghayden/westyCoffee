import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Nav from './Nav';
import '@fontsource/nunito';

const HeaderStyles = styled.header`
  font-family: 'Nunito', open-sans;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
    margin: 0;
  }
  padding: 1rem;
`;
const LogoStyle = styled.p`
  font-size: 1.5rem;
`;
function Header() {
  return (
    <HeaderStyles>
      <LogoStyle>
        <Link to='/'>neighborly coffee</Link>
      </LogoStyle>
      <Nav />
    </HeaderStyles>
  );
}

export default Header;
