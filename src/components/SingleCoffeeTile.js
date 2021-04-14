import React, { useState } from 'react'
import { useCart } from './CartContext'
import styled from 'styled-components'
import CoffeeCard from './CoffeeCard'

function SingleCoffeeTile({ coffee }) {
  const [showOrderForm, toggleOrderForm] = useState(false)
  return (
    <div>
      <CoffeeCard coffee={coffee} showOrderForm={showOrderForm} />
      {coffee.stock > 0 ? (
        <button
          onClick={() => toggleOrderForm((showOrderForm) => !showOrderForm)}
        >
          Order Now!
        </button>
      ) : (
        <p>Out of Stock</p>
      )}
    </div>
  )
}

export default SingleCoffeeTile
