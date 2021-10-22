const { default: Stripe } = require('stripe');
const { nanoid } = require('nanoid');
const sanityClient = require('@sanity/client');

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
      console.log('order written to sanity', res);
    })
    .catch((err) => {
      console.error('error writing order to Sanity:', err);
      // notify neighborly of error writing to sanity orders
    });
}

const stripe = new Stripe(process.env.GATSBY_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Check if honeypot field is filled out
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'robot detected, goodbye' }),
    };
  }

  //Validation - make sure all fields are filled out and correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }
  // make sure customer actually has items in that order - do this in context func?
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `The cart is empty!`,
      }),
    };
  }
  // TODO make sure items are in stock and of sufficient stock - done in processOrder in Cart Context
  // x calculate and verify total price - INCOMING FROM CONTEXT processOrder

  //create payment with stripe & charge(confirm) here
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
  const stripeDescription = createStripeDescription(body.order, body);

  let charge;
  try {
    charge = await stripe.paymentIntents.create({
      amount: body.total,
      currency: 'USD',
      confirm: true,
      payment_method: body.paymentMethod,
      description: stripeDescription,
      receipt_email: body.email,
      shipping: {
        name: body.shippingDetails.shippingName,
        address: {
          line1: body.shippingDetails.addressLine1,
          line2: body.shippingDetails.addressLine2,
          city: body.shippingDetails.city,
          state: body.shippingDetails.state,
          postal_code: body.shippingDetails.zip,
        },
      },
    });
  } catch (err) {
    console.error('CHARGE ERR', err);
    return {
      statusCode: err.statusCode || 418,
      body: JSON.stringify({
        error: err.message,
        message:
          err.message ||
          `There was an error processing your payment.  You're card was not charged`,
      }),
    };
  }
  await writeOrderToSanity({
    name: body.name,
    email: body.email,
    phone: body.phone,
    number: charge.created,
    total: charge.amount,
    orderItems: body.order,
    customerComments: body.customerComments,
    stripe_id: charge.id,
    deliveryMethod: body.shippingDetails.deliveryMethod,
    pickupLocation: body.shippingDetails.pickupLocation,
    shippingName: body.shippingDetails.shippingName,
    shippingAddressLine1: body.shippingDetails.addressLine1,
    shippingAddressLine2: body.shippingDetails.addressLine2,
    shippingCity: body.shippingDetails.city,
    shippingState: body.shippingDetails.state,
    shippingZip: body.shippingDetails.zip,
    totalCartPounds: body.totalCartPounds,
    env: body.env,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Order Successfully charged',
      orderItems: body.order,
      customerComments: body.customerComments,
      charge,
      shippingDetails: body.shippingDetails,
    }),
  };
};
