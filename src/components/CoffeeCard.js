import React from 'react';
import styled from 'styled-components';
import formatMoney from '../utils/formatMoney';

const CardStyle = styled.div`
  width: 220px;
  height: 220px;
  background: lightgreen;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */

  header {
    width: 100%;
    /* grid-column: 1/-1; */
    font-size: 1.5rem;
  }
  p {
    font-size: 1.1rem;
    margin: 0;
    &.price {
      font-size: 1.2rem;
    }
  }
`;

function CoffeeCard({ coffee }) {
  console.log('coffee', coffee);
  const cost = coffee.price / 100;
  return (
    <CardStyle>
      <header>{coffee.name}</header>
      <p>{coffee.roastLevel} roast</p>
      <p>{coffee.description}</p>
      <p className='price'>$ {cost}</p>
    </CardStyle>
  );
}

export default CoffeeCard;
