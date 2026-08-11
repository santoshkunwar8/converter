import "server-only";
import type { CurrencyRates } from "./types";

const RATES_URL = "https://open.er-api.com/v6/latest/USD";
// The upstream data only refreshes once every 24h; checking every 6h keeps us
// well within their documented fair-use guidance while staying reasonably fresh.
const REVALIDATE_SECONDS = 60 * 60 * 6;

interface OpenErApiResponse {
  result: "success" | "error";
  base_code: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
}

async function fetchOnce(): Promise<CurrencyRates> {
  const res = await fetch(RATES_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Exchange rate API request failed: ${res.status}`);
  }

  const data = (await res.json()) as OpenErApiResponse;
  if (data.result !== "success") {
    throw new Error("Exchange rate API returned an error result");
  }

  return {
    base: data.base_code,
    // "Tue, 11 Aug 2026 00:02:31 +0000" -> "2026-08-11"
    date: new Date(data.time_last_update_utc).toISOString().slice(0, 10),
    rates: data.rates,
  };
}

/**
 * Fetches live USD exchange rates from the free, no-API-key Open Exchange
 * Rate API (open.er-api.com, by ExchangeRate-API) — covers ~165 currencies.
 * Cached and revalidated in the background via Next's fetch cache — callers
 * don't need their own caching.
 *
 * Per the provider's free-tier terms, attribution must be shown wherever
 * rates are displayed — see the link rendered in CurrencyConverterShell.
 *
 * Retries once after a transient failure; callers should still handle a
 * thrown error for when it's genuinely down and show a degraded state
 * rather than crashing the page.
 */
export async function fetchUsdRates(): Promise<CurrencyRates> {
  try {
    return await fetchOnce();
  } catch {
    return await fetchOnce();
  }
}
