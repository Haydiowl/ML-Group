import type { ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';
import { T_TEXT } from '../motion/tokens';

/**
 * Section heading block.
 *
 * Figma models this as a vertically-stacked frame: eyebrow pill → heading →
 * sub-paragraph, all horizontally centred. The heading carries accent-coloured
 * runs; Figma's REST API reports these text nodes as single-colour, but the
 * rendered frames show the splits (verified against the exported frames).
 *
 * `heading` accepts a node so the hero can be word-staggered without
 * changing the layout this component owns.
 */
export function SectionHeading({
  eyebrow,
  segments,
  heading,
  sub,
  subClass = 't-body muted',
  headingClass = 't-section',
  headingWidth,
  gap = 15,
}: {
  eyebrow?: string;
  segments?: { text: string; accent?: boolean }[];
  heading?: ReactNode;
  sub?: string;
  subClass?: string;
  headingClass?: string;
  /** Figma heading block width (e.g. 670.59 / 800 / 904.59) */
  headingWidth?: number;
  gap?: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap,
        width: '100%',
      }}
    >
      {eyebrow && (
        <span
          className="t-body"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--c-surface)',
            color: 'var(--c-muted)',
            padding: '6px 8px',
          }}
        >
          {eyebrow}
          <span aria-hidden className="hairline" />
        </span>
      )}

      <div
        className={`${headingClass} ${headingClass === 't-hero' ? 'h-hero' : 'h-section'}`}
        style={{
          maxWidth: headingWidth,
          textAlign: 'center',
          whiteSpace: 'pre-wrap',
          // Figma wraps the heading text in a frame with 0.99px top padding
          paddingTop: 0.99,
        }}
      >
        {heading ??
          segments?.map((s, i) => (
            <span key={i} className={s.accent ? 'accent' : undefined}>
              {s.text}
            </span>
          ))}
      </div>

      {sub && (
        <Reveal
          variant="text"
          transition={T_TEXT}
          amount={0.5}
          as="span"
          className={subClass}
          style={{ display: 'block', textAlign: 'center', paddingBottom: 0.8 }}
        >
          {sub}
        </Reveal>
      )}
    </div>
  );
}