const path = require(`path`);
const { isFuture, parseISO } = require('date-fns');

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
  const singleCoffeePage = path.resolve('./src/templates/SingleCoffeePage.js');

  const { data } = await graphql(`
    query {
      coffees: allSanityCoffee(filter: { stock: { gt: 0 } }) {
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
      path: `coffee/${coffee.slug.current}`,
      component: singleCoffeePage,
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
    .filter((edge) => !isFuture(parseISO(edge.node.publishedAt)))
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

exports.createPages = async (params) => {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    fetchCoffeeAndTurnIntoPages(params),
    createBlogPostPages(params),
  ]);
};
