// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripeCheckoutStyles } from '../styles/StripeCheckoutStyles';
import ShippingTruckIcon from './Icons/ShippingTruckIcon';
import StoreFrontIcon from './Icons/StoreFrontIcon';
import { useCart } from './CartContext';
import Stripe_Blurple from '../assets/images/Stripe_Blurple.png';

const RadioLabel = styled.label`
  cursor: pointer;
  vertical-align: middle;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: ${(props) => (props.active ? 'darkblue' : 'gray')};
  font-size: 1rem;
  span {
    margin-top: 5px;
    transition: all 0.2s ease-in-out;
  }
  .subLabel {
    font-size: 0.8rem;
  }
`;
const RadioInput = styled.input`
  appearance: none;
  border-radius: 50%;
`;

const ErrorStyle = styled.div`
  color: red;
  padding-bottom: red;
`;
const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className='FormRow'>
    <label htmlFor={id} className='FormRowLabel'>
      {label}
    </label>
    <input
      className='FormRowInput'
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const StripeLogoDiv = styled.div`
  width: 44px;
  height: 20px;
  background-image: url(${Stripe_Blurple});
  background-size: contain;
`;
const CheckoutForm = ({ setShippingBoolean, grandTotal, customerComments }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeError, setStripeError] = useState(null);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  });
  const [shippingDetails, setShippingDetails] = useState({
    deliveryMethod: 'Pickup',
    pickupLocation: '',
    shippingName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [botBait, setBotBait] = useState('');
  const { processOrder, emptyCart } = useCart();

  async function adjustSanityStock(orderItems) {
    const sanityApi =
      process.env.NODE_ENV === 'development'
        ? `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/dev`
        : `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/production`;

    const adjustQuantityMutations = orderItems.map((orderItem) => ({
      patch: {
        id: orderItem._ref,
        dec: {
          stock:
            orderItem.size === 'half pound'
              ? orderItem.quantity * 0.5
              : orderItem.quantity,
        },
      },
    }));
    await fetch(sanityApi, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.GATSBY_SANITY_MUTATION_API}`,
      },
      body: JSON.stringify({ mutations: adjustQuantityMutations }),
    }).catch((error) => {
      console.error('ERROR ADJUSTING PRODUCT STOCK', error);
      // send error to neighborly that stock could not be adjusted
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!stripe || !elements || !cardComplete) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    if (stripeError) {
      elements.getElement('card').focus();
      return;
    }
    if (cardComplete) {
      setProcessing(true);
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });
    if (error) {
      console.error('error creating payment method', error);
      setProcessing(false);
      setError(error);
      return;
    } else {
      const orderRes = await processOrder(
        billingDetails,
        shippingDetails,
        paymentMethod,
        customerComments,
        botBait,
        process.env.NODE_ENV
      );
      const parsedResponse = await orderRes.json();
      if (orderRes.status >= 400 && orderRes.status < 600) {
        setError(parsedResponse.error || 'there was an error');
        setProcessing(false);
        setPaymentMethod(null);
      } else {
        //update stock
        adjustSanityStock(parsedResponse.orderItems);
        //route to order summary page
        emptyCart();
        resetPage();
        navigate('/order', {
          state: parsedResponse,
        });
      }
    }
  }

  const resetPage = () => {
    setStripeError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      name: '',
      email: '',
      phone: '',
    });
    setShippingDetails({
      deliveryMethod: 'Pickup',
      pickupLocation: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
    });
  };

  return paymentMethod ? (
    <div className='Result'>
      <div className='ResultTitle' role='alert'>
        Processing Payment...
      </div>
    </div>
  ) : (
    <form className='Form' onSubmit={handleSubmit}>
      {error && (
        <ErrorStyle>
          <p>!! Your payment failed: </p>
          <p>{error}</p>
        </ErrorStyle>
      )}
      <fieldset className='FormGroup display-table'>
        <div className='FormRow radioStack'>
          <div className='radio-wrapper FormRowInput'>
            <div className='radio__input'>
              <RadioInput
                className='input-radio'
                type='radio'
                value='Pickup'
                active={shippingDetails.deliveryMethod === 'Pickup'}
                checked={shippingDetails.deliveryMethod === 'Pickup'}
                name='deliveryMethod'
                id='checkout_id_delivery-pickup'
                onChange={(e) => {
                  setShippingBoolean(false);
                  setShippingDetails({
                    ...shippingDetails,
                    deliveryMethod: e.target.value,
                  });
                }}
              />
            </div>
            <RadioLabel
              active={shippingDetails.deliveryMethod === 'Pickup'}
              htmlFor='checkout_id_delivery-pickup'
            >
              <span className='radio__label'>
                <StoreFrontIcon />
                free pickup
              </span>
              {/* <span>free</span> */}
            </RadioLabel>
          </div>
          <div className='radio-wrapper FormRowInput'>
            <div className='radio__input'>
              <RadioInput
                className='input-radio'
                type='radio'
                active={shippingDetails.deliveryMethod === 'Shipping'}
                checked={shippingDetails.deliveryMethod === 'Shipping'}
                value='Shipping'
                name='deliveryMethod'
                id='checkout_id_delivery-shipping'
                onChange={(e) => {
                  setShippingBoolean(true);
                  setShippingDetails({
                    ...shippingDetails,
                    deliveryMethod: e.target.value,
                  });
                }}
              />
            </div>
            <RadioLabel
              active={shippingDetails.deliveryMethod === 'Shipping'}
              htmlFor='checkout_id_delivery-shipping'
            >
              <span className='radio__label'>
                <ShippingTruckIcon w='18' h='18' />
                $10 shipping
              </span>
              <span className='subLabel'>free on orders over $50</span>
            </RadioLabel>
          </div>
        </div>
      </fieldset>

      {/* ****** Shipping or delivery details ********* */}
      <AnimatePresence exitBeforeEnter>
        {shippingDetails.deliveryMethod && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            style={{ overflow: 'hidden' }}
          >
            {shippingDetails.deliveryMethod === 'Shipping' && (
              <motion.div
                key={'shipping'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <legend className='form-heading'>ship to:</legend>
                <fieldset className='FormGroup'>
                  <ShippingAddressInput
                    shippingDetails={shippingDetails}
                    setShippingDetails={setShippingDetails}
                  />
                </fieldset>
              </motion.div>
            )}
            {shippingDetails.deliveryMethod === 'Pickup' && (
              <motion.div
                key={'pickup'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <legend className='form-heading'>pickup location</legend>
                <fieldset className='FormGroup'>
                  <PickupChoiceInput
                    shippingDetails={shippingDetails}
                    setShippingDetails={setShippingDetails}
                  />
                </fieldset>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <legend className='form-heading'>payment / contact details</legend>
      <fieldset className='FormGroup'>
        <Field
          label={!billingDetails.name.length ? '' : 'name'}
          id='name'
          type='text'
          placeholder={!billingDetails.name.length ? 'name' : null}
          required
          autoComplete='name'
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label={!billingDetails.email.length ? '' : 'email'}
          id='email'
          type='email'
          placeholder={!billingDetails.email.length ? 'email' : null}
          required
          autoComplete='email'
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label={!billingDetails.phone.length ? '' : 'phone'}
          id='phone'
          type='tel'
          placeholder={!billingDetails.phone.length ? 'phone' : null}
          required
          autoComplete='tel'
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
        <input
          type='mapleSyrup'
          name='mapleSyrup'
          id='mapleSyrup'
          value={billingDetails.mapleSyrup}
          onChange={(e) => {
            setBotBait(e.target.value);
          }}
          className='mapleSyrup'
        />
      </fieldset>
      <fieldset className='FormGroup'>
        <CardField
          onChange={(e) => {
            setStripeError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      <div
        style={{
          color: 'darkblue',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: '13px' }}>checkout securely with</p>
        <StripeLogoDiv />
      </div>

      {stripeError && (
        <FormErrorMessage>{stripeError.message}</FormErrorMessage>
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      <SubmitButton
        processing={processing}
        error={stripeError || error}
        disabled={!stripe || !elements || processing || !cardComplete}
      >
        Pay ${grandTotal}
      </SubmitButton>
    </form>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NODE_ENV === 'production'
    ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
    : process.env.GATSBY_STRIPE_TEST_PUBLISHABLE_KEY
);

export default function StripeCheckout({
  shippingBoolean,
  setShippingBoolean,
  grandTotal,
  customerComments,
}) {
  return (
    <StripeCheckoutStyles>
      <Elements
        stripe={stripePromise}
        // options={ELEMENTS_OPTIONS}
      >
        <CheckoutForm
          grandTotal={grandTotal}
          shippingBoolean={shippingBoolean}
          setShippingBoolean={setShippingBoolean}
          customerComments={customerComments}
        />
      </Elements>
    </StripeCheckoutStyles>
  );
}

function ShippingAddressInput({ shippingDetails, setShippingDetails }) {
  return (
    <>
      <Field
        label={!shippingDetails.shippingName.length ? '' : 'name'}
        id='shippingName'
        type='text'
        placeholder={!shippingDetails.shippingName.length ? 'name' : null}
        required={shippingDetails.deliveryMethod === 'Shipping'}
        autoComplete='name'
        value={shippingDetails.shippingName}
        onChange={(e) => {
          setShippingDetails({
            ...shippingDetails,
            shippingName: e.target.value,
          });
        }}
      />
      <Field
        label={!shippingDetails.addressLine1.length ? '' : 'address'}
        id='addressLine1'
        type='text'
        placeholder={!shippingDetails.addressLine1.length ? 'address' : null}
        required={shippingDetails.deliveryMethod === 'Shipping'}
        autoComplete='address-line1'
        value={shippingDetails.addressLine1}
        onChange={(e) => {
          setShippingDetails({
            ...shippingDetails,
            addressLine1: e.target.value,
          });
        }}
      />
      <Field
        label={!shippingDetails.addressLine2.length ? '' : ''}
        id='addressLine2'
        type='text'
        placeholder={!shippingDetails.addressLine2.length ? 'apt, etc.' : null}
        autoComplete='address-line2'
        value={shippingDetails.addressLine2}
        onChange={(e) => {
          setShippingDetails({
            ...shippingDetails,
            addressLine2: e.target.value,
          });
        }}
      />
      <Field
        label={!shippingDetails.city.length ? '' : 'city'}
        id='city'
        type='city'
        placeholder={!shippingDetails.city.length ? 'city' : null}
        required={shippingDetails.deliveryMethod === 'Shipping'}
        autoComplete='address-level2'
        value={shippingDetails.city}
        onChange={(e) => {
          setShippingDetails({ ...shippingDetails, city: e.target.value });
        }}
      />
      <Field
        label={!shippingDetails.state.length ? '' : 'state'}
        id='state'
        type='state'
        placeholder={!shippingDetails.state.length ? 'state' : null}
        required={shippingDetails.deliveryMethod === 'Shipping'}
        autoComplete='address-level1'
        value={shippingDetails.state}
        onChange={(e) => {
          setShippingDetails({ ...shippingDetails, state: e.target.value });
        }}
      />
      <Field
        label={!shippingDetails.zip.length ? '' : 'zip'}
        id='zipCode'
        type='text'
        placeholder={!shippingDetails.zip.length ? 'zip' : null}
        autoComplete='postal-code'
        value={shippingDetails.zip}
        onChange={(e) => {
          setShippingDetails({ ...shippingDetails, zip: e.target.value });
        }}
      />
    </>
  );
}
function PickupChoiceInput({ shippingDetails, setShippingDetails }) {
  return (
    <>
      <div className='FormRow flex-start'>
        <div className='radio-wrapper FormRowInput'>
          <div className='radio__input'>
            <RadioInput
              className='input-radio'
              type='radio'
              active={shippingDetails.pickupLocation === 'Daniels'}
              checked={shippingDetails.pickupLocation === 'Daniels'}
              value='Daniels'
              name='pickupLocation'
              id='checkout_id_pickup-daniels'
              onChange={(e) => {
                setShippingDetails({
                  ...shippingDetails,
                  pickupLocation: e.target.value,
                });
              }}
            />
          </div>
          <RadioLabel
            active={shippingDetails.pickupLocation === 'Daniels'}
            htmlFor='checkout_id_pickup-daniels'
          >
            <div className='radio__label pickupAddress'>
              <p className='pickup-locationName'>neighborly coffee</p>
              <p>36 lincoln rd.</p>
              <p>sharon, ma 02067</p>
            </div>
          </RadioLabel>
        </div>
      </div>
      <div className='FormRow flex-start'>
        <div className='radio-wrapper FormRowInput'>
          <div className='radio__input'>
            <RadioInput
              className='input-radio'
              type='radio'
              value='Edge'
              active={shippingDetails.pickupLocation === 'Edge'}
              checked={shippingDetails.pickupLocation === 'Edge'}
              name='pickupLocation'
              id='checkout_id_pickup-edge'
              onChange={(e) => {
                setShippingDetails({
                  ...shippingDetails,
                  pickupLocation: e.target.value,
                });
              }}
            />
          </div>
          <RadioLabel
            active={shippingDetails.pickupLocation === 'Edge'}
            htmlFor='checkout_id_pickup-edge'
          >
            <div className='radio__label'>
              <div className='radio__label pickupAddress'>
                <p className='pickup-locationName'>edge studio</p>
                <p>905 turnpike st,</p>
                <p>suite. f</p>
                <p>canton, ma 02021</p>
              </div>
            </div>
          </RadioLabel>
        </div>
      </div>
    </>
  );
}
const CardField = ({ onChange }) => (
  <div className='FormRow'>
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);
const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type='submit'
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const FormErrorMessage = ({ children }) => (
  <div className='ErrorMessage' role='alert'>
    <svg width='16' height='16' viewBox='0 0 17 17'>
      <path
        fill='#FFF'
        d='M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z'
      />
      <path
        fill='#6772e5'
        d='M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z'
      />
    </svg>
    {children}
  </div>
);
const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: 'darkblue',
      //   iconColor: '#c4f0ff',
      color: 'black',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: 'black',
      },
      '::placeholder': {
        color: 'gray',
      },
    },
    invalid: {
      iconColor: 'red',
      //   iconColor: '#ffc7ee',
      color: 'red',
      //   color: '#ffc7ee',
    },
  },
};
