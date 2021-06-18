import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavStyles = styled.nav`
  padding: 1rem 0;
  margin-left: auto;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
  }
  a {
    &:hover {
      color: dark green;
    }
    /* &[aria-current='page'] {
      color: var(--red);
    } */
  }
`;

export default function Nav() {
  return (
    <NavStyles className='hideOnMobile'>
      <ul>
        <li>
          <Link to='/coffee'>coffee</Link>
        </li>
        <li>
          <Link to='/events'>events</Link>
        </li>
        <li>
          <Link to='/blog'>blog</Link>
        </li>
        <li>
          <Link to='/about'>about</Link>
        </li>
        <li>
          <Link to='/contact'>contact</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
