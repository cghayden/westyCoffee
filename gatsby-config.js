require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'Westy Coffee',
    siteUrl: 'https://westycoffeemain.gatsbyjs.io',
    description: `Local coffee small batch roaster`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: 'production',
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        // overlayDrafts: true,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // 'gatsby-plugin-gatsby-cloud',
  ],
};
