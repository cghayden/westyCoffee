// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { nanoid } from 'nanoid';
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
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee';
import styled from 'styled-components';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: 'darkdarkblue',
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

const CardField = ({ onChange }) => (
  <div className='FormRow'>
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);
const RadioLabel = styled.label`
  cursor: pointer;
  vertical-align: middle;
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? 'darkblue' : 'gray')};
  font-size: 1rem;
  /* color: ${(props) => (props.active ? 'darkblue' : 'var(--darkGray)')}; */
  span {
    transition: all 0.2s ease-in-out;
  }
`;
const RadioInput = styled.input`
  appearance: none;
  border-radius: 50%;
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

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
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
    deliveryMethod: '',
    pickupLocation: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [botBait, setBotBait] = useState('');
  const { orderTotal, processOrder, emptyCart, totalCartPounds } = useCart();
  const { availableCoffee } = useCurrentAvailableCoffee();

  async function writeOrderToSanity({
    name,
    email,
    phone,
    number,
    total,
    orderItems,
    stripe_id,
    deliveryMethod,
    pickupLocation,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingCity,
    shippingState,
    shippingZip,
  }) {
    const configuredOrderItems = orderItems.map((orderItem) => {
      return {
        name: orderItem.name,
        grind: orderItem.grind,
        size: orderItem.size,
        quantity: orderItem.quantity,
        _key: nanoid(),
      };
    });
    console.log('configuredOrderItems', configuredOrderItems);
    const adjustQuantityMutations = orderItems.map((orderItem) => ({
      patch: {
        id: orderItem._ref,
        dec: {
          stock: totalCartPounds[orderItem.name],
        },
      },
    }));
    const orderDate = new Date().toISOString();
    const orderMutation = [
      {
        create: {
          _type: 'order',
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          number,
          total: total,
          orderItems: configuredOrderItems,
          orderDate,
          stripe_id,
          deliveryMethod,
          pickupLocation,
          shippingAddressLine1,
          shippingAddressLine2,
          shippingCity,
          shippingState,
          shippingZip,
          // set: { slug.current: number.toString() },
        },
      },
      // returnDocuments: true,
    ];

    await fetch(`https://2u11zhhx.api.sanity.io/v1/data/mutate/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.GATSBY_SANITY_ORDERS_API}`,
      },
      body: JSON.stringify({ mutations: orderMutation }),
    })
      .then((response) => response.json())
      .then((result) => console.log('MUTATION RESPONSE', result))
      .catch((error) => console.error('MUTATION ERROR', error));

    //   await fetch(`https://yi1dikna.api.sanity.io/v1/data/mutate/production`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //     Authorization: `Bearer ${process.env.GATSBY_SANITY_ORDERS_API}`,
    //   },
    //   body: JSON.stringify({ adjustQuantityMutations }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => console.log('MUTATION RESPONSE', result))
    //   .catch((error) => console.error('MUTATION ERROR', error));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    if (error) {
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
      console.log('error creating payment method', error);
      setError(error);
      return;
    } else {
      setPaymentMethod(paymentMethod);
      const orderRes = await processOrder(
        billingDetails,
        availableCoffee,
        paymentMethod,
        botBait
      )
        .then((res) => res.json())
        .then((parsedRes) => {
          console.log('parsedRes', parsedRes);
          emptyCart();
          navigate('/order', {
            state: parsedRes,
          });
          writeOrderToSanity({
            number: parsedRes.charge.created,
            name: billingDetails.name,
            email: billingDetails.email,
            phone: billingDetails.phone,
            total: parsedRes.charge.amount,
            orderItems: parsedRes.orderItems,
            stripe_id: parsedRes.charge.id,
            deliveryMethod: shippingDetails.deliveryMethod,
            pickupLocation: shippingDetails.pickupLocation,
            shippingAddressLine1: shippingDetails.addressLine1,
            shippingAddressLine2: shippingDetails.addressLine2,
            shippingCity: shippingDetails.city,
            shippingState: shippingDetails.state,
            shippingZip: shippingDetails.zip,
          });
        })
        .catch((err) => {
          setError(err);
          console.log('error processing payment method', err);
        });
      if (!error) {
        console.log('noerror');
        reset();
      }
    }
  }

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      name: '',
      email: '',
      phone: '',
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
      <h3 className='form-heading'>Contact</h3>

      <fieldset className='FormGroup'>
        <Field
          label='Name'
          id='name'
          type='text'
          placeholder=''
          required
          autoComplete='name'
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label='Email'
          id='email'
          type='email'
          placeholder='janedoe@gmail.com'
          required
          autoComplete='email'
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label='Phone'
          id='phone'
          type='tel'
          placeholder='(941) 555-0123'
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
      <fieldset className='FormGroup display-table'>
        <div className='FormRow'>
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
                  setShippingDetails({
                    ...shippingDetails,
                    deliveryMethod: e.target.value,
                  });
                }}
              />
            </div>
            <RadioLabel
              active={shippingDetails.deliveryMethod === 'Shipping'}
              for='checkout_id_delivery-shipping'
            >
              <span class='radio__label'>
                <ShippingTruckIcon w='18' h='18' />
                Ship It
              </span>
            </RadioLabel>
          </div>
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
                  setShippingDetails({
                    ...shippingDetails,
                    deliveryMethod: e.target.value,
                  });
                }}
              />
            </div>
            <RadioLabel
              active={shippingDetails.deliveryMethod === 'Pickup'}
              for='checkout_id_delivery-pickup'
            >
              <span class='radio__label'>
                <StoreFrontIcon />
                {/* <svg aria-hidden="true" focusable="false" class="icon-svg icon-svg--size-18 icon-svg--inline-before"> <use xlink:href="#ship"></use> </svg> */}
                Pickup
              </span>
            </RadioLabel>
          </div>
        </div>
      </fieldset>

      {/* ****** Shipping or delivery details ********* */}
      <AnimatePresence exitBeforeEnter>
        {shippingDetails.deliveryMethod && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '280px' }}
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
                <h3 className='form-heading'>Shipping Address</h3>
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
                <h3 className='form-heading'>Pickup Location</h3>
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
      <h3 className='form-heading'>Payment</h3>

      <fieldset className='FormGroup'>
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay ${orderTotal}
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

export default function StripeCheckout() {
  return (
    <StripeCheckoutStyles>
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements>
    </StripeCheckoutStyles>
  );
}

function ShippingAddressInput({ shippingDetails, setShippingDetails }) {
  return (
    <>
      <Field
        label={!shippingDetails.addressLine1.length ? '' : 'Address'}
        id='addressLine1'
        type='text'
        placeholder={!shippingDetails.addressLine1.length ? 'Address' : null}
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
        placeholder={!shippingDetails.addressLine2.length ? 'Apt, etc.' : null}
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
        label={!shippingDetails.city.length ? '' : 'City'}
        id='city'
        type='city'
        placeholder={!shippingDetails.city.length ? 'City' : null}
        required={shippingDetails.deliveryMethod === 'Shipping'}
        autoComplete='address-level2'
        value={shippingDetails.city}
        onChange={(e) => {
          setShippingDetails({ ...shippingDetails, city: e.target.value });
        }}
      />
      <Field
        label={!shippingDetails.state.length ? '' : 'State'}
        id='state'
        type='state'
        placeholder={!shippingDetails.state.length ? 'State' : null}
        required={shippingDetails.deliveryMethod === 'Shipping'}
        autoComplete='address-level1'
        value={shippingDetails.state}
        onChange={(e) => {
          setShippingDetails({ ...shippingDetails, state: e.target.value });
        }}
      />
      <Field
        label={!shippingDetails.zip.length ? '' : 'Zip'}
        id='zipCode'
        type='text'
        placeholder='00000'
        placeholder={!shippingDetails.zip.length ? 'Zip Code' : null}
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
            for='checkout_id_pickup-daniels'
          >
            <div class='radio__label pickupAddress'>
              <p className='pickup-locationName'>Daniel's Home</p>
              <p>36 Lincoln Rd.</p>
              <p>Sharon, MA 02067</p>
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
            for='checkout_id_pickup-edge'
          >
            <div class='radio__label'>
              <div class='radio__label pickupAddress'>
                <p className='pickup-locationName'>Edge Studio</p>
                <p>905 Turnpike St,</p>
                <p>Suite. F</p>
                <p>Canton, MA 02021</p>
              </div>
            </div>
          </RadioLabel>
        </div>
      </div>
    </>
  );
}
const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type='submit'
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const ErrorMessage = ({ children }) => (
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
