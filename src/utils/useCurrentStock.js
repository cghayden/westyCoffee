import { useState, useEffect } from 'react';

const gql = String.raw;

export default function useCurrentStock(_id) {
  const [stock, setStock] = useState();

  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(
    function () {
      // when the component loads, fetch the data
      fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: gql`
              query {
                Coffee(id: "${_id}") {
                  name
                  stock
                }
              }
            `,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // TODO: checl for errors
          // set the data to state
          setStock(res.data.Coffee.stock);
        })
        .catch((err) => {
          console.log('error fetching stock');
          console.log(err);
        });
    },
    [_id]
  );

  return {
    stock,
  };
}
