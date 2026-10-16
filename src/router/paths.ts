/** Route shapes and path helpers. Pure — no React, no components. */

export type Route =
  | { name: 'home' }
  | { name: 'product'; slug: string }
  | { name: 'category'; slug: string }
  | { name: 'not-found'; path: string };

export function matchRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') return { name: 'home' };

  const product = /^\/products\/([^/]+)$/.exec(path);
  if (product) return { name: 'product', slug: decodeURIComponent(product[1]) };

  const category = /^\/categories\/([^/]+)$/.exec(path);
  if (category) return { name: 'category', slug: decodeURIComponent(category[1]) };

  return { name: 'not-found', path };
}

export const productPath = (slug: string) => `/products/${encodeURIComponent(slug)}`;

export const categoryPath = (slug: string) => `/categories/${encodeURIComponent(slug)}`;
