import type { CollectionEntry } from 'astro:content';
import type { ModuleSummary } from '../types';

export type ModuleEntry = CollectionEntry<'modules'>;

export function getModuleId(id: string): string {
  return id.replace(/\.mdx?$/, '');
}

export function toModuleSummary(entry: ModuleEntry): ModuleSummary {
  return {
    id: getModuleId(entry.id),
    order: entry.data.order,
    title: entry.data.title,
    description: entry.data.description,
  };
}
