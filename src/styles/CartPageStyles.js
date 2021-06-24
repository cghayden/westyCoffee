import styled from 'styled-components';

const CartPageStyles = styled.div`
  font-size: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  header {
    border-bottom: 3px solid var(--black);
    display: flex;
  }
  footer {
    border-top: solid 3px var(--black);
    text-align: right;
    margin-top: 1rem;
    color: green;
    align-items: center;
    .shippingLineItem {
    }
    .grandTotal {
      font-size: 20px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;

    li ~ li {
      border-top: 1px solid black;
    }
  }
`;

export default CartPageStyles;
