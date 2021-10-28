// gatsby will use this component as a wrapper for every page
import React from 'react';
import CartStateProvider from './src/components/CartContext';

// can also import css files here
require('@fontsource/hind-siliguri'); // Defaults to weight 400.
require('@fontsource/hind-siliguri/300.css');

export function wrapRootElement({ element }) {
  return <CartStateProvider>{element}</CartStateProvider>;
}
