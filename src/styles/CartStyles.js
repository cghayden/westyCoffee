import styled from 'styled-components';

const CartStyles = styled.div`
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 1rem;
  padding: 20px;
  position: relative;
  background: white;
  color: var(--black);
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 94%;
  max-width: 650px;
  min-width: 310px;
  bottom: 0;
  transform: translateX(105%);
  transition: all 0.5s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: flex;
  flex-direction: column;
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 2px solid black;
    margin-bottom: 0.75rem;
    padding-bottom: 1rem;
    display: flex;
    color: inherit;
    h3 {
      color: black;
    }
  }
  footer {
    border-top: solid 2px var(--black);
    text-align: right;
    margin-top: 0.75rem;
    padding-right: 0;
    color: green;
    align-items: center;
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
  aside {
    font-size: 14px;
    padding-top: 2rem;
    width: 60%;
    margin: 0 auto;
  }
`;

export default CartStyles;
