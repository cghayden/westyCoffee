import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';
import formatMoney from '../utils/formatMoney';
import CartPageStyles from '../styles/CartPageStyles';
import useForm from '../utils/useForm';
import StripeCheckout from './StripeCheckout';
import CartAlerts from './CartAlerts';
import compileCurrentStockAndPrice from '../utils/compileCurrentStockAndPriceListing';
import checkStock from '../utils/checkStock';
import CartItem from './CartItem';

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
  const { cartContents, totalCartPounds, rawShippingCost, rawOrderTotal } =
    useCart();
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
            <CartItem cartItem={cartItem} key={`${i}-${cartItem.name}`} />
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

export default Checkout;
