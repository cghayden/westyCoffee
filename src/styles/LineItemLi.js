import styled from 'styled-components';

const LineItemLi = styled.li`
  width: 100%;
  position: relative;
  padding-top: 1rem;
  p {
    font-size: 16px;
  }
  .cartItem-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .trashButton {
      color: red;
    }
  }
  h2,
  h3 {
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    font-weight: bold;
    grid-column: 1/-1;
    justify-self: left;
    font-size: 20px;
  }
  .grind {
    text-align: left;
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

export default LineItemLi;
