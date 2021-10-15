import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';
import TrashIcon from './Icons/TrashIcon';
import formatMoney from '../utils/formatMoney';
import CartPageStyles from '../styles/CartPageStyles';
import useForm from '../utils/useForm';
import StripeCheckout from './StripeCheckout';
import CartAlerts from './CartAlerts';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';
import compileCurrentStockAndPrice from '../utils/compileCurrentStockAndPriceListing';
import checkStock from '../utils/checkStock';

const CartContents = styled.div`
  width: 100%;
  min-width: 310px;
  max-width: 550px;
`;

const CommentsInput = styled.div`
  width: 90%;
  max-width: 500px;
  margin: -16px auto 0;
  label {
    display: block;
    margin: 4px;
  }
  textarea {
    width: 100%;
  }
`;

const initialValues = {
  customerComments: '',
};

function Checkout({ availableCoffee }) {
  const [shippingBoolean, setShippingBoolean] = useState(false);
  const {
    cartContents,
    removeFromCart,
    addToCart,
    totalCartPounds,
    rawShippingCost,
    rawOrderTotal,
  } = useCart();
  const { inputs, handleChange } = useForm(initialValues);
  const formattedShippingCost = formatMoney(rawShippingCost);
  const currentStockAndPrice = compileCurrentStockAndPrice(availableCoffee);
  const stockAlerts = checkStock(currentStockAndPrice, totalCartPounds);
  const grandTotal = shippingBoolean
    ? formatMoney(rawOrderTotal + rawShippingCost)
    : formatMoney(rawOrderTotal);

  return (
    <CartPageStyles className='contentBox'>
      <CartContents>
        <header>
          <h2>Review Your Cart</h2>
        </header>
        <ul>
          {cartContents.map((cartItem, i) => (
            <CartItem
              cartItem={cartItem}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              key={`${i}-${cartItem.name}`}
            />
          ))}
        </ul>
        <footer>
          {shippingBoolean ? (
            <>
              <p className='shippingLineItem'>
                Shipping: {formattedShippingCost}
              </p>
              <p className='grandTotal'>Total: ${grandTotal}</p>
            </>
          ) : (
            <p className='grandTotal'>Total: ${grandTotal}</p>
          )}
        </footer>
        {stockAlerts.length > 0 && <CartAlerts alerts={stockAlerts} />}
      </CartContents>

      {!!cartContents.length && !stockAlerts.length && (
        <>
          <CommentsInput className='input-item' id='customerComments'>
            <label htmlFor='customerComments'>order notes:</label>
            <textarea
              id='customerComments'
              name='customerComments'
              rows='3'
              onChange={handleChange}
            ></textarea>
          </CommentsInput>
          <StripeCheckout
            customerComments={inputs.customerComments}
            grandTotal={grandTotal}
            shippingBoolean={shippingBoolean}
            setShippingBoolean={setShippingBoolean}
          />
        </>
      )}
    </CartPageStyles>
  );
}

const CartItemLi = styled.li`
  width: 100%;
  position: relative;
  padding-top: 1rem;
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
  }
  .grind {
    text-align: left;
    margin: 0;
  }
  .details {
    place-items: center;
    display: grid;
    grid-template-columns: max-content 2ch max-content 1ch max-content;
    justify-content: end;
    justify-items: end;
    align-items: baseline;
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
    font-size: 1.6rem;
    padding-bottom: 4px;
  }
`;
function CartItem({ cartItem, removeFromCart, addToCart }) {
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
              // eslint-disable-next-line no-restricted-globals
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
      <p className='grind'>{`${cartItem.grind}, ${cartItem.size} bag`}</p>
      <p className='details'>
        <span>{`${cartItem.quantity}`}</span>
        <span>&times; </span>
        <span>{`${formatMoney(cartItem.unitPrice)} ea.`} </span>
        <span>= </span>
        <span>${totalCost}</span>
      </p>
    </CartItemLi>
  );
}

export default Checkout;
