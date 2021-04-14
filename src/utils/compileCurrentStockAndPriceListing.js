export default function compileCurrentStockAndPrice(availableCoffee) {
  const currentStockAndPrice = {}
  availableCoffee.forEach((coffee) => {
    currentStockAndPrice[coffee.name] = {
      stock: coffee.stock,
      price: coffee.price,
    }
  })
  return currentStockAndPrice
}
