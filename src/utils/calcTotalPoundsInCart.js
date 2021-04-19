export default function calcTotalPoundsInCart(cartContents) {
  const poundCount = {};
  cartContents.forEach((cartItem) => {
    const poundsOfCartItem =
      cartItem.size === 'half pound'
        ? cartItem.quantity / 2
        : cartItem.quantity;
    const currentPounds = poundCount[cartItem.name];
    if (currentPounds) {
      poundCount[cartItem.name] += poundsOfCartItem;
    } else {
      poundCount[cartItem.name] = poundsOfCartItem;
    }
  });
  return poundCount;
}
