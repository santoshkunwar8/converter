import "server-only";
import type { CurrencyRates } from "./types";

const FRANKFURTER_URL = "https://api.frankfurter.dev/v1/latest?base=USD";
const REVALIDATE_SECONDS = 60 * 60; // 1 hour

interface FrankfurterResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

async function fetchOnce(): Promise<CurrencyRates> {
  const res = await fetch(FRANKFURTER_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Frankfurter API request failed: ${res.status}`);
  }

  const data = (await res.json()) as FrankfurterResponse;

  return {
    base: data.base,
    date: data.date,
    rates: data.rates,
  };
}

/**
 * Fetches live USD exchange rates from Frankfurter (free, no API key,
 * published from ECB reference rates). Cached and revalidated hourly via
 * Next's fetch cache — callers don't need their own caching.
 *
 * Retries once after a transient failure (the upstream API occasionally
 * returns a brief gateway error); callers should still handle a thrown
 * error for when it's genuinely down and show a degraded state rather than
 * crashing the page.
 */
export async function fetchUsdRates(): Promise<CurrencyRates> {
  try {
    return await fetchOnce();
  } catch {
    return await fetchOnce();
  }
}
