import { useState, useEffect } from 'react';

const gql = String.raw;

export default function useAllAvailableCoffee() {
  const [allStockAndPrice, setAllStockAndPrice] = useState({});

  function compileCurrentStockAndPrice(availableCoffee) {
    const currentStockAndPrice = {};
    availableCoffee.forEach((coffee) => {
      currentStockAndPrice[coffee.name] = {
        stock: coffee.stock,
        price: coffee.price,
      };
    });
    setAllStockAndPrice(currentStockAndPrice);
  }

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
        // shape the data and set to state
        compileCurrentStockAndPrice(res.data.allCoffee);
      })
      // checkfor errors
      .catch((err) => {
        console.log('SHOOOOOT');
        console.log(err);
      });
  }, []);
  return {
    allStockAndPrice,
  };
}
