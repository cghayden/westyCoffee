import React from 'react';
import styled from 'styled-components';

function CheckBox({ name }) {
  return (
    <CheckboxRadioWrapper>
      <CheckboxRadioInput>
        <input name={name} type='hidden' value='' />
        <input
          className='input-checkbox'
          data-backup='buyer_accepts_marketing'
          type='checkbox'
          value=''
          checked=''
          name={name}
          id='checkout_buyer_accepts_marketing'
        />
      </CheckboxRadioInput>
      <label className='checkbox__label' for='checkout_buyer_accepts_marketing'>
        Keep me up to date on news and exclusive offers
      </label>
    </CheckboxRadioWrapper>
  );
}

export default CheckBox;

const CheckboxRadioWrapper = styled.div`
  display: table;
  width: 100%;
  margin-bottom: 1em;
  :last-child {
    margin-bottom: 0;
  }
`;
const CheckboxRadioInput = styled.div`
  input[type='hidden'] {
    display: none;
  }
`;
