import { CartItem } from "../types";

// 2 of same item = 10% off
// 5 items in cart = 5% off
// total > 500 = 5% off

export function calculateTotal(items: CartItem[]): {
  total: string;
  discount: string;
} {
  let discounts = 0;
  let quantityDiscounts = 0;
  let totalProducts = 0;

  const totalPrice = items.reduce((state, item) => {
    totalProducts += item.quantity;

    let quantityDiscount = 0;

    const amount = item.price * item.quantity;

    // More than 2 items
    if (item.quantity > 1) {
      quantityDiscount += Math.floor(item.quantity / 2) * 0.1;
      quantityDiscounts += amount * quantityDiscount;
    }

    return (state += amount - amount * quantityDiscount);
  }, 0);

  let total = totalPrice;

  // More than 3 items
  if (totalProducts >= 5) {
    discounts += 0.05;
  }

  // More than €500
  if (total > 500) {
    discounts += 0.05;
  }

  const discountAmount = total * discounts;

  total = total - discountAmount;

  return {
    discount: Number(discountAmount + quantityDiscounts).toFixed(2),
    total: Number(total).toFixed(2),
  };
}
