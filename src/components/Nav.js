import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
// import Logo from './Logo';

const NavStyles = styled.nav`
  padding: 1rem 0;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
  }
  li {
    padding: 0.5rem 1rem 0.5rem 0;
    /* margin: 0 0.5rem; */
    /* order: 1; */
  }
  a {
    /* font-size: 3rem; */
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
    <NavStyles>
      <ul>
        <li>
          <Link to='/'>home</Link>
        </li>
        <li>
          <Link to='/events'>events</Link>
        </li>
        <li>
          <Link to='/about'>about</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
