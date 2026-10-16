import { useCallback, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { matchRoute } from './paths';
import { RouterContext, runScrollReset, useRouter, type RouterValue } from './routerContext';

/**
 * Minimal client-side router.
 *
 * The project had no routing layer, and the brief asks for /products/:slug and
 * /categories/:slug without adding dependencies — so this covers exactly the
 * route shapes the site needs rather than pulling in a routing library.
 *
 * Uses the History API so URLs are real paths (shareable, refreshable). Vite's
 * dev server and `vite preview` both fall back to index.html for unknown paths
 * in a SPA build, so a hard refresh on any route resolves.
 */
export function Router({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    if (to === window.location.pathname) return;
    if (opts?.replace) window.history.replaceState({}, '', to);
    else window.history.pushState({}, '', to);
    setPathname(to);
    // A new route always starts at the top; jump rather than animate.
    runScrollReset();
  }, []);

  const value = useMemo<RouterValue>(
    () => ({ route: matchRoute(pathname), navigate }),
    [pathname, navigate],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

/**
 * Internal link. Behaves like a normal <a> (middle-click, ctrl-click and
 * "open in new tab" still work) but handles plain left clicks in-app.
 */
export function Link({ to, children, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
