import { lazy, Suspense, useMemo, useState } from 'react';
import {
  angleBetweenDegrees,
  clamp,
  crossProduct,
  dotProduct,
  formatNumber,
  isOrthogonal,
  isZeroVector,
  magnitude,
  nearlyEqual,
  projectVector,
  scalarMultiply,
  scalarProjection,
  vectorAdd,
  vectorComponents,
  vectorSubtract,
  type Vector,
} from '../../lib/math';
import {
  getPlaygroundTool,
  playgroundTools,
  type PlaygroundDimension,
  type PlaygroundToolId,
  type PlaygroundVector,
} from '../../data/playground';
import MathFormula from '../mathematics/MathFormula';
import NumericField from './NumericField';
import VectorInput from './VectorInput';
import VectorSvg2D, { type VectorTone, type VisualVector } from './VectorSvg2D';
import styles from './Playground.module.css';

const VectorScene3D = lazy(() => import('./VectorScene3D'));

interface ResultRow {
  label: string;
  value: string;
  primary?: boolean;
}

interface BadgeInfo {
  label: string;
  tone: 'success' | 'warning' | 'error' | 'neutral';
}

interface Calculation {
  formula: string;
  rows: ResultRow[];
  note?: string;
  badge?: BadgeInfo;
  error?: string;
  visualVectors: VisualVector[];
  sceneVectors: {
    id: string;
    label: string;
    value: readonly [number, number, number];
    color: string;
  }[];
  showParallelogram?: boolean;
  showAngle?: boolean;
  showComponents?: boolean;
  showProjectionGuide?: boolean;
  caption?: string;
}

const COLORS = {
  a: 'var(--color-vector-a)',
  b: 'var(--color-vector-b)',
  result: 'var(--color-vector-result)',
  projection: 'var(--color-vector-projection)',
} as const;

const HEX = {
  a: '#2563eb',
  b: '#b45309',
  result: '#7c3aed',
  projection: '#0f766e',
} as const;

const initialTool = playgroundTools[0]!;

function toDimension(vector: PlaygroundVector, dimension: PlaygroundDimension): number[] {
  return dimension === 2 ? [vector.x, vector.y] : [vector.x, vector.y, vector.z];
}

function toVec3(vector: PlaygroundVector): [number, number, number] {
  return [vector.x, vector.y, vector.z];
}

function formatVector(vector: Vector): string {
  return `(${vector.map((component) => formatNumber(component, 3)).join(', ')})`;
}

function makeVisual(
  id: string,
  label: string,
  value: readonly [number, number],
  tone: VectorTone,
  draggable = false,
  dashed = false,
): VisualVector {
  return { id, label, value, tone, draggable, dashed };
}

function makeScene(
  id: string,
  label: string,
  value: PlaygroundVector,
  tone: keyof typeof HEX,
) {
  return {
    id,
    label,
    value: toVec3(value),
    color: HEX[tone],
  };
}

function baseVisuals(
  a: PlaygroundVector,
  b: PlaygroundVector,
  dimension: PlaygroundDimension,
  includeB = true,
): VisualVector[] {
  if (dimension !== 2) {
    return [];
  }

  const visuals = [makeVisual('a', 'a', [a.x, a.y], 'a', true)];

  if (includeB) {
    visuals.push(makeVisual('b', 'b', [b.x, b.y], 'b', true));
  }

  return visuals;
}

function baseScene(
  a: PlaygroundVector,
  b: PlaygroundVector,
  includeB = true,
) {
  const scenes = [makeScene('a', 'a', a, 'a')];

  if (includeB) {
    scenes.push(makeScene('b', 'b', b, 'b'));
  }

  return scenes;
}

export default function Playground() {
  const [toolId, setToolId] = useState<PlaygroundToolId>(initialTool.id);
  const [dimension, setDimension] = useState<PlaygroundDimension>(2);
  const [a, setA] = useState<PlaygroundVector>({ ...initialTool.examples[0]!.a });
  const [b, setB] = useState<PlaygroundVector>({ ...initialTool.examples[0]!.b });
  const [scalar, setScalar] = useState(initialTool.examples[0]!.scalar);
  const [exampleIndex, setExampleIndex] = useState(0);

  const tool = getPlaygroundTool(toolId);
  const effectiveDimension: PlaygroundDimension = toolId === 'cross' ? 3 : dimension;
  const needsB = toolId !== 'scalar' && toolId !== 'components';

  const calculation = useMemo<Calculation>(() => {
    const va = toDimension(a, effectiveDimension);
    const vb = toDimension(b, effectiveDimension);
    const formula = tool.formula;
    const baseVisual = baseVisuals(a, b, effectiveDimension, needsB);
    const baseSceneVectors = baseScene(a, b, needsB);

    const fail = (message: string): Calculation => ({
      formula,
      rows: [],
      error: message,
      visualVectors: baseVisual,
      sceneVectors: baseSceneVectors,
    });

    try {
      switch (toolId) {
        case 'addition': {
          const result = vectorAdd(va, vb);
          const [rx = 0, ry = 0] = result;
          return {
            formula,
            rows: [
              { label: 'Vektor a', value: formatVector(va) },
              { label: 'Vektor b', value: formatVector(vb) },
              { label: 'a + b', value: formatVector(result), primary: true },
              { label: '‖a + b‖', value: formatNumber(magnitude(result), 3) },
            ],
            note: 'Resultan adalah diagonal jajargenjang yang dibentuk a dan b.',
            visualVectors: [
              ...baseVisuals(a, b, effectiveDimension),
              makeVisual('result', 'a + b', [rx, ry], 'result'),
            ],
            sceneVectors: [
              ...baseScene(a, b),
              makeScene('result', 'a + b', { x: rx, y: ry, z: (a.z ?? 0) + (b.z ?? 0) }, 'result'),
            ],
            showParallelogram: true,
            caption: 'Tarik ujung panah a atau b. Garis putus-putus membentuk jajargenjang.',
          };
        }

        case 'subtraction': {
          const result = vectorAdd(va, scalarMultiply(vb, -1));
          const [rx = 0, ry = 0] = result;
          return {
            formula,
            rows: [
              { label: 'Vektor a', value: formatVector(va) },
              { label: 'Vektor b', value: formatVector(vb) },
              { label: 'a − b', value: formatVector(result), primary: true },
              { label: 'b − a', value: formatVector(vectorSubtract(vb, va)) },
              { label: '‖a − b‖', value: formatNumber(magnitude(result), 3) },
            ],
            note: 'a − b menghubungkan ujung b ke ujung a ketika kedua vektor disusun dari titik awal yang sama.',
            visualVectors: [
              ...baseVisuals(a, b, effectiveDimension),
              makeVisual('result', 'a − b', [rx, ry], 'projection'),
            ],
            sceneVectors: [
              ...baseScene(a, b),
              makeScene(
                'result',
                'a − b',
                { x: rx, y: ry, z: (a.z ?? 0) - (b.z ?? 0) },
                'result',
              ),
            ],
            caption: 'Tarik ujung panah a atau b untuk melihat perubahan arah selisih.',
          };
        }

        case 'scalar': {
          const result = scalarMultiply(va, scalar);
          const [rx = 0, ry = 0] = result;
          const zero = isZeroVector(result);
          return {
            formula,
            rows: [
              { label: 'Vektor v', value: formatVector(va) },
              { label: 'Skalar k', value: formatNumber(scalar, 3) },
              { label: 'k v', value: formatVector(result), primary: true },
              { label: '‖k v‖', value: formatNumber(magnitude(result), 3) },
              { label: '‖v‖', value: formatNumber(magnitude(va), 3) },
            ],
            note: zero
              ? 'Skalar nol menghasilkan vektor nol. Arahnya tidak terdefinisi.'
              : scalar > 0
                ? 'Skalar positif mempertahankan arah; panjang berubah sesuai nilai k.'
                : scalar < 0
                  ? 'Skalar negatif membalik arah; panjang berubah sesuai |k|.'
                  : 'Skalar nol menghasilkan vektor nol.',
            badge: zero
              ? { label: 'Vektor nol', tone: 'warning' }
              : scalar < 0
                ? { label: 'Arah berbalik', tone: 'warning' }
                : { label: 'Arah tetap', tone: 'success' },
            visualVectors: effectiveDimension === 2
              ? [
                  makeVisual('a', 'v', [a.x, a.y], 'a', true),
                  makeVisual('result', 'k v', [rx, ry], 'result'),
                ]
              : [],
            sceneVectors: [
              makeScene('a', 'v', a, 'a'),
              makeScene('result', 'k v', { x: rx, y: ry, z: scalar * (a.z ?? 0) }, 'result'),
            ],
            showComponents: false,
            caption: 'Ubah skalar untuk melihat perubahan panjang dan arah vektor.',
          };
        }

        case 'components': {
          const components = vectorComponents(va);
          const length = magnitude(va);
          const rows: ResultRow[] = [
            { label: 'Komponen x', value: formatNumber(components.x, 3) },
            { label: 'Komponen y', value: formatNumber(components.y, 3) },
            { label: '‖v‖', value: formatNumber(length, 3), primary: true },
          ];

          if (components.z !== null) {
            rows.splice(2, 0, { label: 'Komponen z', value: formatNumber(components.z, 3) });
          }

          if (length > 0) {
            if (effectiveDimension === 2) {
              rows.push({
                label: 'Arah θ',
                value: `${formatNumber((Math.atan2(components.y, components.x) * 180) / Math.PI, 2)}°`,
              });
            } else {
              const x = clamp(components.x / length, -1, 1);
              const y = clamp(components.y / length, -1, 1);
              const z = clamp((components.z ?? 0) / length, -1, 1);
              rows.push({
                label: 'Sudut terhadap x/y/z',
                value: `${formatNumber((Math.acos(x) * 180) / Math.PI, 1)}° / ${formatNumber(
                  (Math.acos(y) * 180) / Math.PI,
                  1,
                )}° / ${formatNumber((Math.acos(z) * 180) / Math.PI, 1)}°`,
              });
            }
          }

          return {
            formula,
            rows,
            note:
              length > 0
                ? 'Komponen menunjukkan kontribusi vektor pada setiap sumbu.'
                : 'Vektor nol tidak memiliki arah yang terdefinisi.',
            badge:
              length > 0
                ? { label: 'Komponen terdefinisi', tone: 'success' }
                : { label: 'Vektor nol', tone: 'warning' },
            visualVectors: baseVisuals(a, b, effectiveDimension, false),
            sceneVectors: baseScene(a, b, false),
            showComponents: true,
            caption: 'Garis putus-putus menunjukkan komponen horizontal dan vertikal vektor.',
          };
        }

        case 'dot': {
          const dot = dotProduct(va, vb);
          const lengthA = magnitude(va);
          const lengthB = magnitude(vb);
          const hasZero = isZeroVector(va) || isZeroVector(vb);
          const angle = hasZero ? null : angleBetweenDegrees(va, vb);
          const orthogonal = !hasZero && isOrthogonal(va, vb);
          const rows: ResultRow[] = [
            { label: 'a · b', value: formatNumber(dot, 4), primary: true },
            { label: '‖a‖', value: formatNumber(lengthA, 3) },
            { label: '‖b‖', value: formatNumber(lengthB, 3) },
          ];

          if (angle !== null) {
            rows.push({ label: 'Sudut θ', value: `${formatNumber(angle, 2)}°` });
          }

          return {
            formula,
            rows,
            note: hasZero
              ? 'Vektor nol membuat sudut tidak terdefinisi, tetapi perkalian titik tetap dapat dihitung.'
              : orthogonal
                ? 'Hasil nol menunjukkan kedua vektor ortogonal.'
                : dot > 0
                  ? 'Hasil positif menunjukkan sudut lancip.'
                  : 'Hasil negatif menunjukkan sudut tumpul.',
            badge: hasZero
              ? { label: 'Ada vektor nol', tone: 'warning' }
              : orthogonal
                ? { label: 'Ortogonal', tone: 'success' }
                : dot > 0
                  ? { label: 'Sudut lancip', tone: 'neutral' }
                  : { label: 'Sudut tumpul', tone: 'warning' },
            visualVectors: baseVisuals(a, b, effectiveDimension),
            sceneVectors: baseScene(a, b),
            showAngle: angle !== null,
            caption: 'Sudut dan tanda perkalian titik berubah ketika arah vektor diubah.',
          };
        }

        case 'angle': {
          if (isZeroVector(va) || isZeroVector(vb)) {
            return fail('Sudut tidak terdefinisi jika salah satu vektor adalah vektor nol.');
          }

          const angle = angleBetweenDegrees(va, vb);
          const cosine = Math.cos((angle * Math.PI) / 180);
          const kind = nearlyEqual(angle, 90, 1e-6)
            ? 'Siku-siku'
            : angle < 90
              ? 'Lancip'
              : 'Tumpul';

          return {
            formula,
            rows: [
              { label: 'Sudut θ', value: `${formatNumber(angle, 2)}°`, primary: true },
              { label: 'cos θ', value: formatNumber(cosine, 4) },
              { label: 'a · b', value: formatNumber(dotProduct(va, vb), 4) },
              { label: 'Jenis sudut', value: kind },
            ],
            note: 'Sudut selalu berada pada rentang 0° sampai 180°.',
            badge: {
              label: kind,
              tone: kind === 'Siku-siku' ? 'success' : kind === 'Lancip' ? 'neutral' : 'warning',
            },
            visualVectors: baseVisuals(a, b, effectiveDimension),
            sceneVectors: baseScene(a, b),
            showAngle: true,
            caption: 'Tarik ujung panah untuk mengubah sudut antara kedua vektor.',
          };
        }

        case 'projection': {
          if (isZeroVector(vb)) {
            return fail('Proyeksi tidak terdefinisi pada vektor nol.');
          }

          const scalarProj = scalarProjection(va, vb);
          const projection = projectVector(va, vb);
          const [px = 0, py = 0] = projection;

          return {
            formula,
            rows: [
              { label: 'Proyeksi skalar', value: formatNumber(scalarProj, 4), primary: true },
              { label: 'Proyeksi vektor', value: formatVector(projection) },
              { label: '‖a‖', value: formatNumber(magnitude(va), 3) },
              { label: '‖b‖', value: formatNumber(magnitude(vb), 3) },
            ],
            note: 'Proyeksi vektor selalu sejajar dengan b. Tanda proyeksi skalar menunjukkan arah relatif terhadap b.',
            visualVectors: effectiveDimension === 2
              ? [
                  makeVisual('a', 'a', [a.x, a.y], 'a', true),
                  makeVisual('b', 'b', [b.x, b.y], 'b', true),
                  makeVisual('projection', 'proj_b a', [px, py], 'projection'),
                ]
              : [],
            sceneVectors: [
              makeScene('a', 'a', a, 'a'),
              makeScene('b', 'b', b, 'b'),
              makeScene('result', 'proj_b a', { x: px, y: py, z: projection[2] ?? 0 }, 'projection'),
            ],
            showProjectionGuide: true,
            caption: 'Garis putus-putus menghubungkan ujung a ke bayangannya pada arah b.',
          };
        }

        case 'cross': {
          const result = crossProduct(va, vb);
          const lengthA = magnitude(va);
          const lengthB = magnitude(vb);
          const angle = lengthA > 0 && lengthB > 0 ? angleBetweenDegrees(va, vb) : null;
          const orthogonal =
            nearlyEqual(dotProduct(result, va), 0, 1e-7) &&
            nearlyEqual(dotProduct(result, vb), 0, 1e-7);

          return {
            formula,
            rows: [
              { label: 'a × b', value: formatVector(result), primary: true },
              { label: '‖a × b‖', value: formatNumber(magnitude(result), 4) },
              { label: 'Luas jajargenjang', value: formatNumber(magnitude(result), 4) },
              ...(angle !== null ? [{ label: 'Sudut θ', value: `${formatNumber(angle, 2)}°` }] : []),
            ],
            note: orthogonal
              ? 'Hasil tegak lurus terhadap a dan b. Arahnya mengikuti aturan tangan kanan.'
              : 'Periksa kembali nilai masukan; hasil seharusnya tegak lurus terhadap kedua vektor.',
            badge: orthogonal
              ? { label: 'Tegak lurus terhadap a dan b', tone: 'success' }
              : { label: 'Periksa hasil', tone: 'warning' },
            visualVectors: [],
            sceneVectors: [
              makeScene('a', 'a', a, 'a'),
              makeScene('b', 'b', b, 'b'),
              makeScene('result', 'a × b', { x: result[0]!, y: result[1]!, z: result[2]! }, 'result'),
            ],
            caption: 'Putar scene untuk memeriksa arah hasil terhadap a dan b.',
          };
        }
      }
    } catch (error) {
      return fail(error instanceof Error ? error.message : 'Perhitungan tidak dapat dilakukan.');
    }
  }, [a, b, effectiveDimension, needsB, scalar, tool, toolId]);

  const legend =
    effectiveDimension === 3
      ? calculation.sceneVectors.map((vector) => ({
          label: vector.label,
          color: vector.color,
        }))
      : calculation.visualVectors.map((vector) => ({
          label: vector.label,
          color:
            vector.tone === 'a'
              ? COLORS.a
              : vector.tone === 'b'
                ? COLORS.b
                : vector.tone === 'result'
                  ? COLORS.result
                  : vector.tone === 'projection'
                    ? COLORS.projection
                    : 'var(--color-axis)',
        }));

  const badgeClass =
    calculation.badge?.tone === 'success'
      ? `${styles.badge} ${styles.badgeSuccess}`
      : calculation.badge?.tone === 'warning'
        ? `${styles.badge} ${styles.badgeWarning}`
        : calculation.badge?.tone === 'error'
          ? `${styles.badge} ${styles.badgeError}`
          : styles.badge;

  function selectTool(nextId: PlaygroundToolId) {
    const nextTool = getPlaygroundTool(nextId);
    const example = nextTool.examples[0]!;

    setToolId(nextId);
    setA({ ...example.a });
    setB({ ...example.b });
    setScalar(example.scalar);
    setExampleIndex(0);
    setDimension(nextId === 'cross' ? 3 : example.dimension);
  }

  function loadExample(index: number) {
    const example = tool.examples[index];

    if (!example) {
      return;
    }

    setA({ ...example.a });
    setB({ ...example.b });
    setScalar(example.scalar);
    setExampleIndex(index);
    setDimension(toolId === 'cross' ? 3 : example.dimension);
  }

  function handleVectorDrag(id: string, [x, y]: [number, number]) {
    if (id === 'a') {
      setA((current) => ({ ...current, x, y }));
    } else if (id === 'b') {
      setB((current) => ({ ...current, x, y }));
    }
  }

  return (
    <section className={styles.playground} aria-label="Vector Playground interaktif">
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <p className="eyebrow">Laboratorium interaktif</p>
            <h2>{tool.label}</h2>
          </div>
          {tool.supports3D ? (
            <div className={styles.dimensionToggle} role="group" aria-label="Dimensi visualisasi">
              {([2, 3] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.dimensionButton} ${
                    effectiveDimension === value ? styles.dimensionButtonActive : ''
                  }`}
                  aria-pressed={effectiveDimension === value}
                  onClick={() => setDimension(value)}
                >
                  {value}D
                </button>
              ))}
            </div>
          ) : (
            <span className={styles.badge}>Visualisasi 3D</span>
          )}
        </div>
        <p>{tool.description}</p>
      </div>

      <div className={styles.toolTabs} aria-label="Alat playground">
        {playgroundTools.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === toolId}
            className={`${styles.toolTab} ${item.id === toolId ? styles.toolTabActive : ''}`}
            onClick={() => selectTool(item.id)}
          >
            {item.shortLabel}
          </button>
        ))}
      </div>

      <div className={styles.workspace}>
        <div className={styles.canvasPanel}>
          <div className={styles.canvasHeader}>
            <span className={styles.canvasTitle}>
              {effectiveDimension === 3 ? 'Bidang 3D' : 'Bidang 2D'}
            </span>
            <div className={styles.legend} aria-label="Legenda vektor">
              {legend.map((item) => (
                <span className={styles.legendItem} key={`${item.label}-${item.color}`}>
                  <span className={styles.swatch} style={{ background: item.color }} aria-hidden="true" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {effectiveDimension === 3 ? (
            <Suspense fallback={<div className={styles.loading}>Memuat visualisasi 3D…</div>}>
              <VectorScene3D
                vectors={calculation.sceneVectors}
                showProjectionGuide={calculation.showProjectionGuide}
              />
            </Suspense>
          ) : (
            <VectorSvg2D
              vectors={calculation.visualVectors}
              onVectorDrag={handleVectorDrag}
              showParallelogram={calculation.showParallelogram}
              showAngle={calculation.showAngle}
              showComponents={calculation.showComponents}
              showProjectionGuide={calculation.showProjectionGuide}
              caption={calculation.caption}
            />
          )}
          <p className={styles.hint}>
            Gunakan kolom masukan dan slider untuk kontrol keyboard. Pada tampilan 2D, ujung panah
            juga dapat ditarik.
          </p>
        </div>

        <div className={styles.sidePanel}>
          <section className={styles.panelSection}>
            <p className={styles.sectionTitle}>Contoh dan dimensi</p>
            <div className={styles.exampleRow}>
              <select
                className={styles.select}
                value={exampleIndex}
                onChange={(event) => loadExample(Number(event.target.value))}
                aria-label="Pilih contoh"
              >
                {tool.examples.map((example, index) => (
                  <option key={example.label} value={index}>
                    {example.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className={`${styles.button} ${styles.resetButton}`}
                onClick={() => loadExample(0)}
              >
                Atur ulang
              </button>
            </div>
          </section>

          <section className={styles.panelSection}>
            <p className={styles.sectionTitle}>Vektor masukan</p>
            <div className={styles.vectorStack}>
              <VectorInput
                label={toolId === 'projection' ? 'Vektor a (sumber)' : 'Vektor a'}
                value={a}
                dimension={effectiveDimension}
                onChange={setA}
              />
              {needsB && (
                <VectorInput
                  label={toolId === 'projection' ? 'Vektor b (tujuan)' : 'Vektor b'}
                  value={b}
                  dimension={effectiveDimension}
                  onChange={setB}
                />
              )}
              {toolId === 'scalar' && (
                <NumericField
                  label="Skalar k"
                  value={scalar}
                  onChange={setScalar}
                  min={-5}
                  max={5}
                  step={0.1}
                />
              )}
            </div>
          </section>

          <section className={styles.panelSection}>
            <p className={styles.sectionTitle}>Hasil perhitungan</p>
            {calculation.error ? (
              <div className={styles.errorBox} role="alert">
                {calculation.error}
              </div>
            ) : (
              <>
                {calculation.badge && (
                  <span className={badgeClass}>{calculation.badge.label}</span>
                )}
                <div className={styles.resultGrid}>
                  {calculation.rows.map((row) => (
                    <div className={styles.resultRow} key={row.label}>
                      <span className={styles.resultLabel}>{row.label}</span>
                      <span
                        className={`${styles.resultValue} ${
                          row.primary ? styles.resultValuePrimary : ''
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                {calculation.note && <p className={styles.resultNote}>{calculation.note}</p>}
              </>
            )}
            <div className={styles.formulaBox}>
              <MathFormula tex={calculation.formula} display />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
