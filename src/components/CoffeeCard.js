import React, { useState } from 'react';
import styled from 'styled-components';
import useForm from '../utils/useForm';
import { useCart } from './CartContext';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';
// import formatMoney from '../utils/formatMoney';

const CardStyle = styled.div`
  width: 220px;
  height: 220px;
  background: hsla(120, 73%, 75%, 0.56);
  padding: 10px;
  display: grid;
  grid-template-rows: 40px 1fr 30px;

  header {
    width: 100%;
    /* grid-column: 1/-1; */
    font-size: 1.5rem;
  }
  p {
    font-size: 1.1rem;
    margin: 0;
    &.price {
      font-size: 1.2rem;
      align-self: flex-end;
    }
  }
`;
const CoffeeDetails = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  flex-direction: column;
  place-items: center;
`;
const OrderForm = styled.form`
  background: var(--white);
  height: ${(props) => (props.open ? '100%' : 0)};
  transition: all 0.3s;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  p {
    font-size: 1rem;
  }
  /* padding-top: 5px; */
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .input-item {
    display: flex;
    justify-content: space-around;
    align-items: center;

    label {
      /* margin-right: auto; */
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
  p.errorMessage {
    font-size: 13px;
    color: red;
  }
  button {
    width: 80%;
    place-self: center;
    padding: 4px 8px;
  }
  .errorDisplay {
    height: 16px;
    width: 100%;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
  button {
    padding: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.5rem;
    padding-bottom: 4px;
  }
`;
const initialInputValues = { size: 'half pound' };
function CoffeeCard({ coffee, showOrderForm }) {
  const { addToCart } = useCart();
  const { inputs, handleChange, resetForm, clearForm } = useForm(
    initialInputValues
  );
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  function submitToCart(e) {
    e.preventDefault();
    if (!inputs.grind) {
      setError('Please Choose A Grind');
      return;
    }
    addToCart({
      quantity: quantity,
      coffee: coffee.name,
      grind: inputs.grind,
      unitPrice: inputs.size === 'half pound' ? coffee.price / 2 : coffee.price,
      size: inputs.size,
    });
  }

  const cost = coffee.price / 100;
  return (
    <CardStyle>
      <header>{coffee.name}</header>
      <CoffeeDetails>
        <p>{coffee.roastLevel} roast</p>
        <p>{coffee.description}</p>
        <p>{coffee.region}</p>
        <OrderForm action='POST' onSubmit={submitToCart} open={showOrderForm}>
          <fieldset>
            <div className='input-item'>
              <label htmlFor='grind'>Grind:</label>
              <select
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
                <option value='coarse ground'>Coarse</option>
                <option value='medium ground'>Medium</option>
                <option value='fine ground'>Fine</option>
              </select>
            </div>
            <div className='input-item'>
              <p>Size:</p>
              <div className='radioChoices'>
                <label htmlFor='size8'>
                  <input
                    id='size8'
                    type='radio'
                    name='size'
                    value='half pound'
                    checked={inputs.size === 'half pound'}
                    onChange={handleChange}
                  />
                  8 oz.
                </label>
                <label htmlFor='size16'>
                  <input
                    id='size16'
                    type='radio'
                    name='size'
                    value='one pound'
                    checked={inputs.size === 'one pound'}
                    onChange={handleChange}
                  />
                  16 oz.
                </label>
              </div>
            </div>
            <div className='input-item'>
              <label>Quantity:</label>
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
                      //if q <= in stock, add 1
                      return (q += 1);
                    })
                  }
                >
                  <PlusSvg w={'18'} h={'18'} />
                </button>
              </QuantitySelector>
            </div>
            <div className='errorDisplay'>
              {error && <p className='errorMessage'>{error}</p>}
            </div>
            <button className='action-primary' type='submit'>
              Add to Cart
            </button>
          </fieldset>
        </OrderForm>
      </CoffeeDetails>
      <p className='price'>$ {cost} / lb.</p>
    </CardStyle>
  );
}

export default CoffeeCard;
