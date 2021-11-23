import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import SEO from '../components/SEO';
import styled from 'styled-components';
import PortableText from '../components/PortableText';
import CoffeeDisplay from '../components/CoffeeDisplay';
import GlobalStyles from '../styles/GlobalStyles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/HomeHero';

const HomeWrapper = styled.div`
  height: 100vh;

  main {
    text-align: center;
    padding: 1rem 0;
    margin: 0 auto;
  }
  .whatsFresh {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
  }

  .bgImg,
  .bgImg2,
  .bgImg3 {
    position: relative;
    background: no-repeat center cover;

    /* disabled parallax because of issues on mobile */
    /* background-attachment: fixed; */
  }

  .parallax {
    background-color: pink;
    display: grid;
    place-content: center;

    /* Set a specific height */
    min-height: 800px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const SectionThree = styled.div``;

const FooterOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
  color: #000;
`;

const CoffeeContainer = styled.div`
  padding: 2rem 0;
  h2 {
    padding: 1rem 0;
    margin: 0;
  }
`;
const CoffeeText = styled.div`
  color: white;
  text-align: center;
`;
const TransitionText = styled.div`
  color: #ddd;
  background-color: #282e34;
  padding: 5vh 5vh;
  text-align: center;
  p {
    max-width: 850px;
    margin: 0 auto;
  }
  //Sanity wraps portable text with a div if there is more than one block in the content
  > div {
    max-width: 850px;
    margin: 0 auto;
  }
`;

export default function LandingPage({ data }) {
  const img1 = data?.content.bgImage1?.asset?.gatsbyImageData;
  const coffeeBgColor = data.content.coffeeBackgroundColor?.hex || '#366349';
  const coffeeBg = data.content.bgImage2.asset
    ? `url(${data.content.bgImage2.asset.gatsbyImageData.images.fallback.src})`
    : coffeeBgColor;
  const img3 = data?.content.bgImage3?.asset.gatsbyImageData;
  const bottomBg = data?.content?.bgImage4?.asset
    ? data.content.bgImage4.asset.gatsbyImageData
    : data.content.bottomBackgroundColor;
  const overlayPortableText1 = data?.content._rawOverlayText1;
  const coffeeHeading = data.content.coffeeSectionHeading;
  const coffeeText = data.content._rawCoffeeText;
  const transitionText1 = data?.content._rawTransitionText1;
  const transitionText2 = data?.content._rawTransitionText2;
  const transitionText3 = data?.content._rawTransitionText3;
  return (
    <>
      <GlobalStyles />
      <SEO title={'Home'} />
      <HomeWrapper>
        <Header black={true} />
        <div>
          {img1 && <Hero src={img1} textOverlay={overlayPortableText1} />}
        </div>
        {transitionText1 && (
          <TransitionText>
            <PortableText blocks={transitionText1} />
          </TransitionText>
        )}
        <CoffeeContainer
          className='bgImg'
          style={{
            minHeight: '400px',
            background: coffeeBg,
          }}
        >
          <h2 className='alignCenter pageHeading'>{coffeeHeading}</h2>
          {coffeeText && (
            <CoffeeText>
              <PortableText blocks={coffeeText} />
            </CoffeeText>
          )}
          <CoffeeDisplay allCoffee={data.coffees.nodes} />
        </CoffeeContainer>
        {transitionText2 && (
          <TransitionText>
            <PortableText blocks={transitionText2} />
          </TransitionText>
        )}
        <SectionThree>{img3 && <GatsbyImage image={img3} />}</SectionThree>
        {transitionText3 && (
          <TransitionText>
            <PortableText blocks={transitionText3} />
          </TransitionText>
        )}

        {bottomBg && (
          // <div className='parallax'>
          <Hero src={bottomBg} />
          // </div>
        )}
        <Footer />
      </HomeWrapper>
    </>
  );
}

export const query = graphql`
  query WelcomePageQuery {
    coffees: allSanityCoffee(filter: { stock: { gt: 0 } }) {
      nodes {
        _id
        name
        price
        region
        roastLevel
        singleOrigin
        description
        grade
        stock
        roastDate
        slug {
          current
        }
      }
    }
    content: sanityLandingPage(_id: { eq: "homePage" }) {
      bgImage1 {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      bgImage2 {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      bgImage3 {
        asset {
          gatsbyImageData(
            fit: FILL
            width: 600
            formats: AUTO
            placeholder: DOMINANT_COLOR
          )
        }
      }
      bgImage4 {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      _rawOverlayText1(resolveReferences: { maxDepth: 10 })
      overlayText1 {
        _rawChildren
      }
      _rawTransitionText1(resolveReferences: { maxDepth: 10 })
      _rawTransitionText2(resolveReferences: { maxDepth: 10 })
      _rawTransitionText3(resolveReferences: { maxDepth: 10 })
      coffeeBackgroundColor {
        hex
      }
      bottomBackgroundColor {
        hex
      }
      coffeeSectionHeading
      _rawCoffeeText(resolveReferences: { maxDepth: 10 })
    }
  }
`;
