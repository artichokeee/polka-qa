#!/usr/bin/env bash
# Checks the amount of test order 1042 that goes to the payment gateway.
# Exit codes for git bisect run: 0 - the amount is right, 1 - it is wrong, 125 - nothing to check with.
cd "$(dirname "$0")" || exit 125
fixture=qa/fixtures/order-1042.csv
config=config/payment.env
if [ ! -f "$fixture" ] || [ ! -f "$config" ]; then
  echo "SKIP: $fixture or $config not found"
  exit 125
fi
unit=""
fee=0
while IFS='=' read -r key value; do
  value=${value%$'\r'}
  case "$key" in
    AMOUNT_UNIT) unit=$value ;;
    FEE_RUB) fee=$value ;;
  esac
done < "$config"
sum=0
expected=""
while IFS=';' read -r sku qty price; do
  price=${price%$'\r'}
  case "$sku" in
    total_kop) expected=$price ;;
    [0-9]*) sum=$((sum + qty * price)) ;;
  esac
done < "$fixture"
case "$unit" in
  kop) amount=$(( (sum + fee) * 100 )) ;;
  rub) amount=$(( sum + fee )) ;;
  *) echo "FAIL: unknown AMOUNT_UNIT '$unit'"; exit 1 ;;
esac
if [ "$amount" = "$expected" ]; then
  echo "OK: order 1042 sends $amount, expected $expected"
  exit 0
fi
echo "FAIL: order 1042 sends $amount, expected $expected"
exit 1
