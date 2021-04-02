import { createGlobalStyle } from 'styled-components';

// see video 7 for more on importing svgs
// import bg from '../assets/images/bg.svg';
// import stripes from '../assets/images/stripes.svg';

const GlobalStyles = createGlobalStyle`
    background-color: lightblue;
    ul{
        list-style: none;
    }
    a {
        text-decoration: none;
    }
  
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    /* scrollbar-color: var(--red) var(--white); */
  }
  body::-webkit-scrollbar-track {
    /* background: var(--white); */
  }
  body::-webkit-scrollbar-thumb {
    /* background-color: var(--red) ; */
    border-radius: 6px;
    /* border: 3px solid var(--white); */
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyles;
