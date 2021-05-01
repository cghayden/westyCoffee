import React from 'react';
import styled from 'styled-components';
import CoffeeCard from './CoffeeCard';

const CoffeeTile = styled.div`
  padding: 1rem 0.5rem 0.5rem;
  text-align: center;
  background: var(--lightGray);
  box-shadow: 1px 1px 4px 1px hsl(0deg 15% 30% / 14%);
`;

function SingleCoffeeTile({ coffee }) {
  return (
    <CoffeeTile>
      <CoffeeCard coffee={coffee} />
    </CoffeeTile>
  );
}

export default SingleCoffeeTile;
