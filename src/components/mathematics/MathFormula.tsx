import katex from 'katex';
import { useMemo } from 'react';

interface MathFormulaProps {
  tex: string;
  display?: boolean;
  className?: string;
}

export default function MathFormula({ tex, display = false, className }: MathFormulaProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      }),
    [tex, display],
  );

  if (display) {
    return (
      <div
        className={className}
        // KaTeX menghasilkan HTML dan MathML yang sudah disanitasi dari input statis.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
