import React from 'react';
import styled from 'styled-components';

const AlertItem = styled.li`
  color: red;
  font-size: 1.1rem;
  margin: 1rem auto;
  width: 90%;
`;

function CartAlerts({ stockAlerts = [] }) {
  if (stockAlerts.length < 1) return null;
  return (
    <div>
      <ul>
        {stockAlerts.map((alert, i) => (
          <AlertItem key={i}>!! {alert}</AlertItem>
        ))}
      </ul>
    </div>
  );
}

export default CartAlerts;
