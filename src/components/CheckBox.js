import React from 'react';
import styled from 'styled-components';

function CheckBox({ name }) {
  return (
    <Checkbox_RadioWrapper>
      <Checkbox_RadioInput>
        <input name={name} type='hidden' value='' />
        <input
          class='input-checkbox'
          data-backup='buyer_accepts_marketing'
          type='checkbox'
          value=''
          checked=''
          name={name}
          id='checkout_buyer_accepts_marketing'
        />
      </Checkbox_RadioInput>
      <label class='checkbox__label' for='checkout_buyer_accepts_marketing'>
        Keep me up to date on news and exclusive offers
      </label>
    </Checkbox_RadioWrapper>
  );
}

export default CheckBox;

const Checkbox_RadioWrapper = styled.div`
  display: table;
  width: 100%;
  margin-bottom: 1em;
  :last-child {
    margin-bottom: 0;
  }
`;
const Checkbox_RadioInput = styled.div`
  input[type='hidden'] {
    display: none;
  }
`;
