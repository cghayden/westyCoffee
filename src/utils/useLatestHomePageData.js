import { useState, useEffect } from 'react';

const gql = String.raw;

export default function useLatestHomePageData() {
  const [featuredCoffee, setFeaturedCoffee] = useState();
  const [homePageLead, setHomePageLead] = useState();

  // Use a side effect to fetch the data from the sanity graphql endpoint
  useEffect(function () {
    console.log('FETCHING LATEST DATA');
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
              _id
              name
              roastLevel
              blend
              description
              region
              grade
              process
              roastDate
              price
              stock
            }
            allTextBlock(where: { name: { eq: "Home Page Lead" } }) {
              name
              contentRaw
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // set the data to state
        setFeaturedCoffee(res.data.allCoffee);
        setHomePageLead(res.data.allTextBlock[0]);
      })
      // checkfor errors
      .catch((err) => {
        console.log('SHOOOOOT');
        console.log(err);
      });
  }, []);
  return {
    featuredCoffee,
    homePageLead,
  };
}
