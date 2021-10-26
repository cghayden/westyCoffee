// gatsby will use this component as a wrapper for every page
import React from 'react';
import { CartStateProvider } from './src/components/CartContext';
// import Layout from './src/components/Layout';

// can also import css files here
import '@fontsource/hind-siliguri'; // Defaults to weight 400.
import '@fontsource/hind-siliguri/300.css';

// export function wrapPageElement({ element, props }) {
//   return <Layout {...props}>{element}</Layout>;
// }
export function wrapRootElement({ element }) {
  return <CartStateProvider>{element}</CartStateProvider>;
}
