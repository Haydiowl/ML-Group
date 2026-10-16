import { features, stats } from '../data/content';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Pill } from '../components/Pill';
import { GearIcon, SparkIcon } from '../components/Icons';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { Reveal } from '../motion/Reveal';
import { useCountUp } from '../motion/useCountUp';
import { T_H, T_H_01, T_H_04, T_H_05 } from '../motion/tokens';

function Stat({
  value,
  label,
  size,
  delay,
  transition,
}: {
  value: string;
  label: string;
  size: number;
  delay: number;
  transition: object;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.4 });
  const numRef = useCountUp(value, inView);

  return (
    <Reveal
      ref={cardRef}
      className="stat"
      transition={transition}
      delay={delay}
      style={{
        height: 126,
        background: 'var(--c-surface)',
        padding: '23px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <span className="t-stat accent" style={{ fontSize: size }}>
        <span ref={numRef}>{value}</span>
      </span>
      <span className="t-card-title muted">{label}</span>
    </Reveal>
  );
}

/**
 * About — Figma `1088:3040`.
 * 1920×1018.4, HORIZONTAL, padding 100/80/100/80.
 * Content 1400 wide: H1+P (1200) + About+Button (1400).
 */
/** Reference cascade: 0.4 / 0.5 / 0.5 / 0 with matching springs. */
const STAT_DELAYS = [0.4, 0.5, 0.5, 0];
const STAT_SPRINGS = [T_H_04, T_H_05, T_H_05, T_H];

export function About() {
  return (
    <section id="about" style={{ padding: 'var(--sp-11) 0' }}>
      <Container variant="content">
        <Reveal variant="header" transition={T_H} className="heading-reveal">
          <SectionHeading
            eyebrow="About Us"
            headingClass="t-hero"
            headingWidth={670.59}
            segments={[{ text: 'Learn More ' }, { text: 'About Us', accent: true }]}
            sub="How the collection is composed, how to wear it, and how to get the most from a room."
            subClass="t-body muted-2"
          />
        </Reveal>

        <div style={{ marginTop: 'var(--sp-9)' }}>
          {/* Team: image 696 + 8 gap + feature column 696 */}
          <div className="team" style={{ display: 'flex', gap: 8 }}>
            <Reveal
              className="team-img"
              transition={T_H_01}
              style={{ width: 696, flex: 'none' }}
            >
              <img
                src="/assets/about-teamwork.png"
                alt="Bottles, dried botanicals and home fragrance arranged on a wooden shelf"
                width={696}
                height={400}
                style={{ width: 696, height: 400, objectFit: 'cover' }}
              />
            </Reveal>

            <div style={{ width: 696, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {features.map((f) => (
                <Reveal
                  key={f.title}
                  variant="mid"
                  transition={T_H}
                  style={{
                    height: 196,
                    background: 'var(--c-surface)',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 11,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <span style={{ display: 'block', width: 27, height: 27 }}>
                      {f.icon === 'spark' ? <SparkIcon /> : <GearIcon />}
                    </span>
                    <span className="t-card-h h-card">{f.title}</span>
                  </div>
                  <span className="t-body muted">{f.body}</span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stats: 4 × 344 with 8px gaps, cascading delay */}
          <div
            className="stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 8,
              marginTop: 8,
            }}
          >
{/* Values live in the data layer; the per-stat delay and spring
                are the reference's cascade, kept here because they are
                animation timing rather than content. */}
              {stats.map((st, i) => (
                <Stat
                  key={st.label}
                  value={st.value}
                  label={st.label}
                  size={st.size}
                  delay={STAT_DELAYS[i] ?? 0}
                  transition={STAT_SPRINGS[i] ?? T_H}
                />
              ))}
          </div>

          {/* Button — centred under the block */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <Reveal variant="cta" transition={T_H} className="about-cta">
              <Pill variant="button" as="a" href="#" className="t-body">
                More About Us
              </Pill>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}