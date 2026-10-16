import { useRef } from 'react';
import { testimonialRows } from '../data/content';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Stars } from '../components/Stars';
import { Reveal } from '../motion/Reveal';
import { T_H_03 } from '../motion/tokens';

function Card({
  review,
  name,
  role,
  avatar,
  'aria-hidden': ariaHidden,
}: {
  review: string;
  name: string;
  role: string;
  avatar: string;
  'aria-hidden'?: true;
}) {
  return (
    <Reveal
      as="li"
      aria-hidden={ariaHidden}
      className="testi-card"
      transition={T_H_03}
      style={{
        position: 'relative',
        flex: 'none',
        width: 634.66,
        height: 400,
        background: 'var(--c-surface)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid var(--c-hairline)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Stars />
          <p className="t-review" style={{ color: 'var(--c-ink)', whiteSpace: 'pre-wrap' }}>
            {review}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={avatar} alt="" width={50} height={50} style={{ borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="t-card-title" style={{ color: 'var(--c-ink-strong)' }}>
              {name}
            </span>
            <span className="t-meta muted">{role}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Row({
  items,
  direction,
}: {
  items: typeof testimonialRows[number];
  direction: 'left' | 'right';
}) {
  return (
    <div
      className="testi-row"
      style={{
        position: 'relative',
        width: '100%',
        height: 400,
        borderRadius: 'var(--r-row)',
        overflow: 'hidden',
      }}
    >
      {/* Each row scrolls on its own, continuously: the cards are repeated
          once so the track is twice the viewport, which lets the CSS loop
          travel exactly one set and restart without a visible seam. The
          repeat is aria-hidden so screen readers hear each card once. */}
      <ul className={`testi-track testi-track--${direction}`}>
        {items.map((t) => (
          <Card key={t.name} {...t} />
        ))}
        {items.map((t) => (
          <Card key={`${t.name}-repeat`} {...t} aria-hidden />
        ))}
      </ul>
    </div>
  );
}

/**
 * Testimonials — Figma `1088:2745`.
 * 1920×1265.59, VERTICAL gap 64, padding 100/0/100/0.
 * Two full-bleed 400px rows (gap 8), each an overflowing track showing
 * 3 of 6 cards (635 wide, 8px gap), radius 10.
 *
 * The two rows auto-scroll in opposite directions, continuously.
 */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="testimonials" ref={sectionRef} style={{ padding: 'var(--sp-11) 0' }}>
      <Container variant="heading">
        <SectionHeading
          eyebrow="Testimonials"
          headingWidth={800}
          segments={[
            { text: 'See what our ' },
            { text: 'customers', accent: true },
            { text: ' think \n' },
            { text: 'about us', accent: true },
            { text: ' and our products' },
          ]}
          sub="Read real reviews from people who use our products every day."
          subClass="t-body muted"
        />
      </Container>

      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Row items={testimonialRows[0]} direction="left" />
        <Row items={testimonialRows[1]} direction="right" />
      </div>
    </section>
  );
}