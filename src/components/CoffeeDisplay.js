import React from 'react';
import styled from 'styled-components';
import SingleCoffeeTile from './SingleCoffeeTile';

const CoffeeDisplayStyles = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function CoffeeDisplay({ allCoffee }) {
  return (
    <CoffeeDisplayStyles>
      {allCoffee.map((coffee) => (
        <SingleCoffeeTile key={coffee._id} coffee={coffee} />
      ))}
    </CoffeeDisplayStyles>
  );
}

export default CoffeeDisplay;
