/** 18px filled star, #FA5B05.
 *  Path reproduces Figma's vector: 15.741 × 15.185 box at (1.129, 1.126). */
function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden focusable="false">
      <path
        d="M8.999 0.443L10.858 6.161L16.87 6.161L12.006 9.695L13.864 15.414L8.999 11.88L4.135 15.414L5.993 9.695L1.129 6.161L7.141 6.161Z"
        fill="var(--c-accent)"
      />
    </svg>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, height: 18, alignItems: 'center' }}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} />
      ))}
    </div>
  );
}