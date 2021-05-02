import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const CoffeeTileStyles = styled.div`
  padding: 1rem 0.5rem 0.5rem;
  box-shadow: 1px 1px 4px 1px hsl(0deg 15% 30% / 14%);
  border: 10px solid var(--white);
  box-sizing: content-box;
  border-radius: 4px;
  background: ${(props) =>
    props.singleOrigin ? 'var(--singleOriginGreen)' : 'var(--blendGreen)'};
  color: ${(props) =>
    props.singleOrigin ? 'var(--singleOriginText)' : 'var(--blendText)'};
  border-radius: 4px;
  width: 300px;
  height: 300px;
  /* padding: 16px 8px 8px; */
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;

  header {
    /* color: darkgreen; */
    color: ${(props) => (props.singleOrigin ? 'darkgreen' : 'var(--white)')};
    width: 100%;
    font-size: 1.5rem;
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
  background: ${(props) =>
    props.singleOrigin ? 'var(--blendGreen)' : 'var(--singleOriginGreen)'};
  color: ${(props) =>
    props.singleOrigin ? 'var(--white)' : 'var(--singleOriginText)'};
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
function SingleCoffeeTile({ coffee }) {
  const cost = coffee.price / 100;

  return (
    <CoffeeTileStyles singleOrigin={coffee.singleOrigin}>
      <header singleOrigin={coffee.singleOrigin}>
        <Link to={`/coffee/${coffee.slug.current}`}>{coffee.name}</Link>
      </header>
      <CoffeeDetails>
        {coffee.roastLevel && <p>{coffee.roastLevel} roast</p>}
        {coffee.description && <p>{coffee.description}</p>}
        {coffee.roastDate && <p>{dayjs(coffee.roastDate).format('MMMM DD')}</p>}
        {coffee.singleOrigin && <p>Single Origin</p>}
        {/* {coffee.region && <p>{coffee.region}</p>} */}
        {/* {coffee.grade && <p>{coffee.grade}</p>} */}
      </CoffeeDetails>
      <div>
        {coffee.stock > 0 ? (
          <Link className='orderNowLink' to={`/coffee/${coffee.slug.current}`}>
            <CoffeeStatus singleOrigin={coffee.singleOrigin}>
              <p>{coffee.stock} lbs. in stock</p>
              <p>Order Now!</p>
            </CoffeeStatus>
          </Link>
        ) : (
          <p>Out of Stock</p>
        )}
        <p className='price'>$ {cost} / lb.</p>
      </div>
    </CoffeeTileStyles>
  );
}

export default SingleCoffeeTile;
