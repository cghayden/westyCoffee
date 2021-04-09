// gatsby will use this component as a wrapper for every page
import React from 'react';
import { CartStateProvider } from './src/components/CartContext';
import Layout from './src/components/Layout';
// can also import css files here

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
export function wrapRootElement({ element }) {
  return <CartStateProvider>{element}</CartStateProvider>;
}
