// gatsby will use this component as a wrapper for every page
const React = require('react');
const { CartStateProvider } = require('./src/components/CartContext');
// import Layout from './src/components/Layout';

// can also import css files here
require('@fontsource/hind-siliguri'); // Defaults to weight 400.
require('@fontsource/hind-siliguri/300.css');

// export function wrapPageElement({ element, props }) {
//   return <Layout {...props}>{element}</Layout>;
// }
export function wrapRootElement({ element }) {
  return <CartStateProvider>{element}</CartStateProvider>;
}
