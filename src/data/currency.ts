/**
 * Currency support.
 *
 * The catalogue's `priceValue` is the store's base amount, denominated in ZAR
 * (South African rand), which is the default display currency. The other
 * currencies below are converted from that base.
 *
 * `ratePerBase` is how many units of a currency one ZAR buys. It is a fixed
 * table rather than a live feed so the storefront works offline and cannot
 * silently change a price between renders.
 *
 * These rates are a snapshot taken on 2026-10-16 from the free
 * exchangerate-api.com feed (1 USD = 16.5235 ZAR). They are indicative only —
 * before launch, replace this table with your commerce platform's live
 * pricing feed so customers are always charged the real converted amount.
 * Do not treat these figures as a contractual price list.
 */

export type Currency = {
  code: string;
  /** Short label used in the selector. */
  label: string;
  symbol: string;
  /** Units of this currency per 1 ZAR. */
  ratePerBase: number;
  /** Digit grouping/decimal separators. */
  locale: string;
  decimals: number;
};

/** ZAR is the base and is always rate 1. */
export const BASE_CURRENCY = 'ZAR';

export const currencies: Currency[] = [
  { code: 'ZAR', label: 'ZAR', symbol: 'R', ratePerBase: 1, locale: 'en-ZA', decimals: 2 },
  { code: 'USD', label: 'USD', symbol: '$', ratePerBase: 1 / 16.523523, locale: 'en-US', decimals: 2 },
  { code: 'GBP', label: 'GBP', symbol: '£', ratePerBase: 0.754053 / 16.523523, locale: 'en-GB', decimals: 2 },
  { code: 'EUR', label: 'EUR', symbol: '€', ratePerBase: 0.89165 / 16.523523, locale: 'de-DE', decimals: 2 },
  { code: 'AUD', label: 'AUD', symbol: 'A$', ratePerBase: 1.44602 / 16.523523, locale: 'en-AU', decimals: 2 },
];

export const RATES_UPDATED = '2026-10-16';

export function getCurrency(code: string): Currency {
  return currencies.find((c) => c.code === code) ?? currencies[0];
}

/** Convert a base-currency amount and format it for the target currency. */
export function formatPrice(baseAmount: number, code: string): string {
  const c = getCurrency(code);
  const converted = baseAmount * c.ratePerBase;
  const formatted = converted.toLocaleString(c.locale, {
    minimumFractionDigits: c.decimals,
    maximumFractionDigits: c.decimals,
  });
  return `${c.symbol}${formatted}`;
}