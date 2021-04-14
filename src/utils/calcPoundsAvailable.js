export default function calcPoundsInStock(currentStock) {
  const poundCount = {}
  currentStock.forEach((stockItem) => {
    poundCount[stockItem.name] = stockItem.stock
  })
  return poundCount
}
