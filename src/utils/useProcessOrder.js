import { useState } from 'react';
import { useCart } from '../components/CartContext';
import calcOrderTotal from '../utils/calcOrderTotal';

function usePlaceOrder() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orderDeets, setOrderDeets] = useState();
  const { cartContents } = useCart();

  async function submitOrder({
    billingDetails,
    shippingDetails,
    paymentMethod,
    botBait,
  }) {
    console.log('Hook submitting order');
    console.log('paymentMethod in hooks submit:', paymentMethod);
    setLoading(true);
    setError(null);
    const gql = String.raw;

    // set prices from backend ... MOVE THIS TO BACKEND?
    //extract coffee name and price into array of sets of arrays [...[name, price]]

    const sanityQuery = await fetch(
      process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: gql`
            query {
              allCoffee {
                _id
                name
                price
                stock
              }
            }
          `,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log('error fetching current price data', err);
        setLoading(false);
        setError(err.message || err);
        return;
      });

    const coffee_price = sanityQuery.data.allCoffee.map((coffee) => [
      coffee.name,
      coffee.price,
    ]);
    //create object of coffeename:price
    const coffeePriceObj = Object.fromEntries(coffee_price);
    // set prices on the cart contents with the price obtained from sanity(db)
    const cartCopy = cartContents.map((cartItem) => {
      const price = coffeePriceObj[cartItem.name];
      const validatedUnitPrice =
        cartItem.size === 'half pound' ? price / 2 : price;
      return { ...cartItem, price, unitPrice: validatedUnitPrice };
    });

    //gather all the data
    const body = {
      order: cartCopy,
      total: calcOrderTotal(cartCopy),
      name: billingDetails.name,
      email: billingDetails.email,
      phone: billingDetails.phone,
      shippingDetails,
      mapleSyrup: botBait,
      paymentMethod: paymentMethod.id,
      totalCartPounds,
    };

    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    const orderDeets = res.json();
    console.log('orderDeets', orderDeets);

    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setOrderDeets(orderDeets);
      setLoading(false);
      setMessage('Success! Enjoy your coffee, neighbor!');
    }
  }

  return { submitOrder, loading, error, message, orderDeets };
}

export default usePlaceOrder;
