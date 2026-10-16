import { useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import type { Product } from '../data/content';
import { formatPrice, getCurrency } from '../data/currency';
import { MAX_QTY, StoreContext, type CartLine, type CartState, type StoreValue } from './storeContext';

/**
 * Storefront state: selected currency and the shopping cart.
 *
 * Both live in one context so a price on a product card, in the cart panel and
 * in the cart subtotal can never disagree about which currency is active.
 *
 * Persistence is localStorage, matching this project's existing local-data-only
 * architecture (there is no backend). Keys are versioned so a future schema
 * change can invalidate old carts instead of crashing on them.
 */

const CART_KEY = 'mlgroup.cart.v1';
const CURRENCY_KEY = 'mlgroup.currency.v1';

type Action =
  | { type: 'add'; id: string; qty?: number }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.id === action.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
          ),
        };
      }
      return { lines: [...state.lines, { id: action.id, qty: Math.min(MAX_QTY, qty) }] };
    }
    case 'setQty': {
      // Dropping to zero removes the line rather than leaving a free item.
      if (action.qty <= 0) return { lines: state.lines.filter((l) => l.id !== action.id) };
      return {
        lines: state.lines.map((l) =>
          l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l,
        ),
      };
    }
    case 'remove':
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case 'clear':
      return { lines: [] };
    default:
      return state;
  }
}

function readStoredCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    // Drop anything that is not a well-formed line.
    return parsed.filter(
      (l): l is CartLine =>
        !!l &&
        typeof (l as CartLine).id === 'string' &&
        typeof (l as CartLine).qty === 'number' &&
        (l as CartLine).qty > 0,
    );
  } catch {
    return [];
  }
}

function readStoredCurrency(): string {
  try {
    // getCurrency falls back to the base if a stored code is no longer offered.
    return getCurrency(localStorage.getItem(CURRENCY_KEY) || '').code;
  } catch {
    return getCurrency('').code;
  }
}

export function StoreProvider({
  children,
  products,
}: {
  children: ReactNode;
  products: Product[];
}) {
  // Read persisted state as a lazy initialiser rather than hydrating in an
  // effect: this is a client-only SPA with no server render to disagree with,
  // and it avoids a first paint showing the wrong currency.
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    lines: readStoredCart(),
  }));
  const [currency, setCurrencyState] = useState<string>(readStoredCurrency);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage unavailable (private mode): the cart simply won't persist */
    }
  }, [state.lines]);

  const setCurrency = useCallback((code: string) => {
    const next = getCurrency(code).code;
    setCurrencyState(next);
    try {
      localStorage.setItem(CURRENCY_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  const items = useMemo(
    () =>
      state.lines
        .map((l) => {
          const product = byId.get(l.id);
          return product ? { product, qty: l.qty } : null;
        })
        .filter((x): x is { product: Product; qty: number } => x !== null),
    [state.lines, byId],
  );

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.product.priceValue * i.qty, 0),
    [items],
  );

  const price = useCallback((baseAmount: number) => formatPrice(baseAmount, currency), [currency]);

  const value = useMemo<StoreValue>(
    () => ({
      currency,
      setCurrency,
      price,
      lines: state.lines,
      items,
      count,
      subtotal,
      add: (id, qty) => dispatch({ type: 'add', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
      cartOpen,
      setCartOpen,
    }),
    [currency, setCurrency, price, state.lines, items, count, subtotal, cartOpen],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}