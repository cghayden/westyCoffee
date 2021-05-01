import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  background: var(--lightGray);
  border-radius: 4px;
  width: 300px;
  height: 300px;
  /* padding: 16px 8px 8px; */
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;

  header {
    color: darkgreen;
    width: 100%;
    font-size: 1.4rem;
    margin-bottom: auto;
    a {
      padding: 0;
    }
  }
  p {
    &.price {
      font-size: 1.1rem;
    }
  }
  .orderNowLink {
    width: 70%;
  }
`;
const CoffeeDetails = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 4px;
`;
const CoffeeStatus = styled.div`
  background: var(--blueYonder);
  color: white;
  padding: 8px 0;
  border-radius: 5px;
  width: 100%;
  margin: 0.5rem auto;
  display: grid;
  place-items: center;
  p {
    margin: 0;
  }
`;
function CoffeeCard({ coffee }) {
  const cost = coffee.price / 100;
  return (
    <CardStyle>
      <header>
        <Link to={`/coffee/${coffee.slug.current}`}>{coffee.name}</Link>
      </header>
      <CoffeeDetails>
        {coffee.roastLevel && <p>{coffee.roastLevel} roast</p>}
        {coffee.description && <p>{coffee.description}</p>}
        {coffee.roastDate && <p>Roasted {coffee.roastDate}</p>}
        {/* {coffee.region && <p>{coffee.region}</p>} */}
        {/* {coffee.grade && <p>{coffee.grade}</p>} */}
      </CoffeeDetails>
      <div>
        {coffee.stock > 0 ? (
          <Link className='orderNowLink' to={`/coffee/${coffee.slug.current}`}>
            <CoffeeStatus>
              <p>{coffee.stock} lbs. in stock</p>
              <p>Order Now!</p>
            </CoffeeStatus>
          </Link>
        ) : (
          <p>Out of Stock</p>
        )}
        <p className='price'>$ {cost} / lb.</p>
      </div>
    </CardStyle>
  );
}

export default CoffeeCard;
