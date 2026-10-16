import { useMemo, useState } from 'react';
import { Container } from '../components/Container';
import { Pill } from '../components/Pill';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../motion/Reveal';
import { T_H, T_H_02 } from '../motion/tokens';
import { useStore } from '../store/storeContext';
import { Link } from '../router/Router';
import { productPath } from '../router/paths';
import { useInternalLink } from '../router/routerContext';
import { getCategoryBySlug, productsInCategory, type Product } from '../data/content';

/**
 * Category listing page — /categories/:slug
 *
 * Reuses the homepage product grid, card and filter-pill patterns. The product
 * list is derived from the catalogue rather than a second hard-coded array.
 */

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'name', label: 'Name A–Z' },
];

export function CategoryPage({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);
  const { price } = useStore();
  const [sort, setSort] = useState<SortKey>('featured');
  const linkHandler = useInternalLink();

  // Derived from the single catalogue — no duplicated product array.
  const items = useMemo<Product[]>(() => {
    if (!category) return [];
    const list = productsInCategory(category.title);
    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
        // Featured and best-selling first, then catalogue order.
        sorted.sort(
          (a, b) => Number(!!b.featured) - Number(!!a.featured) ||
            Number(!!b.bestseller) - Number(!!a.bestseller),
        );
        break;
    }
    return sorted;
  }, [category, sort]);

  if (!category) {
    return (
      <main className="page-main">
        <Container variant="heading">
          <div style={{ padding: 'var(--sp-12) 0', textAlign: 'center' }}>
            <SectionHeading
              eyebrow="Not Found"
              headingWidth={670.59}
              segments={[{ text: 'Category ' }, { text: 'not found.', accent: true }]}
              sub="That category is not part of the collection."
              subClass="t-body muted"
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--sp-8)' }}>
              <Pill variant="buttonDark" as="a" href="/" className="t-body">
                Back to Home
              </Pill>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="page-main">
      <Container variant="content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="t-meta">
            Home
          </Link>
          <span className="t-meta muted" aria-hidden>
            /
          </span>
          <span className="t-meta muted" aria-current="page">
            {category.title}
          </span>
        </nav>

        <Reveal variant="header" transition={T_H} className="cat-hero">
          <div className="cat-hero-copy">
            <SectionHeading
              eyebrow={`${items.length} ${items.length === 1 ? 'product' : 'products'}`}
              headingWidth={800}
              segments={[{ text: category.title }]}
              sub={category.description}
              subClass="t-body muted"
            />
          </div>
          <div className="cat-hero-media">
            <img
              src={category.image}
              alt={category.title}
              width={696}
              height={579}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Reveal>

        {/* Sorting — reuses the existing filter-pill treatment */}
        <div className="cat-toolbar">
          <span className="t-meta muted">Sort by</span>
          <div className="cat-sorts">
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                className="t-meta cat-sort"
                aria-pressed={sort === s.key}
                onClick={() => setSort(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <p className="t-body muted cat-empty">
            There are no products in this category yet.
          </p>
        ) : (
          <div className="grid-products">
            {items.map((p, i) => (
              <Reveal
                as="a"
                key={p.id}
                href={productPath(p.slug)}
                transition={T_H_02}
                delay={Math.min(i, 5) * 0.05}
                className="product-card inset-card"
                aria-label={`${p.name}, ${price(p.priceValue)}`}
                onClick={linkHandler(productPath(p.slug))}
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

                  <div className="product-info">
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
        )}
      </Container>
    </main>
  );
}