import styled from 'styled-components'
import SEO from '../components/SEO'
import useForm from '../utils/useForm'
import React, { useState } from 'react'
import { useCart } from '../components/CartContext'
import CartPageContents from '../components/CartPage_CartContents'
import useCoffeePrices from '../utils/useCoffeePrices'

import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

const stripeLib = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const CheckoutPageWrapper = styled.div`
  font-family: monospace;
`
const FormStyles = styled.form`
  padding: 1rem;
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
  }
  button {
    background: green;
    color: white;
  }
  .StripeElement {
    height: 70px;
    border: 1px solid black;
    form > input {
      color: red;
    }
  }
  .mapleSyrup {
    display: none;
  }
`

function CheckoutForm() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { cartContents, addToCart, removeFromCart, processOrder } = useCart()
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  })
  const { coffeePrices } = useCoffeePrices()
  const stripe = useStripe()

  async function placeOrder(e) {
    e.preventDefault()
    //1.  stop from submit, turn loader on
    //2.  start oage transition
    //3.  create payment via stripe (Token comes back here if successful)
    //4. handle errors from Stripe
    //5. Send success token from step 3 to our serverless function
    //6. Succcess? change to page to view order.
    //7. Empty Cart Contents
    //8. turn loader off

    setLoading(true)
    setError(null)
    const orderRes = await processOrder(inputs, coffeePrices)
    console.log('orderRes', orderRes)
    setLoading(false)
    // TODO - error handling, or redirect
  }
  return (
    <FormStyles action='POST' onSubmit={placeOrder}>
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

        <CardElement />
      </fieldset>

      <button type='submit'>Submit{loading ? 'ting' : null} Order</button>
    </FormStyles>
  )
}

function checkoutPage() {
  //   if (!cartContents.length) {
  //     return (
  //       <div>
  //         <p>Your cart is empty!</p>
  //       </div>
  //     )
  //   }
  return (
    <CheckoutPageWrapper>
      <SEO title='Checkout' />
      <CartPageContents />
      <Elements stripe={stripeLib}>
        <CheckoutForm />
      </Elements>
    </CheckoutPageWrapper>
  )
}
export default checkoutPage
