import { useState, useEffect } from 'react';

const gql = String.raw;

export default function useCurrentAvailableCoffee() {
  const [availableCoffee, setAvailableCoffee] = useState([]);

  useEffect(function () {
    // console.log('FETCHING CURRENT COFFEE AVAILABILITY ')
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
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
    })
      .then((res) => res.json())
      .then((res) => {
        // set the data to state
        setAvailableCoffee(res.data.allCoffee);
      })
      // checkfor errors
      .catch((err) => {
        console.log('SHOOOOOT');
        console.log(err);
      });
  }, []);
  return {
    availableCoffee,
  };
}
