import React from 'react';
import Layout from './src/components/Layout';
import { CartStateProvider } from './src/components/CartContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
export function wrapRootElement({ element }) {
  return <CartStateProvider>{element}</CartStateProvider>;
}
