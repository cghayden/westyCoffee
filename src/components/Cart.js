import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CartStyles from '../styles/CartStyles';
import { useCart } from './CartContext';
import { Link } from 'gatsby';
import useAllAvailableCoffee from '../utils/useAllAvailableCoffee';
import checkStock from '../utils/checkStock';
import CartAlerts from './CartAlerts';
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
  const [stockAlerts, setStockAlerts] = useState([]);
  const { cartOpen, closeCart, cartContents, orderTotal, totalCartPounds } =
    useCart();

  const { allStockAndPrice } = useAllAvailableCoffee();

  useEffect(() => {
    setStockAlerts(checkStock(allStockAndPrice, totalCartPounds));
  }, [allStockAndPrice, totalCartPounds]);

  return (
    <CartStyles open={cartOpen}>
      <header>
        <h3>Your Cart</h3>
        <CloseButton
          title='Close Cart'
          aria-label='Close Your Shopping Cart'
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
      <CartAlerts stockAlerts={stockAlerts} />
      {!!cartContents.length && !stockAlerts.length && (
        //StockAlert Component OR keep shopping/checkout
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
