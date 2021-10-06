import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

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
export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query PageSettingsQuery {
      settings: allSanitySiteSettings {
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

  const bgImg =
    data?.settings.edges[0].node.backgroundImage?.asset.gatsbyImageData.images
      .fallback.src;
  console.log('layout bgImg', bgImg);
  const bgColor = data?.settings.edges[0].node.backgroundColor.hex || '#366349';

  const bg = bgImg ? `url(${bgImg})` : bgColor;

  if (!bg) return null;
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
