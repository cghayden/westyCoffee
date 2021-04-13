import styled from 'styled-components'

const CartStyles = styled.div`
  font-family: monospace;
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
  transform: translateX(105%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
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
    padding-right: 2rem;
    color: green;
    align-items: center;
    p {
      margin: 0;
    }
    a {
      background: green;
      color: white;
      font-size: 1.2rem;
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
`

export default CartStyles