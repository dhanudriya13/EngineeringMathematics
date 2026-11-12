import { site } from '../data/site';

export function formatPageTitle(title?: string): string {
  if (!title || title === site.name) {
    return `${site.name} — ${site.tagline}`;
  }

  return `${title} — ${site.name}`;
}
