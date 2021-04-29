import path from 'path';
const { isFuture } = require('date-fns');

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: 'SanityPost',
      interfaces: ['Node'],
      fields: {
        isPublished: {
          type: 'Boolean!',
          resolve: (source) => new Date(source.publishedAt) <= new Date(),
        },
      },
    }),
  ]);
};
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
async function createBlogPostPages({ graphql, actions }) {
  const blogTemplate = path.resolve('./src/templates/BlogPost.js');
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, isPublished: { eq: true } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];
  postEdges
    .filter((edge) => !isFuture(edge.node.publishedAt))
    .forEach((edge) => {
      const { id, slug = {} } = edge.node;
      const path = `/blog/${slug.current}/`;
      console.log(`Creating blog post page: ${path}`);
      actions.createPage({
        path,
        component: blogTemplate,
        context: { id },
      });
    });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    fetchCoffeeAndTurnIntoPages(params),
    createBlogPostPages(params),
  ]);
}
