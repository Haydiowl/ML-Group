import { createContext, useContext } from 'react';
import type { Product } from '../data/content';

/**
 * Shared storefront state: selected currency + shopping cart.
 *
 * The context and its hook live here rather than alongside the provider so
 * each module exports only one kind of thing (components vs. plain values),
 * which keeps fast refresh working.
 */

export type CartLine = {
  id: string;
  qty: number;
};

export type CartState = { lines: CartLine[] };

/** Per-line and total ceiling, mirroring a normal stock guard. */
export const MAX_QTY = 99;

export type StoreValue = {
  currency: string;
  setCurrency: (code: string) => void;
  /** Format a base-currency (ZAR) amount in the currently selected currency. */
  price: (baseAmount: number) => string;

  lines: CartLine[];
  /** Cart lines joined to catalogue products; stale ids are dropped. */
  items: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;

  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export const StoreContext = createContext<StoreValue | null>(null);

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}