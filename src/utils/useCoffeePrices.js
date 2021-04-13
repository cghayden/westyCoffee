import { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';

const gql = String.raw;

export default function useCoffeePrices() {
  const [coffeePrices, setCoffeePrices] = useState();
  const { cartContents } = useCart();
  // const coffeeNames = cartContents.map((cartItem) => cartItem.coffee);
  // Use a side effect to fetch the data from the sanity graphql endpoint
  useEffect(function () {
    console.log('FETCHING COFFEE PRICES');
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            allCoffee {
              name
              price
              stock
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // set the data to state
        setCoffeePrices(res.data.allCoffee);
      })
      // checkfor errors
      .catch((err) => {
        console.log('SHOOOOOT');
        console.log(err);
      });
  }, []);
  return {
    coffeePrices,
  };
}
