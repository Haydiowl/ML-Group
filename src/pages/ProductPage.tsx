import { useState } from 'react';
import { Container } from '../components/Container';
import { Pill } from '../components/Pill';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../motion/Reveal';
import { T_H, T_H_02 } from '../motion/tokens';
import { useStore } from '../store/storeContext';
import { Link } from '../router/Router';
import { Collapse } from '../components/Collapse';
import { productPath } from '../router/paths';
import { useInternalLink } from '../router/routerContext';
import { getProductBySlug, productByIds, products, type Product } from '../data/content';

/**
 * Product description page — /products/:slug
 *
 * Composed entirely from the existing Container / SectionHeading / Pill /
 * Reveal primitives and the spacing scale, so it reads as a continuation of
 * the homepage rather than a separate design.
 */

const MAX_QTY = 99;

/** Related items: same type first, then anything else, never the product itself. */
function relatedTo(product: Product, limit = 3): Product[] {
  const sameType = products.filter((p) => p.type === product.type && p.id !== product.id);
  const rest = products.filter((p) => p.type !== product.type);
  return [...sameType, ...rest].slice(0, limit);
}

export function ProductPage({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  const { price, add, setCartOpen } = useStore();
  const [qty, setQty] = useState(1);
  const linkHandler = useInternalLink();

  if (!product) {
    return (
      <main className="page-main">
        <Container variant="heading">
          <div style={{ padding: 'var(--sp-12) 0', textAlign: 'center' }}>
            <SectionHeading
              eyebrow="Not Found"
              headingWidth={670.59}
              segments={[{ text: 'Product ' }, { text: 'not found.', accent: true }]}
              sub="The product you are looking for is no longer in the catalogue."
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

  const related = relatedTo(product);
  const inStock = product.stock.toLowerCase().includes('in stock');

  const addToCart = () => {
    if (!inStock) return;
    add(product.id, qty);
    setCartOpen(true);
  };

  const buyNow = () => {
    if (!inStock) return;
    add(product.id, qty);
    setCartOpen(true);
  };

  return (
    <main className="page-main">
      <Container variant="content">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="t-meta">
            Home
          </Link>
          <span className="t-meta muted" aria-hidden>
            /
          </span>
          <Link to={`/categories/${slugifyCategory(product.category)}`} className="t-meta">
            {product.category}
          </Link>
          <span className="t-meta muted" aria-hidden>
            /
          </span>
          <span className="t-meta muted" aria-current="page">
            {product.name}
          </span>
        </nav>

        <div className="pdp">
          {/* Gallery — pinned for the length of the section. */}
          <div className="pdp-media">
            <Reveal variant="block" transition={T_H} className="pdp-figure">
              <div className="prod-imgband" style={{ width: '100%' }}>
                <img
                  className="prod-img"
                  src={product.image}
                  alt={product.alt}
                  width={696}
                  height={578}
                  style={{ width: '100%', height: 578.69, objectFit: 'cover' }}
                />
              </div>
            </Reveal>

            {product.isNew && (
              <span style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
                <Pill variant="badge" className="t-meta">
                  New
                </Pill>
              </span>
            )}
          </div>

          {/* Details */}
          <div className="pdp-info">
            <Reveal variant="header" transition={T_H}>
              <span className="t-meta muted">{product.category}</span>
              <h1 className="t-hero pdp-title">{product.name}</h1>
              <div className="pdp-price-row">
                <span className="t-card-title pdp-price">{price(product.priceValue)}</span>
                <Pill variant={inStock ? 'tag' : 'filter'} className="t-meta">
                  {product.stock}
                </Pill>
              </div>
              <p className="t-body muted pdp-short">{product.short}</p>
            </Reveal>

            {/* Quantity + actions */}
            <Reveal variant="block" transition={T_H} className="pdp-actions">
              <div className="pdp-qty">
                <span className="t-meta muted">Quantity</span>
                <div className="cart-qty">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <span aria-hidden>&minus;</span>
                  </button>
                  <span className="t-card-title">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={qty >= MAX_QTY}
                    onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                  >
                    <span aria-hidden>+</span>
                  </button>
                </div>
              </div>

              <div className="pdp-buttons">
                <Pill
                  variant="button"
                  as="button"
                  className="t-body pdp-add"
                  onClick={addToCart}
                  aria-disabled={!inStock}
                >
                  {inStock ? 'Add to Cart' : 'Unavailable'}
                </Pill>
                <Pill
                  variant="buttonDark"
                  as="button"
                  className="t-body pdp-buy"
                  onClick={buyNow}
                  aria-disabled={!inStock}
                >
                  Buy Now
                </Pill>
              </div>
            </Reveal>

            {/* Collapsible sections — only fields this product actually has */}
            <Reveal variant="block" transition={T_H} className="pdp-collapsibles">
              <Collapse title="Product Details" defaultOpen>
              <dl className="pdp-spec-list">
                {product.subcategory && (
                  <Spec label="Type" value={product.subcategory} />
                )}
                {product.concentration && <Spec label="Concentration" value={product.concentration} />}
                {product.diffuserType && <Spec label="Format" value={product.diffuserType} />}
                {product.capacity && <Spec label="Size" value={product.capacity} />}
                {product.fragranceFamily && (
                  <Spec label="Fragrance Family" value={product.fragranceFamily} />
                )}
                {product.room && <Spec label="Suitable for" value={product.room} />}
                <Spec label="Availability" value={product.stock} />
                {product.refillable === true && <Spec label="Refillable" value="Yes" />}
                {product.refillable === false && <Spec label="Refillable" value="No" />}
              </dl>
              </Collapse>
            </Reveal>

            {/* Description */}
            <Reveal variant="block" transition={T_H} className="pdp-collapsibles">
              <Collapse title="About this scent">
                <p className="t-body muted pdp-desc">{product.description}</p>
              </Collapse>
            </Reveal>

            {/* Notes, when the product has them */}
            {(product.topNotes?.length || product.heartNotes?.length || product.baseNotes?.length) ? (
              <Reveal variant="block" transition={T_H} className="pdp-collapsibles">
                <Collapse title="Scent Notes">
                <div className="pdp-notes">
                  {product.topNotes?.length ? (
                    <NoteRow label="Top" notes={product.topNotes} />
                  ) : null}
                  {product.heartNotes?.length ? (
                    <NoteRow label="Heart" notes={product.heartNotes} />
                  ) : null}
                  {product.baseNotes?.length ? (
                    <NoteRow label="Base" notes={product.baseNotes} />
                  ) : null}
                </div>
                </Collapse>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Container variant="content" style={{ marginTop: 'var(--sp-12)' }}>
          <Reveal variant="header" transition={T_H}>
            <SectionHeading
              eyebrow="You May Also Like"
              headingWidth={670.59}
              segments={[{ text: 'Related ' }, { text: 'Products.', accent: true }]}
              sub="More from the same part of the collection."
              subClass="t-body muted"
            />
          </Reveal>

          <div className="grid-products pdp-related" style={{ marginTop: 'var(--sp-9)' }}>
            {productByIds(related.map((p) => p.id)).map((p) => (
              <Reveal
                as="a"
                key={p.id}
                href={productPath(p.slug)}
                className="product-card related-card inset-card"
                transition={T_H_02}
                aria-label={`${p.name}, ${price(p.priceValue)}`}
                onClick={linkHandler(productPath(p.slug))}
              >
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
        </Container>
      )}
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="pdp-spec">
      <dt className="t-meta muted">{label}</dt>
      <dd className="t-body">{value}</dd>
    </div>
  );
}

function NoteRow({ label, notes }: { label: string; notes: string[] }) {
  return (
    <div className="pdp-note-row">
      <span className="t-meta muted">{label}</span>
      <span className="t-body">{notes.join(', ')}</span>
    </div>
  );
}

/** "Home Diffusers" -> "home-diffusers" so the breadcrumb targets a real category route. */
function slugifyCategory(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}