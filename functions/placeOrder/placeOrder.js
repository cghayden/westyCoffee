// const nodemailer = require('nodemailer');
const { default: Stripe } = require('stripe');
// const formatMoney = require('../../src/utils/formatMoney');
const { nanoid } = require('nanoid');
const sanityClient = require('@sanity/client');
const SanityOrders = sanityClient({
  projectId: '2u11zhhx',
  dataset: 'orders',
  apiVersion: '2021-05-03', // use current UTC date - see "specifying API version"!
  token: process.env.GATSBY_SANITY_ORDERS_API, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
const SanityContent = sanityClient({
  projectId: 'yi1dikna',
  dataset: 'production',
  apiVersion: '2021-05-03', // use current UTC date - see "specifying API version"!
  token: process.env.GATSBY_SANITY_MUTATION_API, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

function formatMoney(amount = 0) {
  const options = {
    style: 'decimal',
    // currency: 'USD',
    minimumFractionDigits: 2,
  };
  // check if its a clean dollar amount
  // if (amount % 100 === 0) {
  //   options.minimumFractionDigits = 0;
  // }
  const formatter = Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}

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
  totalCartPounds,
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
  // orderItems.forEach((orderItem) => {
  //   let totalPounds = orderItem.quantity;
  //   if (orderItem.size === 'half pound') {
  //     totalPounds = totalPounds / 2;
  //   }
  //   SanityContent.patch(orderItem._ref)
  //     .dec({ stock: totalPounds })
  //     .commit()
  //     .then((updatedProduct) => {
  //       console.log('product was updated! New document:');
  //       console.log(updatedProduct);
  //     })
  //     .catch((err) => {
  //       console.error('Oh no, the update failed: ', err.message);
  //     });
  // });
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
    shippingAddressLine1,
    shippingAddressLine2,
    shippingCity,
    shippingState,
    shippingZip,
  };
  await SanityOrders.create(doc)
    .then((res) => {
      console.log(
        `Order was created in Sanity, document ID is ${res._id}, write response is ${res}`
      );
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
  // wait(5000) - simulate loading state
  const body = JSON.parse(event.body);
  // console.log(body);
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
  let charge;
  try {
    charge = await stripe.paymentIntents.create({
      amount: body.total,
      currency: 'USD',
      confirm: true,
      payment_method: body.paymentMethod,
      receipt_email: body.email,
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
  writeOrderToSanity({
    name: body.name,
    email: body.email,
    phone: body.phone,
    number: charge.created,
    total: charge.amount,
    orderItems: body.order,
    stripe_id: charge.id,
    deliveryMethod: body.shippingDetails.deliveryMethod,
    pickupLocation: body.shippingDetails.pickupLocation,
    shippingAddressLine1: body.shippingDetails.addressLine1,
    shippingAddressLine2: body.shippingDetails.addressLine2,
    shippingCity: body.shippingDetails.city,
    shippingState: body.shippingDetails.state,
    shippingZip: body.shippingDetails.zip,
    totalCartPounds: body.totalCartPounds,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Order Successfully charged',
      orderItems: body.order,
      charge,
      shippingDetails: body.shippingDetails,
    }),
  };
};

// const transporter = nodemailer.createTransport({
//   host: process.env.ETHEREAL_MAIL_HOST,
//   port: 587,
//   auth: {
//     user: process.env.ETHEREAL_MAIL_USER,
//     pass: process.env.ETHEREAL_MAIL_PASS,
//   },
// });
// const mailRes = await transporter.sendMail({
//   from: ' Neighborly Coffee <neighborly@example.com>',
//   to: `${body.name} <${body.email}>, orders@neighborlycoffee.com`,
//   subject: 'Your Order!',
//   html: generateOrderEmail({
//     order: body.order,
//     total: body.total,
//     // receiptUrl: charge.charges.data[0].receipt_url,
//   }),
// });

// function generateOrderEmail({ order, total, receiptUrl }) {
//   return `<div
//       <h2>Your Recent Order from Neighborly Coffee</h2>
//       <ul>
//       ${order
//         .map((item) => {
//           const unitPrice = formatMoney(item.unitPrice);
//           const itemTotal = formatMoney(item.quantity * item.unitPrice);
//           return `<li>
//           <p><strong>${item.size} bag of ${item.grind} ${item.name}</strong></p>
//             <p>${item.quantity} @ ${unitPrice} ea. = ${itemTotal}</p></li>`;
//         })
//         .join('')}
//       </ul>
//       <p>Your total is <strong>${formatMoney(total)}</strong> due at pickup</p>
//       <a href="${receiptUrl}" target="_blank" rel="noreferrer noopener">View this transaction Receipt</a>
//       <p>Thank You for your business!</p>
//       <style>
//           ul {
//             list-style: none;
//           }
//       </style>
//     </div>`;
// }
