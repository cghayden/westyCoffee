import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DesktopNav from './DesktopNav';
import MenuSvg from './Icons/MenuSvg';
import MobileNav from './MobileNav';
import CartButton from './CartButton';
import Cart from './Cart';

const HeaderStyles = styled.header`
  display: flex;
  color: ${(props) => (props.black ? 'black' : 'white')};
  background: ${(props) => (props.black ? 'var(--white)' : 'transparent')};
  /* color: var(--white); */
  align-items: center;
  padding: 1rem;
  /* width: 100%; */
  p {
    margin: 0;
  }
`;
const LogoStyle = styled.p`
  font-size: 1.5rem;
  h1 {
    font-weight: 300;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
  }
  a {
    font-size: 1.5rem;
    padding: 0;
  }
`;
const ButtonsDiv = styled.div`
  margin-left: auto;
`;
function Header({ black }) {
  const [showMobileNav, toggleShowMobileNav] = useState(false);

  return (
    <HeaderStyles black={black}>
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
      <Cart />
    </HeaderStyles>
  );
}

export default Header;
