import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DesktopNav from './DesktopNav';
import '@fontsource/nunito';
import MenuSvg from './Icons/MenuSvg';
import MobileNav from './MobileNav';
import CartButton from './CartButton';

const HeaderStyles = styled.header`
  font-family: 'Nunito', open-sans;
  display: flex;
  align-items: center;
  padding: 1rem;
  /* width: 100%; */
  p {
    margin: 0;
  }
`;
const LogoStyle = styled.p`
  font-size: 1.5rem;
  a {
    padding: 0;
  }
`;
const ButtonsDiv = styled.div`
  margin-left: auto;
`;
function Header() {
  const [showMobileNav, toggleShowMobileNav] = useState(false);

  return (
    <HeaderStyles>
      <LogoStyle>
        <Link to='/'>neighborly coffee</Link>
      </LogoStyle>
      <ButtonsDiv className='hideOnDesktop'>
        <button
          type='button'
          className='hide-gtLarge btn-icon'
          onClick={() => {
            toggleShowMobileNav((showMobileNav) => !showMobileNav);
          }}
        >
          <MenuSvg />
        </button>
      </ButtonsDiv>
      <DesktopNav />
      <MobileNav
        showMobileNav={showMobileNav}
        toggleShowMobileNav={toggleShowMobileNav}
      />
      <CartButton />
    </HeaderStyles>
  );
}

export default Header;
