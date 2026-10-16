import { useState } from 'react';
import {
  filterProducts,
  productFilters,
  type FilterKey,
  type Product,
} from '../data/content';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Pill } from '../components/Pill';
import { TagIcon } from '../components/Icons';
import { Reveal } from '../motion/Reveal';
import { useStore } from '../store/storeContext';
import { productPath } from '../router/paths';
import { useInternalLink } from '../router/routerContext';
import { T_H, T_H_02 } from '../motion/tokens';

/**
 * Popular Products — Figma `1088:2462`.
 * 1920×2362.61, VERTICAL gap 64.01, padding 100/80/100/80.
 * Heading block 1200; stack 1760 outer with a 1200 content column.
 */
export function PopularProducts() {
  const [active, setActive] = useState<FilterKey>('all');
  const visible: Product[] = filterProducts(active);
  const { price } = useStore();
  const linkHandler = useInternalLink();

  return (
    <section id="products" style={{ padding: 'var(--sp-11) 0' }}>
      <Reveal variant="header" transition={T_H} className="heading-reveal">
        <Container variant="heading">
          <SectionHeading
            eyebrow="Popular Products"
            headingWidth={670.59}
            segments={[
              { text: 'Check Out The ' },
              { text: 'Most ', accent: true },
              { text: '\n' },
              { text: 'Popular', accent: true },
              { text: ' Pieces.' },
            ]}
            sub="Eau de parfums, reed diffusers and candles built around named note structures."
            subClass="t-body muted"
          />
        </Container>
      </Reveal>

      <Container variant="stack" style={{ marginTop: 'var(--sp-9)' }}>
        <Reveal variant="block" transition={T_H} className="stack-reveal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Filter tags — group centred */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
                // minHeight, not height: at 320px the three pills wrap to a
                // second row and a fixed height would clip them.
                minHeight: 37,
                flexWrap: 'wrap',
              }}
            >
              {productFilters.map((f) => {
                const isActive = active === f.key;
                return (
                  <Pill
                    key={f.key}
                    variant={isActive ? 'filterActive' : 'filter'}
                    as="button"
                    className="t-meta"
                    aria-pressed={isActive}
                    icon={<TagIcon active={isActive} />}
                    onClick={() => setActive(f.key)}
                  >
                    {f.label}
                  </Pill>
                );
              })}
            </div>

            {/* Product grid — 1200 wide, 3 × 394.66 with 8px gaps, clipped */}
            <Container variant="products" style={{ overflow: 'hidden' }}>
              <div className="grid-products">
                {visible.map((p) => (
                  <Reveal
                    as="a"
                    key={p.id}
                    href={productPath(p.slug)}
                    className="product-card"
                    transition={T_H_02}
                    aria-label={`${p.name}, ${price(p.priceValue)}`}
                    onClick={linkHandler(productPath(p.slug))}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'var(--c-surface)',
                    }}
                  >
                    {p.isNew && (
                      <span style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
                        <Pill variant="badge" className="t-meta">
                          New
                        </Pill>
                      </span>
                    )}

                    <div className="prod-imgband" style={{ width: '100%' }}>
                      <img
                        className="prod-img"
                        src={p.image}
                        alt={p.alt}
                        width={395}
                        height={328}
                        style={{ width: '100%', height: 328.14, objectFit: 'cover' }}
                      />
                    </div>

                    {/* Name and price share one line; price right-aligned and
                        aligned to the name's baseline rather than floating in
                        the middle of the row. */}
                    <div className="product-info" style={{ padding: '14px 20px 20px', marginTop: 'auto' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: 10,
                        }}
                      >
                        <span className="t-card-title product-name">{p.name}</span>
                        <span className="t-body product-price">{price(p.priceValue)}</span>
                      </div>
                      <span className="t-meta muted product-detail">{p.detail}</span>
                    </div>

                  </Reveal>
                ))}
              </div>
            </Container>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}