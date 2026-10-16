import type { ReactNode } from 'react';

type Variant = 'tag' | 'filter' | 'filterActive' | 'badge' | 'button' | 'buttonDark' | 'nav';

const VARIANTS: Record<
  Variant,
  { background?: string; color: string; border?: string; padding: string }
> = {
  // Section eyebrow: 6px 8px, h 32.8, Geist 16 / 20.8
  tag: { background: 'var(--c-surface)', color: 'var(--c-muted)', border: 'var(--c-hairline)', padding: '6px 8px' },
  // Product filter: 8px 10px, h 37, Geist 14 / 21
  filter: { border: 'var(--c-hairline)', color: 'var(--c-ink)', padding: '8px 10px' },
  filterActive: { background: 'var(--c-surface)', border: 'var(--c-accent)', color: 'var(--c-ink)', padding: '8px 10px' },
  // "New" badge: 8px 10px, h 37, Geist 14 / 21, white on orange
  badge: { background: 'var(--c-accent)', border: 'var(--c-accent)', color: '#fff', padding: '8px 10px' },
  // Primary button: 14px, h 48.8, Geist 16 / 20.8
  button: { background: 'var(--c-surface)', border: 'var(--c-hairline)', color: 'var(--c-ink)', padding: '14px' },
  buttonDark: { background: 'var(--c-dark)', border: 'var(--c-dark)', color: '#fff', padding: '14px' },
  // Nav link: 8px, h 36.8
  // Nav link: 8px, h 36.8. No border — the stroke was removed on request.
  nav: { color: 'var(--c-ink)', padding: '8px' },
};

export function Pill({
  variant = 'tag',
  children,
  icon,
  as = 'span',
  href,
  className = '',
  onClick,
  'aria-pressed': ariaPressed,
}: {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  as?: 'span' | 'a' | 'button';
  href?: string;
  className?: string;
  /** Only meaningful when as="button" — used by the product filter row. */
  onClick?: () => void;
  /** Reflects toggle state for assistive tech on filter buttons. */
  'aria-pressed'?: boolean;
}) {
  const v = VARIANTS[variant];

  const style: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: variant === 'filter' || variant === 'filterActive' || variant === 'badge' ? 5 : 0,
    background: v.background ?? 'transparent',
    color: v.color,
    padding: v.padding,
    borderRadius: 0,
    whiteSpace: 'nowrap',
  };

  const inner = (
    <>
      {icon}
      {children}
      {v.border && <span aria-hidden className="hairline" style={{ borderColor: v.border }} />}
    </>
  );

  if (as === 'a') {
    return (
      <a href={href ?? '#'} className={`pill ${className}`} style={style}>
        {inner}
      </a>
    );
  }
  if (as === 'button') {
    return (
      <button
        type="button"
        className={`pill ${className}`}
        style={style}
        onClick={onClick}
        aria-pressed={ariaPressed}
      >
        {inner}
      </button>
    );
  }
  return (
    <span className={`pill ${className}`} style={style}>
      {inner}
    </span>
  );
}