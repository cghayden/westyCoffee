import React from 'react'
import StripeCheckout from '../components/StripeCheckout'
import styled from 'styled-components'
import CartPageContents from '../components/CartPage_CartContents'

const CheckoutPageWrapper = styled.div`
  font-family: monospace;
`

function stripeCheckoutPage() {
  return (
    <CheckoutPageWrapper>
      <CartPageContents />
      <StripeCheckout />
    </CheckoutPageWrapper>
  )
}
export default stripeCheckoutPage
