import { posts } from '../data/content';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Pill } from '../components/Pill';
import { Reveal } from '../motion/Reveal';
import { T_H } from '../motion/tokens';

/**
 * Blogs — Figma `1088:3154`.
 * 1920×845.98, padding 100/80/100/80. Content 1400 wide.
 * Heading block 1400 (gap 9); Blog Cards 3 × 458.667 with 12px gaps.
 */
export function Blogs() {
  return (
    <section id="blogs" style={{ padding: 'var(--sp-11) 0' }}>
      <Container variant="content">
        <Reveal variant="header" transition={T_H} className="heading-reveal">
          <SectionHeading
            eyebrow="Scent Guides"
            headingWidth={904.59}
            gap={9}
            segments={[{ text: 'Check out our ' }, { text: 'blogs', accent: true }]}
            sub="Practical notes on choosing, layering and caring for fragrance."
            subClass="t-body muted"
          />
        </Reveal>

        <div style={{ marginTop: 'var(--sp-7)' }}>
          <div
            className="grid-blogs"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}
          >
              {posts.map((p) => (
                <Reveal
                  as="a"
                  key={p.title}
                  href="#"
                  className="blog-card"
                  transition={T_H}
                  style={{ display: 'block', background: 'var(--c-surface)' }}
                >
                  <div style={{ width: '100%', height: 300 }}>
                    <img
                      className="blog-img"
                      src={p.image}
                      alt={p.title}
                      width={459}
                      height={300}
                      style={{ width: '100%', height: 300, objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 2.9 }}>
                    <span className="t-card-title blog-card-title" style={{ color: 'var(--c-ink)' }}>
                      {p.title}
                    </span>
                    <span className="t-body muted">{p.body}</span>
                  </div>
                </Reveal>
              ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <Reveal variant="cta" transition={T_H} className="blogs-cta">
              <Pill variant="button" as="a" href="#" className="t-body">
                More Blog Posts
              </Pill>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}