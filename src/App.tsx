import { MotionBoundary } from './motion/MotionBoundary';
import { useSmoothScroll } from './motion/useSmoothScroll';
import { NavBar, TopBar } from './sections/Chrome';
import { Categories } from './sections/Categories';
import { PopularProducts } from './sections/PopularProducts';
import { Testimonials } from './sections/Testimonials';
import { About } from './sections/About';
import { Blogs } from './sections/Blogs';
import { JoinNewsletter } from './sections/JoinNewsletter';
import { Footer } from './sections/Footer';
import { StoreProvider } from './store/StoreProvider';
import { CartPanel } from './components/CartPanel';
import { products } from './data/content';
import { Router } from './router/Router';
import { useRouter } from './router/routerContext';
import { ProductPage } from './pages/ProductPage';
import { CategoryPage } from './pages/CategoryPage';

/**
 * Route switch.
 *
 * The chrome (top bar, nav, footer) and the cart live outside the switch so
 * they persist across routes — the cart in particular must not unmount when
 * the user navigates from a listing into a product page.
 */
function Routes() {
  const { route } = useRouter();

  switch (route.name) {
    case 'product':
      return <ProductPage slug={route.slug} />;
    case 'category':
      return <CategoryPage slug={route.slug} />;
    case 'home':
      return <Home />;
    default:
      return <NotFound path={route.path} />;
  }
}

function Home() {
  return (
    <main className="page-main">
      <Categories />
      <PopularProducts />
      <Testimonials />
      <About />
      <Blogs />
      <JoinNewsletter />
    </main>
  );
}

/** Unknown route — reuses the existing "not found" idiom from the footer. */
function NotFound({ path }: { path: string }) {
  return (
    <main className="page-main">
      <div className="container" style={{ padding: 'var(--sp-14) var(--gutter)' }}>
        <div className="notfound">
          <span className="t-meta muted">404</span>
          <h1 className="t-hero notfound-title">Page not found.</h1>
          <p className="t-body muted notfound-sub">
            Nothing lives at <code>{path}</code>.
          </p>
          <a href="/" className="pill buttonDark t-body notfound-cta">
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  useSmoothScroll();

  return (
    <>
      <StoreProvider products={products}>
        <Router>
          <MotionBoundary>
            <TopBar />
            <NavBar />
            <Routes />
            <Footer />
          </MotionBoundary>
          <CartPanel />
        </Router>
      </StoreProvider>
    </>
  );
}