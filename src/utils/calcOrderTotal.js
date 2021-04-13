export default function calcTotalPrice(cartContents) {
  return cartContents.reduce((tally, cartItem) => {
    //   if (!cartItem.) return tally; // products can be deleted, but they could still be in your cart
    return tally + cartItem.quantity * cartItem.unitPrice;
  }, 0);
}
