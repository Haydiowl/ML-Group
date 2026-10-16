/** 27px "Icon+H4" glyphs from the Figma About feature blocks. */

export function SparkIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" aria-hidden focusable="false">
      <path d="M9.6 3.375h7.8v7.8h4.8v7.8h-4.8v4.05H9.6v-4.05H4.8v-7.8h4.8z" fill="var(--c-accent)" />
      <path
        d="M13.875 9.6h-2.1v3.375h-3.375v2.1h3.375v3.375h2.1v-3.375h3.375v-2.1h-3.375z"
        fill="#fff"
      />
    </svg>
  );
}

export function GearIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" aria-hidden focusable="false">
      <path
        d="M18.56 4.22h-10.1l-.9 3.6-2.6 1.5-3.5-1.1-5.05 5.05 1.1 3.5-1.5 2.6-3.6.9v10.1l3.6.9 1.5 2.6-1.1 3.5 5.05 5.05 3.5-1.1 2.6 1.5.9 3.6"
        transform="translate(2.06 0)"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.688"
      />
      <circle cx="14.8" cy="14.8" r="3.375" fill="none" stroke="var(--c-accent)" strokeWidth="1.688" />
    </svg>
  );
}

/** 14px glyph inside the product-filter pills. */
export function TagIcon({ active = false }: { active?: boolean }) {
  const c = active ? 'var(--c-accent)' : 'var(--c-ink)';
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden focusable="false">
      <g fill="none" stroke={c} strokeWidth="1.2">
        <path d="M13.3 7v-4.3a.7.7 0 0 0-.7-.7H8.3" />
        <path d="M8.3 7H4a.7.7 0 0 0-.7.7v4.3" />
        <path d="M4 12h4.3a.7.7 0 0 0 .7-.7V7" />
      </g>
    </svg>
  );
}
/* ---- Cart panel + nav controls ---------------------------------------- */

export function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden focusable="false">
      <g fill="none" stroke="var(--c-ink)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M3 3l8 8M11 3l-8 8" />
      </g>
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden focusable="false">
      <g fill="none" stroke="var(--c-ink)" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 2v8M2 6h8" />
      </g>
    </svg>
  );
}

export function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden focusable="false">
      <g fill="none" stroke="var(--c-ink)" strokeWidth="1.3" strokeLinecap="round">
        <path d="M2 6h8" />
      </g>
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden focusable="false">
      <g fill="none" stroke="var(--c-muted-2)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M2.5 4h9M5.5 4V2.8h3V4M4 4l.6 7.2h4.8L10 4" />
      </g>
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden focusable="false">
      <g fill="none" stroke="var(--c-ink)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M2.4 4.4h10.2l-.7 8.1H3.1l-.7-8.1Z" />
        <path d="M5.2 4.4V3.2a2.3 2.3 0 0 1 4.6 0v1.2" />
      </g>
    </svg>
  );
}
