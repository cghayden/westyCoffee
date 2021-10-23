import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const settings = {
  siteMetadata: {
    title: 'Westeros Coffee',
    siteUrl: 'https://wcoffee.netlify.app',
    description: `Example Coffee eCommerce Site`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.NODE_ENV === 'development' ? 'dev' : 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};

export default settings;
