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
