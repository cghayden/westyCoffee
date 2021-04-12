const nodemailer = require('nodemailer');

function generateOrderEmail() {
  return `<div>
      <h2>Your Recent Order from Neightborly Coffee</h2>
      <li>1lb. bag of medium grind Richie's Blend, 1 @ 15.00: $15.00</li>
      <li>1lb. bag of fine grind Columbian, 1 @ 14.00: $14.00</li>
      </ul>
      <p>Your total is <strong>$29.00</strong> due at pickup</p>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.ETHEREAL_MAIL_USER,
    pass: process.env.ETHEREAL_MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // wait(5000)
  const body = JSON.parse(event.body);
  console.log(body);

  // Check if honeypot field is filled out
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'robot detected, goodbye' }),
    };
  }

  //Validation
  // make sure all fields are filled out and correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }
  // make sure customer actually has items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `The cart is empty!`,
      }),
    };
  }
  //make sure items are in stock and of sufficient stock

  //calculate and verify total price

  //create payment with stripe
  //receive confirmation from stripe

  // ? write order to sanity

  // email confirmations:
  // to rich / order intake
  // to customer

  // send the email
  const mailRes = await transporter.sendMail({
    from: ' Neighborly Coffee <neighborly@example.com>',
    to: `Corey ... <cghayden@gmail>, orders@example.com`,
    // to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail(),
  });
  console.log('mailRes', mailRes);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
