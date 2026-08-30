// HTTP API of the Polka shop (simplified for the course).
export const VERSION = "3.5.0";

export const routes = [
  ["GET", "/api/products"],
  ["GET", "/api/products/:id"],
  ["GET", "/api/cart"],
  ["POST", "/api/cart/items"],
  ["POST", "/api/orders"],
  ["POST", "/api/orders/:id/pay"],
];

export const RATE_LIMIT_PER_MIN = Number(process.env.RATE_LIMIT_PER_MIN ?? 120);
