import React, { useState } from 'react';
import { useCart } from './CartContext';
import styled from 'styled-components';
import CoffeeCard from './CoffeeCard';

function SingleCoffeeTile({ coffee }) {
  const [showOrderForm, toggleOrderForm] = useState(false);
  return (
    <div>
      <CoffeeCard coffee={coffee} showOrderForm={showOrderForm} />
      <button
        onClick={() => toggleOrderForm((showOrderForm) => !showOrderForm)}
      >
        Order Now!
      </button>
    </div>
  );
}

export default SingleCoffeeTile;
