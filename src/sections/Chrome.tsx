import { useEffect, useRef, useState } from 'react';
import { navLinks, promoCode, promoPrefix } from '../data/content';
import { Link } from '../router/Router';
import { useNavTargets } from './navTargets';

import { Pill } from '../components/Pill';
import { useMarquee } from '../motion/useMarquee';
import { useStore } from '../store/storeContext';
import { currencies } from '../data/currency';
import { BagIcon, CloseIcon } from '../components/Icons';

/**
 * Fixed promo bar — Figma `div.framer-12624nw-container`.
 * 1512×50, #FFFFFF, 16px vertical padding, 20.8px track.
 *
 * The track is a constant-speed marquee (−30 px/s, wraps every 324.5 px).
 */
export function TopBar() {
  const trackRef = useRef<HTMLUListElement>(null);
  useMarquee(trackRef);

  const items = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div
      className="topbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        zIndex: 40,
        background: 'var(--c-surface)',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '16px 0' }}>
        <ul ref={trackRef} className="marquee-track" style={{ gap: 49, paddingLeft: 326.14, marginLeft: -326, whiteSpace: 'nowrap' }}>
          {items.map((i) => (
            <li
              key={i}
              style={{
                // Content-sized and non-wrapping: the promo copy is
                // data-driven and must never break onto a second line.
                flex: 'none',
                whiteSpace: 'nowrap',
                height: 20.8,
                lineHeight: '20.8px',
              }}
            >
              <span className="t-body muted pre" style={{ display: 'block' }}>
                {promoPrefix}
                <span className="accent">{promoCode}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Mobile navigation panel.
 *
 * The desktop nav links are display:none below 640px, so this is the only
 * route to them on a phone. Rendered next to the bar rather than as a route
 * because this project has no router.
 */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const nav = useNavTargets();

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="mobile-menu">
      <button className="mobile-menu-scrim" aria-label="Close menu" onClick={onClose} />
      <div
        ref={panelRef}
        id="mobile-menu"
        className="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mobile-menu-head">
          <span className="t-card-title">Menu</span>
          <button type="button" className="menu-close" aria-label="Close menu" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <nav className="mobile-menu-links" aria-label="Mobile">
          {navLinks.map((l) => (
            <a key={l} href={nav.href(l)} className="t-body mobile-menu-link" onClick={nav.click(l, onClose)}>
              {l}
            </a>
          ))}
        </nav>

        <div className="mobile-menu-cta">
          <Pill variant="button" as="a" href={"#"} className="t-body">
            Join Newsletter
          </Pill>
        </div>
      </div>
    </div>
  );
}

/**
 * Fixed navigation — Figma `div.framer-1lw61l5-container`.
 * 1512×88.8, #FFFFFF @ 40%, BACKGROUND_BLUR radius 5, top 50.
 *
 * The reference does NOT hide, fade or restyle the nav on scroll — verified
 * across scrollY 0→7000 (link positions identical). Nothing is animated here.
 */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavTargets();

  // Lock body scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
    <div
      style={{
        position: 'fixed',
        top: 50,
        left: 0,
        right: 0,
        height: 88.8,
        zIndex: 40,
        background: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: 'var(--w-chrome)', paddingInline: 80, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 'var(--w-chrome)', marginInline: 'auto', width: '100%', display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="nav-logo" aria-label="ML Group — home">
            <img src="/assets/logo-mlgroup.svg" alt="ML Group" width={40} height={40} />
          </Link>

          <nav
            aria-label="Sections"
            className="nav-links"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
          >
            {navLinks.map((l) => (
              <a key={l} href={nav.href(l)} className="t-body nav-link" onClick={nav.click(l)}>
                {l}
              </a>
            ))}
          </nav>

          <div className="menu-toggle" style={{ marginLeft: 'auto', display: 'none' }}>
            <button
              type="button"
              className="menu-trigger t-body"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>

          <div className="nav-actions" style={{ marginLeft: 'auto' }}>
            <CurrencySelect />
            <CartButton />
            <div className="nav-cta">
              <Pill variant="button" as="a" href="#" className="t-body">
                Join Newsletter
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/**
 * Currency selector.
 *
 * A plain button + listbox rather than a <select> so it can use the existing
 * Pill styling. Selecting a currency re-prices the whole page, including the
 * cart, because both read from the same store context.
 */
function CurrencySelect() {
  const { currency, setCurrency } = useStore();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="currency-select" ref={wrapRef}>
      <button
        type="button"
        className="currency-trigger t-meta"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${currency}`}
        onClick={() => setOpen((v) => !v)}
      >
        {currency}
      </button>

      {open && (
        <ul className="currency-menu" role="listbox" aria-label="Select currency">
          {currencies.map((c) => (
            <li key={c.code} role="option" aria-selected={c.code === currency}>
              <button
                type="button"
                className={`currency-opt t-meta${c.code === currency ? ' is-active' : ''}`}
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
              >
                <span>{c.label}</span>
                <span className="currency-sym">{c.symbol}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Cart button with an item-count badge. */
function CartButton() {
  const { count, setCartOpen } = useStore();
  return (
    <button
      type="button"
      className="cart-trigger"
      aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
      onClick={() => setCartOpen(true)}
    >
      <BagIcon />
      {count > 0 && <span className="cart-badge">{count}</span>}
    </button>
  );
}
