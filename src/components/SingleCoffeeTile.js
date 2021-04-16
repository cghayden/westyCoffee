import React, { useState } from 'react';
import { useCart } from './CartContext';
import styled from 'styled-components';
import CoffeeCard from './CoffeeCard';

const CoffeeTile = styled.div`
  padding: 1rem;
  background: var(--white);
`;
const CoffeeStatus = styled.div`
  height: 40px;
  display: grid;
  place-items: center;
  p {
    margin: 0;
  }
`;

function SingleCoffeeTile({ coffee }) {
  const [showOrderForm, toggleOrderForm] = useState(false);
  return (
    <CoffeeTile>
      <CoffeeCard
        coffee={coffee}
        showOrderForm={showOrderForm}
        toggleOrderForm={toggleOrderForm}
      />
      <CoffeeStatus>
        {coffee.stock > 0 ? (
          <button
            className='action-primary'
            onClick={() => toggleOrderForm((showOrderForm) => !showOrderForm)}
          >
            Order Now!
          </button>
        ) : (
          <p>Out of Stock</p>
        )}
      </CoffeeStatus>
    </CoffeeTile>
  );
}

export default SingleCoffeeTile;
