#!/usr/bin/env bash
# Writes logs/live-source.log into logs/live.log one line per second, like a live service log.
# Run: bash scripts/live-log.sh   Stop: Ctrl+C.   Watch in another window: tail -f logs/live.log
cd "$(dirname "$0")/.." || exit 1
: > logs/live.log
while IFS= read -r line; do
  printf '%s\n' "$line" >> logs/live.log
  sleep 1
done < logs/live-source.log
