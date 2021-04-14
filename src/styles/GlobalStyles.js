import { createGlobalStyle } from 'styled-components'

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
    --green: hsla(138, 75%, 75%,1);
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
      height: 100%;
      display: flex;
      flex-direction: column;
  }
  #___gatsby{
      height:100%
  }
    body {
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    main{
      text-align: center;
      font-family: 'Raleway', sans-serif;
      /* min-height: calc(100vh - 200px); */
      max-width: 900px;
  margin: 0 auto;
  padding-bottom: 2rem;
  }
  footer{
      margin-top: auto;
  }

  .content {
      flex: 1 0 auto
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
  box-shadow: var(--dropShadow1);

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
`

export default GlobalStyles
