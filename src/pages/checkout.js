import styled from 'styled-components';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import CartPageContents from '../components/CartPage_CartContents';

const FormStyles = styled.div`
  fieldset {
    border: none;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
  }
  .mapleSyrup {
    display: none;
  }
`;

const initialInputs = { name: '', email: '', mapleSyrup: '' };
function checkoutPage() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { cartContents, addToCart, removeFromCart, submitOrder } = useCart();
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    initialInputs,
  });

  async function placeOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await submitOrder(inputs);
    setLoading(false);
  }

  return (
    <div>
      <SEO title='Checkout' />
      <CartPageContents />
      <FormStyles action='POST'>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={inputs.name}
            onChange={handleChange}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={inputs.email}
            onChange={handleChange}
          />
          {/* decoy field for bots.  if it is filled out, bot confirmed!! */}
          <input
            type='mapleSyrup'
            name='mapleSyrup'
            id='mapleSyrup'
            value={inputs.mapleSyrup}
            onChange={handleChange}
            className='mapleSyrup'
          />
        </fieldset>
        <button type='submit' onClick={placeOrder}>
          Submit Order
        </button>
      </FormStyles>
    </div>
  );
}

export default checkoutPage;
