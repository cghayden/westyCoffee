import React from 'react'
import StripeCheckout from '../components/StripeCheckout'
import styled from 'styled-components'
import CheckoutPage_CartContents from '../components/CheckoutPage_CartContents'
import SEO from '../components/SEO'
import { useCart } from '../components/CartContext'
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee'

const CheckoutPageWrapper = styled.div`
  font-family: monospace;
`

function CheckoutPage() {
  const { cartContents } = useCart()
  const { availableCoffee } = useCurrentAvailableCoffee()
  if (!availableCoffee) {
    return <p>Loading...</p>
  }
  if (!cartContents.length) {
    return (
      <div>
        <p>Your cart is empty!</p>
      </div>
    )
  }

  return (
    <CheckoutPageWrapper>
      <SEO title='Checkout' />
      <CheckoutPage_CartContents availableCoffee={availableCoffee} />
    </CheckoutPageWrapper>
  )
}
export default CheckoutPage
