import styled from 'styled-components'

const StripeCheckoutStyles = styled.div`
  width: 95%;
  max-width: 500px;
  height: 400px;
  position: relative;
  margin: 0 auto;

  input,
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border-style: none;
  }

  html {
    background-color: #6772e5;
    font-size: 16px;
    font-family: Roboto, Open Sans, Segoe UI, sans-serif;
    font-weight: 500;
    font-style: normal;
    text-rendering: optimizeLegibility;
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes fade {
    from {
      opacity: 0;
      transform: scale3D(0.95, 0.95, 0.95);
    }
    to {
      opacity: 1;
      transform: scale3D(1, 1, 1);
    }
  }

  .Form {
    animation: fade 200ms ease-out;
  }

  .FormGroup {
    margin: 0 15px 20px;
    padding: 0;
    border-style: none;
    background-color: #f0f1f6;
    will-change: opacity, transform;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }

  .FormRow {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-left: 15px;
    border-top: 1px solid #819efc;
  }

  .FormRow:first-child {
    border-top: none;
  }

  .FormRowLabel {
    width: 15%;
    min-width: 70px;
    padding: 11px 0;
    color: darkblue;
    /* color: #c4f0ff; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @keyframes void-animation-out {
    0%,
    to {
      opacity: 1;
    }
  }
  .FormRowInput:-webkit-autofill {
    -webkit-text-fill-color: black;
    /* Hack to hide the default webkit autofill */
    transition: background-color 100000000s;
    animation: 1ms void-animation-out;
  }

  .FormRowInput {
    font-size: 16px;
    width: 100%;
    padding: 11px 15px 11px 0;
    color: black;
    background-color: transparent;
    animation: 1ms void-animation-out;
  }

  .FormRowInput::placeholder {
    color: gray;
  }

  .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  .StripeElement {
    width: 100%;
    padding: 11px 15px 11px 0;
  }

  .SubmitButton {
    display: block;
    font-size: 16px;
    width: calc(100% - 30px);
    height: 40px;
    margin: 40px 15px 0;
    /* background-color: #f6a4eb; */
    background-color: green;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 #ffb9f6;
    border-radius: 4px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 100ms ease-in-out;
    will-change: transform, background-color, box-shadow;
  }

  .SubmitButton:active {
    background-color: lightgreen;
    /* background-color: #d782d9; */
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 #e298d8;
    transform: scale(0.99);
  }

  .SubmitButton.SubmitButton--error {
    transform: translateY(15px);
  }
  .SubmitButton.SubmitButton--error:active {
    transform: scale(0.99) translateY(15px);
  }

  .SubmitButton:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: #7795f8;
    box-shadow: none;
  }

  .ErrorMessage {
    color: red;
    position: absolute;
    display: flex;
    justify-content: center;
    padding: 0 15px;
    font-size: 13px;
    margin-top: 0px;
    width: 100%;
    transform: translateY(-15px);
    opacity: 0;
    animation: fade 150ms ease-out;
    animation-delay: 50ms;
    animation-fill-mode: forwards;
    will-change: opacity, transform;
  }

  .ErrorMessage svg {
    margin-right: 10px;
  }

  .Result {
    margin-top: 50px;
    text-align: center;
    animation: fade 200ms ease-out;
  }

  .ResultTitle {
    color: black;
    /* color: #fff; */
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 17px;
    text-align: center;
  }

  .ResultMessage {
    color: black;
    /* color: #9cdbff; */
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 25px;
    line-height: 1.6em;
    text-align: center;
  }

  .ResetButton {
    border: 0;
    cursor: pointer;
    background: black;
    color: white;
  }
  .mapleSyrup {
    display: none;
  }
`

export { StripeCheckoutStyles }