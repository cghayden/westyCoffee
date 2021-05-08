import React from 'react';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import darkWood11 from '../assets/images/darkWood11.jpeg';
// import pine1 from '../assets/images/pine1.jpg';
// import darkWood2 from '../assets/images/darkWood2.jpg';
// import WalnutPrime from '../assets/images/WalnutPrime.jpeg';

const LayoutWrapper = styled.div`
  flex: 1 0 auto;
  position: relative;
  height: 100%;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* opacity: 0.7; */
    /* background-image: url(${woodWhite}); */
    /* background-image: url(${pine1}); */
    /* background-image: url(${darkWood11}); */
    background-image: url(${darkWood11});
    /* background-image: url(${WalnutPrime}); */
    /* background-attachment: fixed; */
    background-repeat: round;
    background-size: cover;
  }
  .content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <LayoutWrapper>
        <div className='content'>
          <Header />
          {children}
          <Footer />
        </div>
      </LayoutWrapper>
    </>
  );
}
