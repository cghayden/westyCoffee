import React, { useState } from 'react';
import styled from 'styled-components';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import { useCart } from './CartContext';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';

const FormStyles = styled.form`
  width: 300px;
  /* max-width: 350px; */
  padding: 0.5rem;
  width: max-content;
  /* margin: 0 auto; */
  h3 {
    font-size: 18px;
    color: var(--blueYonder);
  }
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: baseline;
    margin: 0 auto;
  }
  .input-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    .input-item-label {
      padding-right: 10px;
      font-size: 17px;
      font-weight: 400;
    }
    .radio-item-label {
      padding-right: 10px;
      font-size: 16px;
      font-weight: 300;
    }
    .radioChoices {
      label {
        margin: 0 5px;
      }
      input {
        margin-right: 5px;
      }
    }
  }
  #comments {
    display: flex;
    flex-direction: column;
  }
  .sizePrice {
    margin-left: 1ch;
  }
  p.errorMessage {
    font-size: 13px;
    color: red;
    text-align: center;
  }
  button {
    margin-top: 5px;
    width: 80%;
    place-self: center;
    padding: 8px 16px;
  }
  .errorDisplay {
    height: 16px;
    width: 100%;
  }
`;
const QuantitySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 40px);
  place-items: center;
  width: 120px;
  button {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.5rem;
  }
`;
const initialInputValues = { size: 'one pound' };

function AddToCartForm({ coffee }) {
  const { addToCart, totalCartPounds, openCart } = useCart();
  const { inputs, handleChange } = useForm(initialInputValues);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  function submitToCart(e) {
    e.preventDefault();
    const poundsToAdd =
      inputs.size === 'half pound' ? quantity * 0.5 : quantity;
    if (!inputs.grind) {
      setError('Whole Bean or Ground?');
      return;
    }
    if (totalCartPounds[coffee.name] + poundsToAdd > coffee.stock) {
      setError('There is not sufficient quantity available');
      return;
    }
    addToCart({
      quantity: quantity,
      name: coffee.name,
      grind: inputs.grind,
      unitPrice: inputs.size === 'half pound' ? coffee.price / 2 : coffee.price,
      size: inputs.size,
      _ref: coffee._id,
    });
    openCart();
  }
  return (
    <FormStyles action='POST' onSubmit={submitToCart}>
      <fieldset>
        <div className='input-item'>
          <label className='input-item-label'>quantity:</label>
          <QuantitySelector>
            <button
              type='button'
              disabled={quantity === 1}
              onClick={() => setQuantity((q) => (q -= 1))}
            >
              <MinusSvg w={'18'} h={'18'} />
            </button>
            <p>{quantity}</p>
            <button
              type='button'
              onClick={() =>
                setQuantity((q) => {
                  return (q += 1);
                })
              }
            >
              <PlusSvg w={'18'} h={'18'} />
            </button>
          </QuantitySelector>
        </div>
        <div className='input-item'>
          <p className='input-item-label'>size:</p>
          <div className='radioChoices'>
            {/* <label htmlFor='size8' className='input-item-label'> */}
            {/* <input
                id='size8'
                type='radio'
                name='size'
                value='half pound'
                checked={inputs.size === 'half pound'}
                onChange={handleChange}
              />
              8 oz.
            </label> */}
            <label htmlFor='size16' className='radio-item-label'>
              <input
                id='size16'
                type='radio'
                name='size'
                value='one pound'
                checked={inputs.size === 'one pound'}
                onChange={handleChange}
              />
              One Pound
              <span className='sizePrice'>
                ${formatMoney(coffee.price)} / lb
              </span>
            </label>
          </div>
        </div>

        <div className='input-item'>
          <label htmlFor='grind' className='input-item-label'>
            grind:
          </label>
          <select
            style={{ maxWidth: '200px' }}
            required
            id='grind'
            name='grind'
            value={inputs.grind}
            onChange={(e) => {
              setError();
              handleChange(e);
            }}
            defaultValue='Select ...'
          >
            <option value='Select ...' default disabled>
              Select ...
            </option>
            <option value='whole bean'>Whole Bean</option>
            <option value='ground'>Ground</option>
          </select>
        </div>
        {/* <div className='input-item' id='comments'>
          <label className='visuallyHidden' for='comments'>
            comments:
          </label>
          <textarea
            placeholder='comments'
            id='comments'
            name='comments'
            rows='3'
            cols='26'
            onChange={handleChange}
          ></textarea>
        </div> */}
        <div className='errorDisplay'>
          {error && <p className='errorMessage'>{error}</p>}
        </div>
        <button className='action-secondary' type='submit'>
          Add {quantity} {inputs.size} bag{quantity > 1 ? `s` : null} to Cart
        </button>
      </fieldset>
    </FormStyles>
  );
}

export default AddToCartForm;
