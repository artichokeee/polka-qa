// Cart of the Polka shop.
export const CART_MAX_ITEMS = Number(process.env.CART_MAX_ITEMS ?? 50);

export function addItem(cart, item) {
  if (cart.items.length >= CART_MAX_ITEMS) throw new Error("cart.limit");
  cart.items.push(item);
  cart.badge = badge(cart);
  return cart;
}

export function removeItem(cart, id) {
  cart.items = cart.items.filter((i) => i.id !== id);
  return cart;
}

export function badge(cart) {
  return cart.items.reduce((n, i) => n + i.qty, 0);
}
