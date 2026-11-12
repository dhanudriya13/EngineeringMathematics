import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { clamp, roundTo } from '../../lib/math';
import styles from './VectorSvg2D.module.css';

export type VectorTone = 'a' | 'b' | 'result' | 'projection' | 'muted';

export interface VisualVector {
  id: string;
  label: string;
  value: readonly [number, number];
  tone: VectorTone;
  dashed?: boolean;
  draggable?: boolean;
}

interface VectorSvg2DProps {
  vectors: readonly VisualVector[];
  onVectorDrag?: (id: string, value: [number, number]) => void;
  showParallelogram?: boolean;
  showAngle?: boolean;
  showComponents?: boolean;
  showProjectionGuide?: boolean;
  caption?: string;
}

const WIDTH = 640;
const HEIGHT = 420;
const ORIGIN_X = WIDTH / 2;
const ORIGIN_Y = HEIGHT / 2;

const toneClass: Record<VectorTone, string> = {
  a: styles.labelA,
  b: styles.labelB,
  result: styles.labelResult,
  projection: styles.labelProjection,
  muted: styles.labelMuted,
};

const toneColor: Record<VectorTone, string> = {
  a: 'var(--color-vector-a)',
  b: 'var(--color-vector-b)',
  result: 'var(--color-vector-result)',
  projection: 'var(--color-vector-projection)',
  muted: 'var(--color-axis)',
};

function toScreen(value: readonly [number, number], scale: number): [number, number] {
  return [ORIGIN_X + value[0] * scale, ORIGIN_Y - value[1] * scale];
}

export default function VectorSvg2D({
  vectors,
  onVectorDrag,
  showParallelogram = false,
  showAngle = false,
  showComponents = false,
  showProjectionGuide = false,
  caption,
}: VectorSvg2DProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const scale = useMemo(() => {
    const maxAbs = Math.max(
      5,
      ...vectors.flatMap((vector) => [Math.abs(vector.value[0]), Math.abs(vector.value[1])]),
    );

    return Math.min((WIDTH / 2 - 70) / maxAbs, (HEIGHT / 2 - 55) / maxAbs);
  }, [vectors]);

  const vectorA = vectors.find((vector) => vector.id === 'a');
  const vectorB = vectors.find((vector) => vector.id === 'b');
  const vectorProjection = vectors.find((vector) => vector.id === 'projection');
  const vectorResult = vectors.find((vector) => vector.id === 'result');

  function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    if (!draggingId || !onVectorDrag || !svgRef.current) {
      return;
    }

    const rect = svgRef.current.getBoundingClientRect();
    const screenX = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const screenY = ((event.clientY - rect.top) / rect.height) * HEIGHT;
    const x = roundTo(clamp((screenX - ORIGIN_X) / scale, -10, 10), 1);
    const y = roundTo(clamp((ORIGIN_Y - screenY) / scale, -10, 10), 1);

    onVectorDrag(draggingId, [x, y]);
  }

  function endDrag(event: ReactPointerEvent<SVGSVGElement>) {
    if (svgRef.current?.hasPointerCapture(event.pointerId)) {
      svgRef.current.releasePointerCapture(event.pointerId);
    }

    setDraggingId(null);
  }

  const anglePath = (() => {
    if (!showAngle || !vectorA || !vectorB) {
      return null;
    }

    const start = Math.atan2(vectorA.value[1], vectorA.value[0]);
    const end = Math.atan2(vectorB.value[1], vectorB.value[0]);
    let delta = end - start;

    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;

    const radius = 46;
    const [x1, y1] = [ORIGIN_X + radius * Math.cos(start), ORIGIN_Y - radius * Math.sin(start)];
    const [x2, y2] = [
      ORIGIN_X + radius * Math.cos(start + delta),
      ORIGIN_Y - radius * Math.sin(start + delta),
    ];
    const largeArc = Math.abs(delta) > Math.PI ? 1 : 0;
    const sweep = delta > 0 ? 0 : 1;

    return {
      path: `M ${ORIGIN_X} ${ORIGIN_Y} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`,
      labelX: ORIGIN_X + (radius + 18) * Math.cos(start + delta / 2),
      labelY: ORIGIN_Y - (radius + 18) * Math.sin(start + delta / 2),
    };
  })();

  return (
    <div>
      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby="playground-vector-title playground-vector-desc"
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <title id="playground-vector-title">Visualisasi vektor dua dimensi</title>
        <desc id="playground-vector-desc">
          Diagram vektor pada bidang koordinat. Vektor dapat diubah melalui kolom masukan atau
          dengan menarik ujung panah.
        </desc>

        <defs>
          <pattern id="playground-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="var(--color-grid)" stroke-width="1" />
          </pattern>
          {(Object.keys(toneColor) as VectorTone[]).map((tone) => (
            <marker
              key={tone}
              id={`playground-arrow-${tone}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 10 5 0 10z" fill={toneColor[tone]} />
            </marker>
          ))}
        </defs>

        <rect width={WIDTH} height={HEIGHT} fill="url(#playground-grid)" rx="12" />
        <line x1="48" y1={ORIGIN_Y} x2={WIDTH - 28} y2={ORIGIN_Y} stroke="var(--color-axis)" strokeWidth="1.5" />
        <line x1={ORIGIN_X} y1="34" x2={ORIGIN_X} y2={HEIGHT - 28} stroke="var(--color-axis)" strokeWidth="1.5" />
        <text x={WIDTH - 38} y={ORIGIN_Y + 20} className={styles.axisLabel}>
          x
        </text>
        <text x={ORIGIN_X + 10} y="44" className={styles.axisLabel}>
          y
        </text>
        <text x={ORIGIN_X - 18} y={ORIGIN_Y + 20} className={styles.axisLabel}>
          O
        </text>

        {showParallelogram && vectorA && vectorB && (
          <>
            <line
              x1={toScreen(vectorA.value, scale)[0]}
              y1={toScreen(vectorA.value, scale)[1]}
              x2={toScreen([vectorA.value[0] + vectorB.value[0], vectorA.value[1] + vectorB.value[1]], scale)[0]}
              y2={toScreen([vectorA.value[0] + vectorB.value[0], vectorA.value[1] + vectorB.value[1]], scale)[1]}
              stroke="var(--color-vector-result)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              opacity="0.55"
            />
            <line
              x1={toScreen(vectorB.value, scale)[0]}
              y1={toScreen(vectorB.value, scale)[1]}
              x2={toScreen([vectorA.value[0] + vectorB.value[0], vectorA.value[1] + vectorB.value[1]], scale)[0]}
              y2={toScreen([vectorA.value[0] + vectorB.value[0], vectorA.value[1] + vectorB.value[1]], scale)[1]}
              stroke="var(--color-vector-result)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              opacity="0.55"
            />
          </>
        )}

        {showComponents && vectorA && (
          <>
            <line
              x1={toScreen(vectorA.value, scale)[0]}
              y1={toScreen(vectorA.value, scale)[1]}
              x2={toScreen([vectorA.value[0], 0], scale)[0]}
              y2={toScreen([vectorA.value[0], 0], scale)[1]}
              stroke="var(--color-vector-b)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <line
              x1={toScreen(vectorA.value, scale)[0]}
              y1={toScreen(vectorA.value, scale)[1]}
              x2={toScreen([0, vectorA.value[1]], scale)[0]}
              y2={toScreen([0, vectorA.value[1]], scale)[1]}
              stroke="var(--color-vector-b)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <line
              x1={toScreen([0, 0], scale)[0]}
              y1={toScreen([0, 0], scale)[1]}
              x2={toScreen([vectorA.value[0], 0], scale)[0]}
              y2={toScreen([vectorA.value[0], 0], scale)[1]}
              stroke="var(--color-vector-b)"
              strokeWidth="2.5"
            />
            <line
              x1={toScreen([0, 0], scale)[0]}
              y1={toScreen([0, 0], scale)[1]}
              x2={toScreen([0, vectorA.value[1]], scale)[0]}
              y2={toScreen([0, vectorA.value[1]], scale)[1]}
              stroke="var(--color-vector-b)"
              strokeWidth="2.5"
            />
          </>
        )}

        {showProjectionGuide && vectorA && vectorProjection && (
          <line
            x1={toScreen(vectorA.value, scale)[0]}
            y1={toScreen(vectorA.value, scale)[1]}
            x2={toScreen(vectorProjection.value, scale)[0]}
            y2={toScreen(vectorProjection.value, scale)[1]}
            stroke="var(--color-text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
        )}

        {anglePath && (
          <>
            <path d={anglePath.path} fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.5" />
            <text x={anglePath.labelX} y={anglePath.labelY} className={styles.labelMuted}>
              θ
            </text>
          </>
        )}

        {vectors.map((vector) => {
          const [x, y] = toScreen(vector.value, scale);
          const marker = `url(#playground-arrow-${vector.tone})`;
          const labelX = ORIGIN_X + (x - ORIGIN_X) * 0.62 + 8;
          const labelY = ORIGIN_Y + (y - ORIGIN_Y) * 0.62 - 8;
          const draggable = Boolean(vector.draggable && onVectorDrag);

          return (
            <g key={vector.id}>
              <line
                x1={ORIGIN_X}
                y1={ORIGIN_Y}
                x2={x}
                y2={y}
                stroke={toneColor[vector.tone]}
                strokeWidth={vector.tone === 'muted' ? 2 : 3}
                strokeDasharray={vector.dashed ? '7 5' : undefined}
                markerEnd={vector.tone === 'muted' ? undefined : marker}
              />
              <circle
                cx={x}
                cy={y}
                r={draggable ? 7 : 4.5}
                fill={toneColor[vector.tone]}
                className={`${styles.endpoint} ${draggable ? styles.draggable : ''}`}
                onPointerDown={
                  draggable
                    ? (event) => {
                        svgRef.current?.setPointerCapture(event.pointerId);
                        setDraggingId(vector.id);
                      }
                    : undefined
                }
              />
              {vector.tone !== 'result' && (
                <text x={labelX} y={labelY} className={`${styles.label} ${toneClass[vector.tone]}`}>
                  {vector.label}
                </text>
              )}
            </g>
          );
        })}

        {vectorResult && (
          <text
            x={toScreen(vectorResult.value, scale)[0] + 10}
            y={toScreen(vectorResult.value, scale)[1] - 10}
            className={`${styles.label} ${styles.labelResult}`}
          >
            {vectorResult.label}
          </text>
        )}
      </svg>
      <p className={styles.hint}>
        {caption ?? 'Tarik ujung panah untuk mengubah vektor.'}
      </p>
    </div>
  );
}
