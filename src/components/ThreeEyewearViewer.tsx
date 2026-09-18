import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, RefreshCw, ZoomIn, ZoomOut, Maximize2, Layers, Compass, Eye } from 'lucide-react';

interface ThreeEyewearViewerProps {
  frameColor?: string;
  lensColor?: string;
  lensOpacity?: number;
  autoRotate?: boolean;
  showCalipersDefault?: boolean;
  productTitle?: string;
  specs?: {
    frameWidth: string;
    bridgeWidth: string;
    lensHeight: string;
    templeLength: string;
  };
  onLaunchAR?: () => void;
}

export const ThreeEyewearViewer: React.FC<ThreeEyewearViewerProps> = ({
  frameColor = '#1A1A1A',
  lensColor = '#1C2E3D',
  lensOpacity = 0.8,
  autoRotate: initialAutoRotate = true,
  showCalipersDefault = false,
  productTitle = 'Aero-Titanium 01',
  specs = { frameWidth: '142 mm', bridgeWidth: '18 mm', lensHeight: '48 mm', templeLength: '145 mm' },
  onLaunchAR
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(initialAutoRotate);
  const [showCalipers, setShowCalipers] = useState(showCalipersDefault);
  const [isExploded, setIsExploded] = useState(false);
  const [lensCoating, setLensCoating] = useState<'emerald' | 'gold' | 'clear'>('emerald');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const eyewearGroupRef = useRef<THREE.Group | null>(null);
  const leftTempleRef = useRef<THREE.Group | null>(null);
  const rightTempleRef = useRef<THREE.Group | null>(null);
  const lensMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const frameMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.4);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // 4. Construct High-Fidelity 3D Eyewear Assembly
    const eyewearGroup = new THREE.Group();
    eyewearGroupRef.current = eyewearGroup;
    scene.add(eyewearGroup);

    // Frame Material
    const frameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(frameColor),
      roughness: 0.28,
      metalness: 0.85
    });
    frameMaterialsRef.current = [frameMat];

    // Lens Material (PBR Physical Optical Glass)
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(lensColor),
      transmission: 0.65,
      opacity: lensOpacity,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      ior: 1.52,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    lensMaterialsRef.current = [lensMat];

    // Lenses (Left and Right)
    const lensGeom = new THREE.CylinderGeometry(0.82, 0.82, 0.05, 32);
    lensGeom.rotateX(Math.PI / 2);
    lensGeom.scale(1.15, 0.95, 1);

    const leftLens = new THREE.Mesh(lensGeom, lensMat);
    leftLens.position.set(-1.18, 0, 0);
    eyewearGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeom, lensMat);
    rightLens.position.set(1.18, 0, 0);
    eyewearGroup.add(rightLens);

    // Frame Rims (Left and Right Torus)
    const rimGeom = new THREE.TorusGeometry(0.85, 0.06, 16, 48);
    rimGeom.scale(1.15, 0.95, 1);

    const leftRim = new THREE.Mesh(rimGeom, frameMat);
    leftRim.position.set(-1.18, 0, 0);
    eyewearGroup.add(leftRim);

    const rightRim = new THREE.Mesh(rimGeom, frameMat);
    rightRim.position.set(1.18, 0, 0);
    eyewearGroup.add(rightRim);

    // Double Nose Bridge (Titanium Architecture)
    const lowerBridgeCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.35, -0.05, 0),
      new THREE.Vector3(0, 0.18, 0.08),
      new THREE.Vector3(0.35, -0.05, 0)
    );
    const lowerBridgeGeom = new THREE.TubeGeometry(lowerBridgeCurve, 20, 0.038, 8, false);
    const lowerBridge = new THREE.Mesh(lowerBridgeGeom, frameMat);
    eyewearGroup.add(lowerBridge);

    const topBrowCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.95, 0.72, 0),
      new THREE.Vector3(0, 0.76, 0.04),
      new THREE.Vector3(0.95, 0.72, 0)
    );
    const topBrowGeom = new THREE.TubeGeometry(topBrowCurve, 20, 0.032, 8, false);
    const topBrow = new THREE.Mesh(topBrowGeom, frameMat);
    eyewearGroup.add(topBrow);

    // Silicone Nose Pads
    const padGeom = new THREE.CapsuleGeometry(0.04, 0.16, 8, 8);
    const padMat = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.6, transparent: true, opacity: 0.85 });

    const leftPad = new THREE.Mesh(padGeom, padMat);
    leftPad.position.set(-0.32, -0.22, -0.15);
    leftPad.rotation.z = 0.3;
    eyewearGroup.add(leftPad);

    const rightPad = new THREE.Mesh(padGeom, padMat);
    rightPad.position.set(0.32, -0.22, -0.15);
    rightPad.rotation.z = -0.3;
    eyewearGroup.add(rightPad);

    // Left Temple Arm Group
    const leftTemple = new THREE.Group();
    leftTempleRef.current = leftTemple;
    leftTemple.position.set(-2.15, 0.1, 0);

    const templeCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -2.6)
    );
    const templeGeom = new THREE.TubeGeometry(templeCurve, 16, 0.032, 8, false);
    const leftTempleMesh = new THREE.Mesh(templeGeom, frameMat);
    leftTemple.add(leftTempleMesh);

    // Acetate Temple Tip
    const tipGeom = new THREE.CylinderGeometry(0.045, 0.03, 0.8, 8);
    tipGeom.rotateX(Math.PI / 2);
    const tipMesh = new THREE.Mesh(tipGeom, frameMat);
    tipMesh.position.set(0, -0.12, -2.5);
    tipMesh.rotation.x = 0.45;
    leftTemple.add(tipMesh);

    eyewearGroup.add(leftTemple);

    // Right Temple Arm Group
    const rightTemple = new THREE.Group();
    rightTempleRef.current = rightTemple;
    rightTemple.position.set(2.15, 0.1, 0);

    const rightTempleMesh = new THREE.Mesh(templeGeom, frameMat);
    rightTemple.add(rightTempleMesh);

    const rightTipMesh = new THREE.Mesh(tipGeom, frameMat);
    rightTipMesh.position.set(0, -0.12, -2.5);
    rightTipMesh.rotation.x = 0.45;
    rightTemple.add(rightTipMesh);

    eyewearGroup.add(rightTemple);

    // Soft drop shadow ground plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0,0,0,0.22)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.08)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.6 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.2;
    scene.add(shadowPlane);

    // 5. Interaction Controls (Damped Drag Orbit)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.15;
    let currentRotationY = 0;
    let currentRotationX = 0.15;
    let cameraZ = 5.2;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX + deltaY * 0.008));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      try { container.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraZ = Math.max(3.0, Math.min(7.5, cameraZ + e.deltaY * 0.003));
      camera.position.z = cameraZ;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Keyboard accessibility navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== container) return;
      if (e.key === 'ArrowLeft') targetRotationY -= 0.15;
      if (e.key === 'ArrowRight') targetRotationY += 0.15;
      if (e.key === 'ArrowUp') targetRotationX = Math.min(0.6, targetRotationX + 0.1);
      if (e.key === 'ArrowDown') targetRotationX = Math.max(-0.6, targetRotationX - 0.1);
      if (e.key === '+' || e.key === '=') camera.position.z = Math.max(3.0, camera.position.z - 0.4);
      if (e.key === '-' || e.key === '_') camera.position.z = Math.min(7.5, camera.position.z + 0.4);
    };
    window.addEventListener('keydown', handleKeyDown);

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      if (isRotating && !isDragging) {
        targetRotationY += 0.006;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      if (eyewearGroupRef.current) {
        eyewearGroupRef.current.rotation.y = currentRotationY;
        eyewearGroupRef.current.rotation.x = currentRotationX;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      renderer.dispose();
    };
  }, []);

  // Update materials when frameColor or lensColor changes
  useEffect(() => {
    frameMaterialsRef.current.forEach(mat => {
      mat.color.set(frameColor);
      mat.metalness = frameColor.includes('C29B38') ? 0.95 : 0.82;
    });
    lensMaterialsRef.current.forEach(mat => {
      mat.color.set(lensColor);
      mat.opacity = lensOpacity;
    });
  }, [frameColor, lensColor, lensOpacity]);

  // Handle Exploded View
  useEffect(() => {
    if (!leftTempleRef.current || !rightTempleRef.current) return;
    if (isExploded) {
      leftTempleRef.current.position.set(-2.8, 0.2, 0.4);
      rightTempleRef.current.position.set(2.8, 0.2, 0.4);
    } else {
      leftTempleRef.current.position.set(-2.15, 0.1, 0);
      rightTempleRef.current.position.set(2.15, 0.1, 0);
    }
  }, [isExploded]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-gradient-to-b from-[#FAF8F5] to-[#EAE6DE] rounded-sm overflow-hidden select-none border border-[#E5E2DC]">
      {/* Visual Instruction Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#1A1A1A]/90 text-[#FAF9F6] backdrop-blur-md rounded-sm">
          <Compass className="w-3.5 h-3.5 text-[#C29B38]" />
          3D Precision Studio
        </span>
        <span className="hidden sm:inline-block text-[11px] text-[#6B6864] bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-sm">
          Drag to orbit • Scroll to zoom
        </span>
      </div>

      {/* Caliper Overlay Metrics */}
      {showCalipers && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
          {/* Top Width Caliper */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#1A1A1A] border-b border-dashed border-[#C29B38] pb-1">
            <span>⟵ Frame Width</span>
            <span className="font-semibold bg-[#C29B38]/15 px-2 py-0.5 rounded text-[#1A1A1A]">{specs.frameWidth}</span>
            <span>Total ⟶</span>
          </div>

          {/* Center Bridge & Lens Caliper */}
          <div className="flex justify-between items-center text-[10px] font-mono text-[#6B6864]">
            <div className="bg-white/90 backdrop-blur p-1.5 rounded border border-[#E5E2DC]">
              Height: <span className="font-semibold text-[#1A1A1A]">{specs.lensHeight}</span>
            </div>
            <div className="bg-white/90 backdrop-blur p-1.5 rounded border border-[#C29B38]">
              Bridge: <span className="font-semibold text-[#C29B38]">{specs.bridgeWidth}</span>
            </div>
            <div className="bg-white/90 backdrop-blur p-1.5 rounded border border-[#E5E2DC]">
              Temple: <span className="font-semibold text-[#1A1A1A]">{specs.templeLength}</span>
            </div>
          </div>

          {/* Bottom Precision Origin */}
          <div className="text-[10px] font-mono text-center text-[#6B6864]">
            Optical Calibration: 0.05mm CNC Precision Tolerances (Sabae, Japan)
          </div>
        </div>
      )}

      {/* WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none focus:ring-2 focus:ring-[#C29B38]"
        tabIndex={0}
        role="region"
        aria-label={`Interactive 3D model of ${productTitle}. Use arrow keys to rotate, plus or minus to zoom.`}
      />

      {/* Floating Control Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E5E2DC] shadow-lg">
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            isRotating ? 'bg-[#1A1A1A] text-[#FAF9F6]' : 'text-[#1A1A1A] hover:bg-[#F4F1EC]'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isRotating ? 'Pause' : 'Rotate'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowCalipers(!showCalipers)}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            showCalipers ? 'bg-[#C29B38] text-white' : 'text-[#1A1A1A] hover:bg-[#F4F1EC]'
          }`}
          title="Toggle Caliper Frame Dimensions"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Calipers</span>
        </button>

        <button
          type="button"
          onClick={() => setIsExploded(!isExploded)}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            isExploded ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#F4F1EC]'
          }`}
          title="Exploded Hinge View"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exploded</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (cameraRef.current) {
              cameraRef.current.position.set(0, 1.2, 5.2);
              cameraRef.current.lookAt(0, 0, 0);
            }
            if (eyewearGroupRef.current) {
              eyewearGroupRef.current.rotation.set(0.15, 0, 0);
            }
          }}
          className="p-1.5 text-[#6B6864] hover:text-[#1A1A1A] hover:bg-[#F4F1EC] rounded-full transition-colors"
          title="Reset View Orientation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {onLaunchAR && (
          <button
            type="button"
            onClick={onLaunchAR}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-[#1A1A1A] text-[#FAF9F6] rounded-full hover:bg-black transition-colors"
            title="View in Your Physical Space via Augmented Reality"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>AR Space</span>
          </button>
        )}
      </div>
    </div>
  );
};
