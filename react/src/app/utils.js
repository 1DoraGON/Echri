export const calculateCartTotals = (cartItems) => {
  let totalAmount = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalAmount += parseInt(item.price) * item.cartQuantity;
  });
  totalQuantity = cartItems.length;

  return { totalAmount, totalQuantity };
};