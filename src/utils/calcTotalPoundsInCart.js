export default function calcTotalPoundsInCart(cartContents) {
  const poundCount = { sample: 2 }
  cartContents.forEach((cartItem) => {
    const poundsOfCartItem =
      cartItem.size === 'half pound' ? cartItem.quantity / 2 : cartItem.quantity
    console.log('pounds Of CartItem to add', poundsOfCartItem)
    const currentPounds = poundCount[cartItem.coffee]
    if (currentPounds) {
      poundCount[cartItem.coffee] += poundsOfCartItem
    } else {
      poundCount[cartItem.coffee] = poundsOfCartItem
    }
    console.log('poundCount', poundCount)
  })
  return poundCount
}
