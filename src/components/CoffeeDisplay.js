import React from 'react';
import styled from 'styled-components';
import SingleCoffeeTile from './SingleCoffeeTile';

const CoffeeDisplayStyles = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 275px);
  place-content: center;
  place-items: center;
`;

function CoffeeDisplay({ allCoffee }) {
  return (
    <CoffeeDisplayStyles>
      {allCoffee.map((coffee) => (
        <SingleCoffeeTile key={coffee.id} coffee={coffee} />
      ))}
    </CoffeeDisplayStyles>
  );
}

export default CoffeeDisplay;
