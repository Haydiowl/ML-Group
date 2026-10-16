import type { CSSProperties, ReactNode } from 'react';

type Variant = 'chrome' | 'content' | 'heading' | 'grid' | 'products' | 'stack';

const WIDTHS: Record<Variant, number> = {
  chrome: 1400,
  content: 1400,
  heading: 1200,
  grid: 1400,
  products: 1200,
  stack: 1760,
};

/**
 * Centred, width-capped wrapper.
 *
 * `width` is the Figma content width. `gutter` (default 80, matching the
 * section padding in Figma) is reserved on both sides, so the content is
 * `min(width, 100vw − 2 × gutter)`:
 *
 *   1920 viewport → 1400 content, 260 margins  (matches node 1088:2400)
 *   1440 viewport → 1280 content,  80 margins  (matches the live template)
 */
export function Container({
  variant = 'chrome',
  gutter = 80,
  className = '',
  children,
  style,
}: {
  variant?: Variant;
  gutter?: number;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`container ${className}`}
      style={{
        maxWidth: WIDTHS[variant] + gutter * 2,
        paddingInline: gutter,
        ...style,
      }}
    >
      <div style={{ maxWidth: WIDTHS[variant], marginInline: 'auto' }}>{children}</div>
    </div>
  );
}

/** Full-bleed wrapper (no horizontal gutters) — used by Testimonials. */
export function Bleed({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="container" style={style}>
      {children}
    </div>
  );
}