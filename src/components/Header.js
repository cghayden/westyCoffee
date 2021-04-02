import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DesktopNav from './DesktopNav';
import '@fontsource/nunito';
import MenuSvg from './Icons/MenuSvg';
import MobileNav from './MobileNav';
import CoffeeSvg from './Icons/coffeeSvg';

const HeaderStyles = styled.header`
  font-family: 'Nunito', open-sans;
  display: flex;
  align-items: center;
  padding: 10px;

  p {
    margin: 0;
  }
  padding: 1rem;
`;
const LogoStyle = styled.p`
  font-size: 1.5rem;
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
      <button type='button' title='Your Cart'>
        <CoffeeSvg />
      </button>
    </HeaderStyles>
  );
}

export default Header;
