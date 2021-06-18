import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
// import darkWood11 from '../assets/images/darkWood11.jpeg';
// import pine1 from '../assets/images/pine1.jpg';
import darkWood2 from '../assets/images/darkWood2.jpg';
// import WalnutPrime from '../assets/images/WalnutPrime.jpeg';

const LayoutWrapper = styled.div`
  flex: 1 0 auto;
  position: relative;
  min-height: 100vh;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background: #611818; */
    /* opacity: 0.7; */
    /* background: ${(props) =>
      props.bgImg ? `url(${props.bgImg})` : props.bgColor}; */
    background-repeat: round;
    background-size: cover;
  }
  .content {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;
export default function Layout({ children, bg }) {
  const data = useStaticQuery(graphql`
    query PageSettingsQuery {
      allSanitySiteSettings {
        edges {
          node {
            backgroundColor {
              hex
            }
            backgroundImage {
              asset {
                gatsbyImageData(
                  fit: FILL
                  formats: AUTO
                  placeholder: DOMINANT_COLOR
                )
              }
            }
          }
        }
      }
    }
  `);
  console.log('layout static query data', data);
  return (
    <>
      <GlobalStyles />
      <LayoutWrapper style={{ background: bg }}>
        <div className='content'>
          <Header black={true} />
          {children}
          <Footer />
        </div>
      </LayoutWrapper>
    </>
  );
}
