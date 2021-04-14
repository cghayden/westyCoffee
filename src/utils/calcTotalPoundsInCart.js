export default function calcTotalPoundsInCart(cartContents) {
  const poundCount = {}
  cartContents.forEach((cartItem) => {
    const poundsOfCartItem =
      cartItem.size === 'half pound' ? cartItem.quantity / 2 : cartItem.quantity
    const currentPounds = poundCount[cartItem.coffee]
    if (currentPounds) {
      poundCount[cartItem.coffee] += poundsOfCartItem
    } else {
      poundCount[cartItem.coffee] = poundsOfCartItem
    }
  })
  return poundCount
}
