import { createGlobalStyle } from 'styled-components';

// see video 7 for more on importing svgs
// import bg from '../assets/images/bg.svg';
// import stripes from '../assets/images/stripes.svg';

const GlobalStyles = createGlobalStyle`
:root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #f7fbf8;
    --grey: #efefef;
    --green: hsla(132, 32%, 60%,.8);
    --stripeBlue: #829fff;
    --redFlame: hsla(15, 61%, 51%,1);
    --redFlameFade: hsla(15, 61%, 51%,.7);
    --blueYonder: hsla(217, 34%, 48%, 1);
    --blueYonderFade: hsla(217, 34%, 48%, .7);

    --dropShadow0: 1px 1px 0px 0px rgba(0, 0, 0, 0);
    --dropShadow1: 1px 1px 0px 0px rgba(0, 0, 0, 0.3);
    --dropShadow3: -6px 12px 14px 10px rgba(0, 0, 0, 0.3);
    --desktopBreakPoint: 768px;
  }
  * {
    box-sizing: border-box;
  }
  html{
      height: 100%;
  }
  #gatsby-focus-wrapper{
    /* background-color: var(--white); */
      height: 100%;
      display: flex;
      flex-direction: column;
      width:100%;
      margin: 0 auto;
      
  }
  #___gatsby{
      height:100%
  }
    body {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--white);
    }

    main{
      font-family: 'Nunito', sans-serif;
      text-align: center;
      max-width: 1000px;
      width:95%;
  margin: 1rem auto;
  padding: 1rem 1rem 2rem 1rem;
  background: var(--white);
  border-radius: 4px
  ;
  }
  p{
    margin:2px;
    font-size: 1rem;
  }
    //-------BUTTON AND ANCHOR STYLES ----------------//
  
// --- Default ---
  a, button {
    appearance: none;
    /* border: 0; */
    border-radius: 5px;
    background: transparent;
    color: inherit;
    /* min-width: 100px; */
    font: inherit;
    padding: .5rem 1rem;
    cursor: pointer;
    margin: 0;
    //anchors only:
    text-decoration: none;
    text-align:center;
    //if using a span inside button or a, this will keep it centered:
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // for tansitions to outlined:
    border: 1px solid transparent;

  :disabled {
      cursor: not-allowed;
  }
&.btn-icon{
  min-width:initial;
  text-align:center;
  padding: .25rem .5rem;
}
&.action-primary{
  background: var(--redFlame);
  color: white;
  /* box-shadow: var(--dropShadow1); */

  &:active{
    background: var(--redFlameFade);
    box-shadow: var(--dropShadow0);
    outline: none;

  }
  &:focus {
      border: 1px solid hsl(200, 50%, 50%);
      outline: none;
      border-radius: 5px;
    }
}
&.action-secondary{
  background: var(--blueYonder);
  color: white;
  box-shadow: var(--dropShadow1);

  &:active{
    background: var(----blueYonderFade);
    box-shadow: var(--dropShadow0);
    outline: none;

  }
  &:focus {
      border: 1px solid hsl(200, 50%, 50%);
      outline: none;
      border-radius: 5px;
    }
}
}

    ul{
        list-style: none;
        padding:0;
    }
  
  html {
    scrollbar-width: thin;
    /* scrollbar-color: var(--red) var(--white); */
  }

  img {
    max-width: 100%;
  }

  .hideOnDesktop{
    @media screen and (min-width: 768px) {
        display: none;
    }
  }
  .hideOnMobile {
      @media screen and (max-width: 768px) {
          display:none;
      }
  }
`;

export default GlobalStyles;
