import styled from 'styled-components';

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 310px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  /* display: grid;
  grid-template-rows: auto 1fr auto; */
  display: flex;
  flex-direction: column;
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 3px solid var(--black);
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    display: flex;
  }
  footer {
    border-top: solid 3px var(--black);
    text-align: right;
    margin-top: 1rem;
    /* padding-top: 2rem; */
    padding-right: 2rem;
    color: green;
    /* display: flex;
    grid-template-columns: auto auto; */
    align-items: center;
    /* font-size: 3rem; */
    /* font-weight: 900; */
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
    li ~ li {
      border-top: 1px solid black;
      padding-top: 1rem;
    }
  }
`;

export default CartStyles;
