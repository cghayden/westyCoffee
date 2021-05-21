import styled from 'styled-components';

const StripeCheckoutStyles = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  margin: 0 auto 1rem auto;
  font-size: 14px;

  input,
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border-style: none;
  }
  input[type='radio'] {
    border: 1px solid gray;
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
    position: relative;
  }

  .FormGroup {
    margin: 1rem 0px;
    padding: 0;
    border-style: none;
    background-color: #f4f4f7;
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
  .FormRow.radioStack {
    flex-direction: column;
  }
  .FormRow:after,
  .FormRow:before {
    content: '';
    display: table;
  }

  .FormRow:first-child {
    border-top: none;
  }
  .FormRow.flex-start {
    align-items: flex-start;
  }
  .radio__input,
  .checkbox__input {
    display: table;
    padding-right: 0.75em;
    white-space: nowrap;
  }
  .radio-wrapper,
  .checkbox-wrapper {
    zoom: 1;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  .radio-wrapper:last-child,
  .checkbox-wrapper:last-child {
    margin-bottom: 0;
  }
  .radio__input,
  .checkbox__input {
    padding-right: 0.75em;
    white-space: nowrap;
  }
  .display-table .radio__input,
  .display-table .checkbox__input {
    display: table-cell;
  }
  .radio__label,
  .checkbox__label {
    cursor: pointer;
    vertical-align: middle;
    display: flex;
    align-items: center;
  }
  .display-table .radio__label,
  .display-table .checkbox__label {
    /* display: table-cell; */
    /* width: 100%; */
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  .display-table .radio__label__primary:only-child {
    display: block;
  }
  .display-table .radio__label__primary {
    display: table-cell;
    width: 100%;
  }

  .radio__label--active {
    color: #3097b4;
  }
  .radio__label > svg {
    margin-right: 10px;
    fill: currentColor;
  }
  .input-checkbox,
  .input-radio {
    background-color: white;
    cursor: pointer;
    padding: 0;
    white-space: nowrap;
    width: 18px;
    height: 18px;
    transition: all 0.2s ease-in-out;
    position: relative;
    cursor: pointer;
    vertical-align: -4px;
    border: 1px solid;
  }
  .input-checkbox:checked,
  .input-radio:checked {
    border-color: darkblue;
  }
  .input-radio:checked {
    border-width: 7px;
  }
  .input-radio:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
    outline: darkblue auto 1px;
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
    font-size: 1.1rem;
    width: 100%;
    padding: 11px 15px 11px 0;
    color: black;
    background-color: transparent;
    animation: 1ms void-animation-out;
  }

  .FormRowInput::placeholder {
    color: gray;
    font-size: 0.95rem;
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
    margin: 16px 15px 0;
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

  .form-dropdown {
    transition: all 1s;
    height: auto;
  }
  &::placeholder {
    color: gray;
    /* color: var(--darkGray); */
    opacity: 1;
  }
  .pickupAddress {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .pickupAddress p {
    margin: 0;
    font-size: 14px;
  }
  .pickupAddress > .pickup-locationName {
    font-size: 17px;
  }
  .form-heading {
    font-weight: normal;
    color: darkblue;
  }
`;

export { StripeCheckoutStyles };
