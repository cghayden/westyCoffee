export default function checkStock(currentStockAndPrice, totalCartPounds) {
  console.log('currentStockAndPrice', currentStockAndPrice)
  const alerts = []
  const coffeeInCart = Object.keys(totalCartPounds)
  coffeeInCart.forEach((coffee) => {
    if (!currentStockAndPrice[coffee]) {
      return
    }
    if (currentStockAndPrice[coffee].stock === 0) {
      alerts.push(`${coffee} is out of stock`)
    }
    if (!currentStockAndPrice[coffee].stock) {
      alerts.push(`${coffee} is no longer available`)
    }
    if (currentStockAndPrice[coffee].stock < totalCartPounds[coffee]) {
      alerts.push(
        `There are only ${currentStockAndPrice[coffee].stock} lbs. of ${coffee} in stock`
      )
    }
  })
  return alerts
}
