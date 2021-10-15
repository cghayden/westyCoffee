import React from 'react';
import styled from 'styled-components';
import CartStyles from '../styles/CartStyles';
import { useCart } from './CartContext';
import { Link } from 'gatsby';
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee';
import checkStock from '../utils/checkStock';
import CartAlerts from './CartAlerts';
import compileCurrentStockAndPrice from '../utils/compileCurrentStockAndPriceListing';
import CartItem from './CartItem';

const ActionsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  a,
  button {
    padding: 0.25rem 0.5rem;
    font-size: 14px;
    margin: 8px;
  }
`;
const CloseButton = styled.button`
  color: black;
  font-size: 2rem;
  border: 0;
  margin-left: auto;
`;

function Cart() {
  const { cartOpen, closeCart, cartContents, orderTotal, totalCartPounds } =
    useCart();
  const { availableCoffee } = useCurrentAvailableCoffee();
  // console.log('availableCoffee', availableCoffee);
  const currentStockAndPrice = compileCurrentStockAndPrice(availableCoffee);
  const stockAlerts = checkStock(currentStockAndPrice, totalCartPounds);

  return (
    <CartStyles open={cartOpen}>
      <header>
        <h3>Your Cart</h3>
        <CloseButton
          title='Close Cart'
          aria-label='Close Your Cart Modal'
          onClick={closeCart}
        >
          &times;
        </CloseButton>
      </header>
      <ul>
        {cartContents.map((cartItem, i) => (
          <CartItem cartItem={cartItem} key={`${i}-${cartItem.name}`} />
        ))}
      </ul>
      {stockAlerts.length > 0 && <CartAlerts alerts={stockAlerts} />}
      {!!cartContents.length && !stockAlerts.length && (
        <>
          <footer>
            <h3>Total: $ {orderTotal}</h3>
            <ActionsDiv>
              <Link
                className='action-primary'
                role='link'
                onClick={closeCart}
                to='/'
              >
                keep shopping
              </Link>
              <Link
                className='action-secondary'
                role='link'
                onClick={closeCart}
                to='/pay'
              >
                checkout
              </Link>
            </ActionsDiv>
          </footer>
          <aside>free shipping for orders over $50.00</aside>
        </>
      )}
    </CartStyles>
  );
}

export default Cart;
