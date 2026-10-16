import { categories, footerCategories, footerPages, socials } from '../data/content';
import { Container } from '../components/Container';
import { Link } from '../router/Router';
import { categoryPath } from '../router/paths';
import { Pill } from '../components/Pill';

/**
 * Footer link column. `routes` optionally maps a label to a real destination
 * so category links reach their pages while every other list keeps its
 * existing placeholder behaviour.
 */
function LinkList({
  title,
  items,
  routes,
}: {
  title: string;
  items: string[];
  routes?: Record<string, string>;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <span className="t-card-title muted">{title}</span>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((i) => (
          <li key={i} style={{ height: 36.8, display: 'flex', alignItems: 'center' }}>
            <Link to={routes?.[i] ?? '/'} className="t-body">
              {i}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Footer — Figma `1088:3239`.
 * 1512×341.39, #FFFFFF, padding 50/80/100/80.
 * Content 1400 wide: Left 1058 + gap + Right 342.
 */
export function Footer() {
  return (
    <footer style={{ background: 'var(--c-surface)', padding: '50px 0 100px' }}>
      <Container variant="chrome">
        <div className="footer-cols" style={{ display: 'flex', gap: 0 }}>
          {/* Left */}
          <div className="footer-left" style={{ width: 1058, display: 'flex', flexDirection: 'column', gap: 23 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="/assets/logo-mlgroup.svg" alt="ML Group" width={40} height={40} />
                <span className="t-logo" style={{ color: 'var(--c-ink)' }}>
                  ML Group
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span className="t-tagline muted" style={{ width: 250 }}>
                  Fragrances, diffusers and candles
                  <br />
                  composed to suit skin and home
                </span>
                <div>
                  <Pill variant="buttonDark" as="a" href="#" className="t-body">
                    About Us
                  </Pill>
                </div>
              </div>
            </div>

            <span className="t-legal muted">©2026 ML Group. All rights reserved.</span>
          </div>

          {/* Right */}
          <div className="footer-right" style={{ width: 342, display: 'flex', gap: 48 }}>
            <LinkList title="Pages" items={footerPages} />
            <LinkList
              title="Categories"
              items={footerCategories}
              routes={Object.fromEntries(
                categories.map((c) => [c.title, categoryPath(c.slug)]),
              )}
            />
            <LinkList title="Socials" items={socials} />
          </div>
        </div>
      </Container>
    </footer>
  );
}