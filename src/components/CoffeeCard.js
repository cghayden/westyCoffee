import { Link } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';
import useForm from '../utils/useForm';
import { useCart } from './CartContext';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';

const CardStyle = styled.div`
  background: var(--green);
  border-radius: 4px;
  width: 260px;
  height: 260px;
  padding: 8px;
  margin-bottom: 4px;
  display: grid;
  grid-template-rows: 32px 1fr 26px;
  /* box-shadow: 1px 1px 3px 1px var(--green); */

  header {
    width: 100%;
    font-size: 1.5rem;
    a {
      padding: 0;
    }
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
    justify-content: space-evenly;
  }
  .input-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 6px 0;
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
function CoffeeCard({ coffee, showOrderForm, toggleOrderForm }) {
  const { addToCart, totalCartPounds, openCart } = useCart();
  const { inputs, handleChange, resetForm, clearForm } = useForm(
    initialInputValues
  );
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  function submitToCart(e) {
    e.preventDefault();
    const poundsToAdd =
      inputs.size === 'half pound' ? quantity * 0.5 : quantity;
    if (!inputs.grind) {
      setError('Please Choose A Grind');
      return;
    }
    if (totalCartPounds[coffee.name] + poundsToAdd > coffee.stock) {
      setError('There is not sufficient quantity available in stock');
      return;
    }
    addToCart({
      quantity: quantity,
      coffee: coffee.name,
      grind: inputs.grind,
      unitPrice: inputs.size === 'half pound' ? coffee.price / 2 : coffee.price,
      size: inputs.size,
    });
    toggleOrderForm(false);
    openCart();
  }

  const cost = coffee.price / 100;
  return (
    <CardStyle>
      <header>
        <Link to={`/coffee/${coffee.slug.current}`}>{coffee.name}</Link>
      </header>
      <CoffeeDetails>
        <p>{coffee.roastLevel} roast</p>
        <p>{coffee.description}</p>
        <p>{coffee.region}</p>
        <p>{coffee.grade}</p>
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
            <button className='action-secondary' type='submit'>
              Add {quantity} {inputs.size} bag{quantity > 1 ? `s` : null} to
              Cart
            </button>
          </fieldset>
        </OrderForm>
      </CoffeeDetails>
      <p className='price'>$ {cost} / lb.</p>
    </CardStyle>
  );
}

export default CoffeeCard;
