export interface NavItem {
  label: string;
  href: string;
}

export type CurriculumGroupId = 'fondasi' | 'operasi' | 'analisis' | 'aplikasi';

export interface CurriculumModule {
  number: number;
  id: string;
  title: string;
  description: string;
  group: CurriculumGroupId;
}

export interface CurriculumGroup {
  id: CurriculumGroupId;
  title: string;
  description: string;
}

export interface AreaCapability {
  title: string;
  description: string;
}

export interface ModuleSummary {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface FormulaVariable {
  symbol: string;
  meaning: string;
}

export interface FormulaEntry {
  id: string;
  name: string;
  topic: string;
  moduleId: string;
  expression: string;
  explanation: string;
  variables: FormulaVariable[];
  example: string;
}

export interface GlossaryEntry {
  term: string;
  english: string;
  definition: string;
  moduleId: string;
  formula?: string;
}

export interface AreaContent {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  phase: string;
  status: string;
  capabilities: AreaCapability[];
  principles: string[];
}
