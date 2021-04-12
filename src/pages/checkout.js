import styled from 'styled-components'
import SEO from '../components/SEO'
import useForm from '../utils/useForm'
import React, { useState } from 'react'
import { useCart } from '../components/CartContext'
import CartPageContents from '../components/CartPage_CartContents'
import useCoffeePrices from '../utils/useCoffeePrices'
const CartPageWrapper = styled.div`
  font-family: monospace;
`
const FormStyles = styled.div`
  fieldset {
    border: none;
    max-height: 600px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-content: start;
    input {
      margin: 5px;
    }
    button {
      background: green;
      color: white;
    }
  }
  .mapleSyrup {
    display: none;
  }
`

const initialInputs = { name: '', email: '', mapleSyrup: '' }
function checkoutPage() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { cartContents, addToCart, removeFromCart, submitOrder } = useCart()
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    initialInputs,
  })
  const { coffeePrices } = useCoffeePrices()

  async function placeOrder(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const orderRes = await submitOrder(inputs, coffeePrices)
    console.log('orderRes', orderRes)
    setLoading(false)
    // TODO - error handling, or redirect
  }

  if (!cartContents.length) {
    return (
      <div>
        <p>Your cart is empty!</p>
      </div>
    )
  }
  return (
    <CartPageWrapper>
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
          Submit{loading ? 'ting' : null} Order
        </button>
      </FormStyles>
    </CartPageWrapper>
  )
}

export default checkoutPage
