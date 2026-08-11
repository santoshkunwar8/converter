import { DollarSign } from "lucide-react";
import { fetchUsdRates } from "../currency-rates";
import type { CurrencyConverterDefinition } from "../types";

const currency: CurrencyConverterDefinition = {
  name: "Currency Converter",
  slug: "currency",
  description:
    "Convert between world currencies using live exchange rates, updated hourly from European Central Bank reference rates.",
  shortDescription: "Convert USD, EUR, GBP, and other currencies at live rates.",
  icon: DollarSign,
  keywords: ["currency converter", "exchange rate calculator", "usd to eur", "forex converter"],
  kind: "currency",
  isPopular: true,
  units: [
    { id: "USD", label: "US Dollar", symbol: "USD" },
    { id: "EUR", label: "Euro", symbol: "EUR" },
    { id: "GBP", label: "British Pound", symbol: "GBP" },
    { id: "JPY", label: "Japanese Yen", symbol: "JPY" },
    { id: "CNY", label: "Chinese Yuan", symbol: "CNY" },
    { id: "INR", label: "Indian Rupee", symbol: "INR" },
    { id: "AUD", label: "Australian Dollar", symbol: "AUD" },
    { id: "CAD", label: "Canadian Dollar", symbol: "CAD" },
    { id: "CHF", label: "Swiss Franc", symbol: "CHF" },
    { id: "HKD", label: "Hong Kong Dollar", symbol: "HKD" },
    { id: "SGD", label: "Singapore Dollar", symbol: "SGD" },
    { id: "SEK", label: "Swedish Krona", symbol: "SEK" },
    { id: "NOK", label: "Norwegian Krone", symbol: "NOK" },
    { id: "NZD", label: "New Zealand Dollar", symbol: "NZD" },
    { id: "MXN", label: "Mexican Peso", symbol: "MXN" },
    { id: "ZAR", label: "South African Rand", symbol: "ZAR" },
    { id: "BRL", label: "Brazilian Real", symbol: "BRL" },
    { id: "KRW", label: "South Korean Won", symbol: "KRW" },
    { id: "THB", label: "Thai Baht", symbol: "THB" },
  ],
  defaultFromUnit: "USD",
  defaultToUnit: "EUR",
  fetchRates: fetchUsdRates,
  faq: [
    {
      question: "Where do the exchange rates come from?",
      answer:
        "Rates are sourced from Frankfurter, a free API built on European Central Bank reference rates, updated on banking days. Rates on this page refresh at least once an hour.",
    },
    {
      question: "Are these rates suitable for real transactions?",
      answer:
        "These are reference (mid-market) rates for informational purposes. Banks and payment providers add their own margin, so the rate you actually get when exchanging money will differ.",
    },
    {
      question: "Why isn't my currency in the list?",
      answer:
        "This converter includes the most commonly used world currencies. The underlying data source covers a wider set of currencies tracked by the European Central Bank.",
    },
  ],
  relatedSlugs: ["length", "weight"],
};

export default currency;
