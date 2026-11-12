import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './VectorScene3D.module.css';

export interface SceneVector {
  id: string;
  label: string;
  value: readonly [number, number, number];
  color: string;
  dashed?: boolean;
}

interface VectorScene3DProps {
  vectors: readonly SceneVector[];
  showProjectionGuide?: boolean;
}

function Arrow({
  to,
  color,
}: {
  to: readonly [number, number, number];
  color: string;
}) {
  const arrow = useMemo(() => {
    const direction = new THREE.Vector3(to[0], to[1], to[2]);
    const length = direction.length();

    if (length < 1e-6) {
      direction.set(0, 1, 0);
    }

    direction.normalize();

    return new THREE.ArrowHelper(
      direction,
      new THREE.Vector3(0, 0, 0),
      Math.max(length, 0.001),
      color,
      Math.min(0.4, Math.max(0.16, length * 0.18)),
      Math.min(0.22, Math.max(0.09, length * 0.09)),
    );
  }, [to, color]);

  return <primitive object={arrow} />;
}

function DashedLine({
  from,
  to,
  color = '#98a2b3',
}: {
  from: readonly [number, number, number];
  to: readonly [number, number, number];
  color?: string;
}) {
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(from[0], from[1], from[2]),
      new THREE.Vector3(to[0], to[1], to[2]),
    ]);
    const material = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.18,
      gapSize: 0.12,
      transparent: true,
      opacity: 0.65,
    });
    const result = new THREE.Line(geometry, material);
    result.computeLineDistances();

    return result;
  }, [from, to, color]);

  return <primitive object={line} />;
}

function Controls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 24;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    return () => controls.dispose();
  }, [camera, gl]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return null;
}

function Scene({ vectors, showProjectionGuide = false }: VectorScene3DProps) {
  const vectorA = vectors.find((vector) => vector.id === 'a');
  const vectorProjection = vectors.find((vector) => vector.id === 'projection');

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.8} />
      <gridHelper args={[12, 12, '#d0d5dd', '#eef0f3']} />
      <axesHelper args={[6]} />

      {vectors.map((vector) => (
        <Arrow key={vector.id} to={vector.value} color={vector.color} />
      ))}

      {showProjectionGuide && vectorA && vectorProjection && (
        <DashedLine from={vectorA.value} to={vectorProjection.value} />
      )}

      <Controls />
    </>
  );
}

export default function VectorScene3D(props: VectorScene3DProps) {
  return (
    <div className={styles.scene}>
      <Canvas
        camera={{ position: [7, 5, 8], fov: 44 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        aria-label="Visualisasi vektor tiga dimensi"
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
