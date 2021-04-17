import styled from 'styled-components';

const CartPageStyles = styled.div`
  font-family: monospace;
  /* padding: 0 20px; */
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  p {
    margin: 5px 0;
  }
  header {
    border-bottom: 3px solid var(--black);
    display: flex;
  }
  footer {
    border-top: solid 3px var(--black);
    text-align: right;
    margin-top: 1rem;
    padding-right: 2rem;
    color: green;
    align-items: center;
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
