// Coupons: data/coupons.csv, columns code;discount;valid until.
export const COUPON_CART_MAX_ITEMS = 10;

export function isValid(coupon, today = new Date()) {
  return new Date(coupon.validUntil + "T23:59:59+03:00") >= today;
}

export const COUPON_EXPIRED = "coupon.expired";
