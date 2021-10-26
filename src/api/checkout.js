// import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
const { default: Stripe } = require('stripe');
const sanityClient = require('@sanity/client');
const { nanoid } = require('nanoid');

const Sanity = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-05-03',
  token: process.env.GATSBY_SANITY_MUTATION_API,
  useCdn: false,
});
const SanityDevelopment = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: 'dev',
  apiVersion: '2021-05-03',
  token: process.env.GATSBY_SANITY_MUTATION_API,
  useCdn: false,
});
const stripe = new Stripe(process.env.GATSBY_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

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
  shippingName,
  shippingAddressLine1,
  shippingAddressLine2,
  shippingCity,
  shippingState,
  shippingZip,
  customerComments,
  env,
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

  const orderDate = new Date().toISOString();
  const doc = {
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
    shippingName,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingCity,
    shippingState,
    shippingZip,
    customerComments,
    shipped: false,
  };
  if (env !== 'production') {
    await SanityDevelopment.create(doc)
      .then((res) => {
        console.log('order written to sanity dev db', res);
      })
      .catch((err) => {
        console.error('error writing order to Sanity:', err);
        // notify neighborly of error writing to sanity orders
      });
    return;
  }
  await Sanity.create(doc)
    .then((res) => {
      console.log('order written to sanity:', res);
    })
    .catch((err) => {
      console.error('error writing order to Sanity:', err);
      // notify client of error writing to sanity orders
    });
}

export default async function checkout(req, res) {
  console.log('req', req.body);
  function createStripeDescription(orderItems, body) {
    const orderDesc = orderItems.map(
      (orderItem) =>
        `${orderItem.quantity} ${orderItem.size} bag of ${orderItem.name}, ${orderItem.grind}.  `
    );
    const orderString = orderDesc.join(';   ');
    const shippingString = `Delivery Method: ${body.shippingDetails.deliveryMethod},
    Pickup Location: ${body.shippingDetails.pickupLocation},
    Ship To: ${body.shippingDetails.shippingName},
    Shipping Address1: ${body.shippingDetails.addressLine1},
    Shipping Address2: ${body.shippingDetails.addressLine2},
    City: ${body.shippingDetails.city},
    State: ${body.shippingDetails.state},
    Zip: ${body.shippingDetails.zip},
    Customer Comments: ${body.customerComments}`;

    return `${orderString};
      ${shippingString}`;
  }
  const stripeDescription = createStripeDescription(req.body.order, req.body);
  let charge;
  try {
    charge = await stripe.paymentIntents.create({
      amount: req.body.total,
      currency: 'USD',
      confirm: true,
      payment_method: req.body.paymentMethod,
      description: stripeDescription,
      receipt_email: req.body.email,
      shipping: {
        name: req.body.shippingDetails.shippingName,
        address: {
          line1: req.body.shippingDetails.addressLine1,
          line2: req.body.shippingDetails.addressLine2,
          city: req.body.shippingDetails.city,
          state: req.body.shippingDetails.state,
          postal_code: req.body.shippingDetails.zip,
        },
      },
    });
    console.log('charge', charge);
  } catch (err) {
    console.error('CHARGE ERR', err);
    return res.status(err.statusCode || 418).json({
      error: err.message,
      message:
        err.message ||
        `There was an error processing your payment.  You're card was not charged`,
    });
  }
  const sanityWrite = await writeOrderToSanity({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    number: charge.created,
    total: charge.amount,
    orderItems: req.body.order,
    customerComments: req.body.customerComments,
    stripe_id: charge.id,
    deliveryMethod: req.body.shippingDetails.deliveryMethod,
    pickupLocation: req.body.shippingDetails.pickupLocation,
    shippingName: req.body.shippingDetails.shippingName,
    shippingAddressLine1: req.body.shippingDetails.addressLine1,
    shippingAddressLine2: req.body.shippingDetails.addressLine2,
    shippingCity: req.body.shippingDetails.city,
    shippingState: req.body.shippingDetails.state,
    shippingZip: req.body.shippingDetails.zip,
    totalCartPounds: req.body.totalCartPounds,
    env: req.body.env,
  }).catch((err) => console.log('err writing sanity order', err));
  console.log('sanityWrite', sanityWrite);

  return res.status(200).json({
    message: 'Order Successfully charged',
    orderItems: req.body.order,
    customerComments: req.body.customerComments,
    charge,
    shippingDetails: req.body.shippingDetails,
  });
}
