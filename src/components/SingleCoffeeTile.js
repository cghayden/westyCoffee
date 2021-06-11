import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const CoffeeTileStyles = styled.div`
  font-size: 17px;
  padding: 1rem 0.5rem 0.5rem;
  box-shadow: 1px 1px 4px 1px hsl(0deg 15% 30% / 14%);
  border: 10px solid var(--white);
  /* box-sizing: border-box; */
  border-radius: 4px;
  background: ${(props) =>
    props.singleOrigin ? 'var(--singleOriginGreen)' : 'var(--blendGreen)'};
  color: ${(props) =>
    props.singleOrigin ? 'var(--singleOriginText)' : 'var(--blendText)'};
  border-radius: 4px;
  width: 310px;
  height: 310px;
  /* padding: 16px 8px 8px; */
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;

  header {
    font-weight: 400;
    color: ${(props) => (props.singleOrigin ? 'darkgreen' : 'var(--white)')};
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: auto;
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
  padding: 0 0.5rem;
  p {
    font-size: 1em;
  }
`;
const CoffeeStatus = styled.div`
  /* background: ${(props) =>
    props.singleOrigin ? 'var(--blendGreen)' : 'var(--singleOriginGreen)'};
  color: ${(props) =>
    props.singleOrigin ? 'var(--white)' : 'var(--singleOriginText)'}; */
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
const DescriptionDiv = styled.div`
  flex-grow: 1;
  display: flex;
  place-items: center;
  justify-content: center;
  p {
    font-weight: 400;
    font-size: 1.1em;
  }
`;
function SingleCoffeeTile({ coffee }) {
  const cost = coffee.price / 100;

  return (
    <Link to={`/coffee/${coffee.slug.current}`}>
      <CoffeeTileStyles singleOrigin={coffee.singleOrigin}>
        <header>{coffee.name}</header>
        <CoffeeDetails>
          {coffee.roastLevel && <p>{coffee.roastLevel} roast</p>}
          {coffee.description && (
            <DescriptionDiv>
              <p>{coffee.description}</p>
            </DescriptionDiv>
          )}
          {coffee.roastDate && (
            <p>roasted {dayjs(coffee.roastDate).format('MMMM DD')}</p>
          )}
          {/* {coffee.singleOrigin && <p>Single Origin</p>} */}
          {/* {coffee.region && <p>{coffee.region}</p>} */}
          {/* {coffee.grade && <p>{coffee.grade}</p>} */}
        </CoffeeDetails>
        <div>
          {coffee.stock > 0 ? (
            <CoffeeStatus singleOrigin={coffee.singleOrigin}>
              <p>
                {`-  `}only {coffee.stock} lbs. left{`  -`}
              </p>
            </CoffeeStatus>
          ) : (
            <p>Out of Stock</p>
          )}
          <p className='price'>$ {cost} / lb.</p>
        </div>
      </CoffeeTileStyles>
    </Link>
  );
}

export default SingleCoffeeTile;
