import React from 'react'
import styled from 'styled-components'

const AlertItem = styled.li`
  color: red;
  font-size: 1.1rem;
  margin: 1rem auto;
  width: 90%;
`

function CartAlerts({ alerts }) {
  return (
    <div>
      <ul>
        {alerts.map((alert, i) => (
          <AlertItem key={i}>!! {alert}</AlertItem>
        ))}
      </ul>
    </div>
  )
}

export default CartAlerts
