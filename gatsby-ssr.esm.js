import React from 'react';
// import Layout from './src/components/Layout';
import { CartStateProvider } from './src/components/CartContext';
import '@fontsource/hind-siliguri'; // Defaults to weight 400.
import '@fontsource/hind-siliguri/300.css';

// export function wrapPageElement({ element, props }) {
//   return <Layout {...props}>{element}</Layout>;
// }
export function wrapRootElement({ element }) {
  return <CartStateProvider>{element}</CartStateProvider>;
}
