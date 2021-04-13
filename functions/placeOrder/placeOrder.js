const nodemailer = require('nodemailer')
const { default: Stripe } = require('stripe')
// const formatMoney = require('../../src/utils/formatMoney');
// const axios = require('axios');
// const gql = String.raw;
function formatMoney(amount = 0) {
  const options = {
    style: 'decimal',
    // currency: 'USD',
    minimumFractionDigits: 2,
  }

  // check if its a clean dollar amount
  // if (amount % 100 === 0) {
  //   options.minimumFractionDigits = 0;
  // }

  const formatter = Intl.NumberFormat('en-US', options)

  return formatter.format(amount / 100)
}
function generateOrderEmail({ order, total }) {
  return `<div
      <h2>Your Recent Order from Neighborly Coffee</h2>
      <ul>
      ${order
        .map((item) => {
          const unitPrice = formatMoney(item.unitPrice)
          const itemTotal = formatMoney(item.quantity * item.unitPrice)
          return `<li>
          <p><strong>${item.size} bag of ${item.grind} ${item.coffee}</strong></p>
            <p>${item.quantity} @ ${unitPrice} ea. = ${itemTotal}</p></li>`
        })
        .join('')}
      </ul>
      <p>Your total is <strong>${total}</strong> due at pickup</p>
      <p>Thank You for your business!</p>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>`
}

//TODO = add payment receipt in email html,

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.ETHEREAL_MAIL_USER,
    pass: process.env.ETHEREAL_MAIL_PASS,
  },
})

const stripe = new Stripe(process.env.GATSBY_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})
exports.handler = async (event, context) => {
  // wait(5000)
  const body = JSON.parse(event.body)
  console.log(body)

  // Check if honeypot field is filled out
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'robot detected, goodbye' }),
    }
  }

  //Validation
  // make sure all fields are filled out and correct
  const requiredFields = ['email', 'name', 'order']
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      }
    }
  }
  // make sure customer actually has items in that order - do this in context func?
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `The cart is empty!`,
      }),
    }
  }
  // TODO make sure items are in stock and of sufficient stock

  // x calculate and verify total price - INCOMING FROM CONTEXT processOrder

  //create payment with stripe
  // charge(confirm) here
  // OPTION - create an intent, and attach intent.client_secret to the response to the client so it can be used on the frontend when ready to finalize payment.  client secret can be kept in the shopping cart.
  const charge = await stripe.paymentIntents
    .create({
      amount: body.total,
      currency: 'USD',
      confirm: true,
      payment_method: body.paymentMethod,
    })
    .catch((err) => {
      console.error(err)
      throw new Error(err.message)
    })
  console.log('charge', charge)

  //receive confirmation from stripe

  // ? write order to sanity

  // semnd email confirmations:
  // to rich / order intake
  // to customer

  const mailRes = await transporter.sendMail({
    from: ' Neighborly Coffee <neighborly@example.com>',
    to: `${body.name} <${body.email}>, orders@neighborlycoffee.com`,
    subject: 'Your Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  }
}
