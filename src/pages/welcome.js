import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import PortableText from '../components/PortableText';
import garage1 from '../assets/images/garage1.jpg';
import darkWood11 from '../assets/images/darkWood11.jpeg';
import basicShop from '../assets/images/basicShop.jpg';
import roasterGrill from '../assets/images/roasterGrill.png';
import CoffeeDisplay from '../components/CoffeeDisplay';
import GlobalStyles from '../styles/GlobalStyles';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeWrapper = styled.div`
  height: 100vh;
  .bgImg1 {
    background-image: url(${garage1});
    min-height: 100%;
  }
  .bgImg2 {
    background-image: url(${darkWood11});
    min-height: 400px;
  }
  .bgImg3 {
    background-image: url(${basicShop});
    min-height: 350px;
  }
  .bgImg4 {
    background-image: url(${roasterGrill});
    min-height: 100%;
  }

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

  .bgImg1,
  .bgImg2,
  .bgImg3,
  .bgImg4 {
    position: relative;
    /* opacity: 0.65; */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
const TextOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 33%;
  width: 100%;
  /* transform: translateY(-50%); */
  text-align: center;
  color: #000;
  span {
    background-color: #111;
    color: #d5e5d5;
    padding: 18px;
    font-size: 25px;
    letter-spacing: 5px;
  }
  p {
    color: #d5e5d5;
    font-size: 12px;
  }
`;
const FooterOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
  color: #000;
`;
const HomeText = styled.div`
  color: #777;
  background-color: white;
  padding: 50px 80px;
  text-align: justify;
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
const TransitionTextContainer = styled.div`
  position: relative;
`;
const TransitionText = styled.div`
  color: #ddd;
  background-color: #282e34;
  padding: 50px 80px;
  text-align: center;
`;
export default function welcomePage({ data }) {
  const pageHeading = data ? data.homePageText.heading : '';
  const text = data ? data.homePageText._rawContent : [];

  return (
    <>
      <GlobalStyles />
      <SEO title={'Home'} />
      <HomeWrapper>
        <Header black={true} />
        <div className='bgImg1'>
          <TextOverlay>
            <span>neighborly coffee</span>
            <p>(optional text container)</p>
          </TextOverlay>
        </div>
        <HomeText>
          <h2>Neighborly Coffee</h2>
          <p>
            Parallax scrolling is a web site where the trend background content
            is moved at a different speed than the foreground content while
            scrolling. Shall not put through school, graduated ugly now but not
            free, but set free the soft ullamcorper graduated sit the kids, a
            big ugly homework sapien sit asset.
          </p>
        </HomeText>
        <CoffeeContainer className='bgImg2'>
          <h2 className='alignCenter pageHeading'>{pageHeading}</h2>
          <CoffeeText>
            <PortableText blocks={text} />
          </CoffeeText>
          <CoffeeDisplay allCoffee={data.coffees.nodes} />
        </CoffeeContainer>
        <TransitionText>
          <p>Transition Text can go here</p>
        </TransitionText>
        <div className='bgImg3'></div>
        <TransitionText>
          <p>Transition Text can go here</p>
        </TransitionText>
        <div className='bgImg4'>
          <FooterOverlay>
            <Footer />
          </FooterOverlay>
        </div>
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
    homePageText: sanityTextBlock(name: { eq: "Home Page Lead" }) {
      id
      heading
      _rawContent
    }
  }
`;
