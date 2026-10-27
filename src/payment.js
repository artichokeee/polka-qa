// Payment gateway client. The gateway expects the amount in AMOUNT_UNIT from config/payment.env.
import { readFileSync } from "node:fs";

export function paymentSettings(path = "config/payment.env") {
  return Object.fromEntries(readFileSync(path, "utf8").split("\n")
    .filter((line) => line && !line.startsWith("#")).map((line) => line.split("=")));
}

export function gatewayAmount(totalRub, s = paymentSettings()) {
  const unit = s.AMOUNT_UNIT === "kop" ? 100 : 1;
  return Math.round((totalRub + Number(s.FEE_RUB ?? 0)) * unit);
}

export const GATEWAY_TIMEOUT_MS = 10000;

// ROUNDING=half-up since 3.6: 0.5 kopeck goes up.

export const GATEWAY_RETRIES = 1;
