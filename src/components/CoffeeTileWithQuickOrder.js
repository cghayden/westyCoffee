import React, { useState } from 'react';
import styled from 'styled-components';
import CoffeeCard from './CoffeeCard';
import pine1 from '../assets/images/pine1.jpg';

const CoffeeTile = styled.div`
  padding: 0.5rem;
  text-align: center;
  background: var(--lightGray);
  box-shadow: 1px 1px 4px 1px hsl(0deg 15% 30% / 14%);
`;
const CoffeeStatus = styled.div`
  height: 40px;
  display: grid;
  place-items: center;
  p {
    margin: 0;
  }
  button {
    padding: 6px 16px;
    width: 120px;
  }
`;

function SingleCoffeeTileWithQuickOrder({ coffee }) {
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
            className='action-secondary'
            onClick={() => toggleOrderForm((showOrderForm) => !showOrderForm)}
          >
            {showOrderForm ? 'Details...' : 'Order Now!'}
          </button>
        ) : (
          <p>Out of Stock</p>
        )}
      </CoffeeStatus>
    </CoffeeTile>
  );
}

export default SingleCoffeeTileWithQuickOrder;
