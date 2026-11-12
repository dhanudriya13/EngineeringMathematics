export function normalizePath(path: string): string {
  if (!path) {
    return '/';
  }

  const pathname = path.split(/[?#]/, 1)[0] ?? '/';

  if (pathname.length <= 1) {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
}

export function isActivePath(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);

  if (target === '/') {
    return current === '/';
  }

  return current === target || current.startsWith(`${target}/`);
}
