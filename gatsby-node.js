import path from 'path';

async function fetchCoffeeAndTurnIntoPages({ graphql, actions }) {
  const coffeeTemplate = path.resolve('./src/templates/SingleCoffee.js');

  const { data } = await graphql(`
    query {
      coffees: allSanityCoffee {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.coffees.nodes.forEach((coffee) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `coffee/${coffee.slug.current}`,
      component: coffeeTemplate,
      context: {
        slug: coffee.slug.current,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([fetchCoffeeAndTurnIntoPages(params)]);
}
