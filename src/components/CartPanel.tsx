import { useEffect, useRef } from 'react';
import { useStore } from '../store/storeContext';
import { Pill } from './Pill';
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

/**
 * Slide-in cart panel.
 *
 * This is new commerce UI rather than part of the original marketing page, so
 * it is built entirely from the existing design tokens, Pill variants and type
 * classes rather than introducing a new visual language.
 */
export function CartPanel() {
  const { items, count, subtotal, price, setQty, remove, clear, cartOpen, setCartOpen } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes, and focus moves into the panel while it is open.
  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="cart-overlay" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button className="cart-scrim" aria-label="Close cart" onClick={() => setCartOpen(false)} />

      <aside className="cart-panel">
        <header className="cart-head">
          <span className="t-card-title">Your Cart</span>
          <button
            ref={closeRef}
            type="button"
            className="cart-close"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          >
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <p className="cart-empty t-body muted">
            Your cart is empty. Add a fragrance or home scent to get started.
          </p>
        ) : (
          <>
            <ul className="cart-lines">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="cart-line">
                  <img src={product.image} alt={product.alt} width={56} height={56} className="cart-thumb" />
                  <div className="cart-line-body">
                    <span className="t-card-title cart-line-name">{product.name}</span>
                    <span className="t-meta muted">{product.detail}</span>
                    <div className="cart-qty">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => setQty(product.id, qty - 1)}
                      >
                        <MinusIcon />
                      </button>
                      <span className="t-meta">{qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => setQty(product.id, qty + 1)}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                  <div className="cart-line-right">
                    <span className="t-body">{price(product.priceValue * qty)}</span>
                    <button
                      type="button"
                      className="cart-remove"
                      aria-label={`Remove ${product.name} from cart`}
                      onClick={() => remove(product.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-foot">
              <div className="cart-subtotal">
                <span className="t-body muted">Subtotal</span>
                <span className="t-card-title">{price(subtotal)}</span>
              </div>
              <p className="t-meta muted cart-note">
                Shipping and taxes are calculated at checkout.
              </p>
              <Pill variant="buttonDark" as="button" className="t-body cart-checkout">
                Checkout
              </Pill>
              <button type="button" className="cart-clear t-meta" onClick={clear}>
                Clear cart
              </button>
            </footer>
          </>
        )}

        {count > 0 && <span className="sr-only" aria-live="polite">{count} items in cart</span>}
      </aside>
    </div>
  );
}