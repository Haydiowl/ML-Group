import { categories } from '../data/content';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { WordStagger } from '../motion/WordStagger';
import { Appear } from '../motion/Appear';
import { CATEGORY_APPEAR_DELAY, spring } from '../motion/tokens';
import { categoryPath } from '../router/paths';

/**
 * Categories — Figma `1088:2403`.
 * 1920×1868.16, VERTICAL gap 64, padding 200/80/100/80.
 * Heading block 1200 wide; grid 1400 wide (2 × 696 + 8 gap).
 */
export function Categories() {
  return (
    <section id="categories" style={{ padding: 'var(--sp-14) 0 var(--sp-11)' }}>
      <Container variant="heading">
        <SectionHeading
          heading={
            <WordStagger
              segments={[
                { text: 'Find Your ' },
                { text: 'Signature ', accent: true },
                { text: '\n' },
                { text: 'Scent.' },
              ]}
            />
          }
          headingClass="t-hero"
          headingWidth={670.59}
          sub="Explore distinctive fragrances and home scents, composed around named notes and made for skin, air and fabric."
          subClass="t-body muted-2"
        />
      </Container>

      <Container variant="grid" style={{ marginTop: 'var(--sp-9)' }}>
        <div
          className="grid-categories"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}
        >
          {categories.map((c, i) => (
            <Appear
              as="a"
              key={c.title}
              href={categoryPath(c.slug)}
              className="category-card"
              transition={spring(1)}
              delay={CATEGORY_APPEAR_DELAY[i]}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: 'var(--c-surface)' }}
            >
              <div style={{ width: '100%', height: 578.69 }}>
                <img
                  className="cat-img"
                  src={c.image}
                  alt={c.title}
                  width={696}
                  height={579}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 20 }}>
                <span className="t-card-title" style={{ color: 'var(--c-ink)' }}>
                  {c.title}
                </span>
                <span className="t-meta muted">{c.quantity}</span>
              </div>
            </Appear>
          ))}
        </div>
      </Container>

    </section>
  );
}