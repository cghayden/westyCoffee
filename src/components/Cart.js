import React from 'react';
import styled from 'styled-components';
import CartStyles from '../styles/CartStyles';
import { useCart } from './CartContext';
import CloseButton from './CloseButton';
import TrashIcon from './Icons/TrashIcon';
import formatMoney from '../utils/formatMoney';
import { Link } from 'gatsby';
import useCurrentAvailableCoffee from '../utils/useCurrentAvailableCoffee';
import checkStock from '../utils/checkStock';
import CartAlerts from './CartAlerts';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';
import compileCurrentStockAndPrice from '../utils/compileCurrentStockAndPriceListing';

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

function Cart() {
  const { cartOpen, closeCart, cartContents, orderTotal, totalCartPounds } =
    useCart();

  const { availableCoffee } = useCurrentAvailableCoffee();
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

const CartItemLi = styled.li`
  width: 100%;
  position: relative;
  .cartItem-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .trashButton {
      color: red;
    }
  }
  h3 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    grid-column: 1/-1;
    justify-self: left;
    font-size: 17px;
    color: var(--raisinBlack);
  }
  p {
    font-size: 14px;
    color: var(--black);
  }

  .price {
    place-items: center;
    display: grid;
    grid-template-columns: 1fr 2ch max-content 2ch max-content;
    justify-content: end;
    justify-items: end;
    grid-gap: 0.5rem;
    margin: 0.5rem;
  }
`;
const QuantitySelector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 15ch;
  margin-left: auto;
  color: green;
  button {
    padding: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.2rem;
    padding-bottom: 4px;
  }
`;
function CartItem({ cartItem }) {
  //TODO - move the useCart call up to Cart
  const { removeFromCart, addToCart } = useCart();
  if (!cartItem) return null;
  const totalCost = formatMoney(cartItem.quantity * cartItem.unitPrice);
  return (
    <CartItemLi>
      <div className='cartItem-heading'>
        <h3>{cartItem.name}</h3>
        <QuantitySelector>
          <button
            type='button'
            title='Remove One From Cart'
            disabled={cartItem.quantity === 1}
            onClick={() => {
              addToCart({
                quantity: -1,
                name: cartItem.name,
                grind: cartItem.grind,
                unitPrice: cartItem.unitPrice,
                size: cartItem.size,
                _ref: cartItem._ref,
              });
            }}
          >
            <MinusSvg w={'18'} h={'18'} />
          </button>
          <p>{cartItem.quantity}</p>
          <button
            type='button'
            title='Add One To Cart'
            onClick={() => {
              addToCart({
                quantity: 1,
                name: cartItem.name,
                grind: cartItem.grind,
                unitPrice: cartItem.unitPrice,
                size: cartItem.size,
                _ref: cartItem._ref,
              });
            }}
          >
            <PlusSvg w={'18'} h={'18'} />
          </button>
        </QuantitySelector>
        <button
          type='button'
          className='btn-icon trashButton'
          onClick={() => {
            if (
              confirm(
                `Would you like to remove all ${cartItem.size}, ${cartItem.grind}, ${cartItem.name} form your cart?`
              )
            )
              removeFromCart(cartItem);
          }}
        >
          <TrashIcon />
        </button>
      </div>
      <p className='grind'>{cartItem.grind}</p>
      <p className='price'>
        <span>{`${cartItem.quantity} ${cartItem.size} bag`} </span>
        <span>&times; </span>
        <span>${formatMoney(cartItem.unitPrice)} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
      {/* <p>Comments: {cartItem.comments}</p> */}
    </CartItemLi>
  );
}

export default Cart;
