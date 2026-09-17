"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type LabVisualizerMode = "atom" | "prism" | "magnet";

interface ThreeLabStageProps {
  initialMode?: LabVisualizerMode;
  className?: string;
}

export function ThreeLabStage({ initialMode = "atom", className = "" }: ThreeLabStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<LabVisualizerMode>(initialMode);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const modeRef = useRef(mode);
  const speedRef = useRef(speed);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // --- Ambient & Point Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);

    const pointLightAmber = new THREE.PointLight(0xf59e0b, 2.5, 50);
    pointLightAmber.position.set(-5, -5, 10);
    scene.add(pointLightAmber);

    // --- Groups for Modes ---
    const atomGroup = new THREE.Group();
    const prismGroup = new THREE.Group();
    const magnetGroup = new THREE.Group();
    scene.add(atomGroup);
    scene.add(prismGroup);
    scene.add(magnetGroup);

    // =========================================================================
    // 1. ATOM MODEL (Bohr Shells K, L, M)
    // =========================================================================
    // Nucleus (Protons & Neutrons clump)
    const nucleusGroup = new THREE.Group();
    const protonGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const protonMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b, roughness: 0.3 });
    const neutronMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0e7490, roughness: 0.3 });

    for (let i = 0; i < 11; i++) {
      const p = new THREE.Mesh(protonGeo, i % 2 === 0 ? protonMat : neutronMat);
      const angle = (i / 11) * Math.PI * 2;
      const r = 0.55 * Math.random();
      p.position.set(
        Math.cos(angle) * r + (Math.random() - 0.5) * 0.3,
        Math.sin(angle) * r + (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.6
      );
      nucleusGroup.add(p);
    }
    atomGroup.add(nucleusGroup);

    // Orbital Rings & Electrons
    interface OrbitRing {
      radius: number;
      tiltX: number;
      tiltY: number;
      electronCount: number;
      speed: number;
      color: number;
      electrons: THREE.Mesh[];
    }

    const orbitDefs: { radius: number; tiltX: number; tiltY: number; count: number; speed: number; color: number }[] = [
      { radius: 2.6, tiltX: 0.3, tiltY: 0.2, count: 2, speed: 2.2, color: 0x38bdf8 }, // K shell
      { radius: 4.8, tiltX: -0.6, tiltY: 0.8, count: 8, speed: 1.5, color: 0xa855f7 }, // L shell
      { radius: 7.2, tiltX: 0.9, tiltY: -0.4, count: 1, speed: 0.9, color: 0xf59e0b }, // M shell (Valence e-)
    ];

    const rings: OrbitRing[] = [];
    const electronGeo = new THREE.SphereGeometry(0.18, 16, 16);

    orbitDefs.forEach((def) => {
      // Ring curve
      const curve = new THREE.EllipseCurve(0, 0, def.radius, def.radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(64);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, p.y, 0)));
      const ringMat = new THREE.LineBasicMaterial({ color: def.color, transparent: true, opacity: 0.4 });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.x = def.tiltX;
      ringLine.rotation.y = def.tiltY;
      atomGroup.add(ringLine);

      // Electrons
      const electrons: THREE.Mesh[] = [];
      const eMat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });

      for (let j = 0; j < def.count; j++) {
        const eMesh = new THREE.Mesh(electronGeo, eMat);
        atomGroup.add(eMesh);
        electrons.push(eMesh);
      }

      rings.push({
        radius: def.radius,
        tiltX: def.tiltX,
        tiltY: def.tiltY,
        electronCount: def.count,
        speed: def.speed,
        color: def.color,
        electrons,
      });
    });

    // =========================================================================
    // 2. OPTICS PRISM (Dispersion of Light into VIBGYOR)
    // =========================================================================
    const prismGeo = new THREE.CylinderGeometry(3.2, 3.2, 4.5, 3);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      transmission: 0.85,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      ior: 1.52, // Glass Refractive Index
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    prismMesh.rotation.y = Math.PI / 6;
    prismGroup.add(prismMesh);

    // Incident white ray
    const incidentPoints = [new THREE.Vector3(-8, 0.5, 0), new THREE.Vector3(-1.6, 0.2, 0)];
    const incidentGeo = new THREE.BufferGeometry().setFromPoints(incidentPoints);
    const incidentMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    prismGroup.add(new THREE.Line(incidentGeo, incidentMat));

    // Refracted VIBGYOR Rainbow rays emerging
    const vibgyorColors = [
      { name: "Violet", hex: 0x8b5cf6, spreadY: -1.2 },
      { name: "Indigo", hex: 0x6366f1, spreadY: -0.8 },
      { name: "Blue", hex: 0x0ea5e9, spreadY: -0.4 },
      { name: "Green", hex: 0x10b981, spreadY: 0.0 },
      { name: "Yellow", hex: 0xeab308, spreadY: 0.4 },
      { name: "Orange", hex: 0xf97316, spreadY: 0.8 },
      { name: "Red", hex: 0xef4444, spreadY: 1.2 },
    ];

    vibgyorColors.forEach((c) => {
      const rayPoints = [
        new THREE.Vector3(1.6, 0.1, 0),
        new THREE.Vector3(8, c.spreadY * 2.2, 0),
      ];
      const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
      const rayMat = new THREE.LineBasicMaterial({ color: c.hex, transparent: true, opacity: 0.85 });
      prismGroup.add(new THREE.Line(rayGeo, rayMat));
    });

    // =========================================================================
    // 3. MAGNETIC DIPOLE & FIELD LINES
    // =========================================================================
    // Bar Magnet (North = Red, South = Blue)
    const magnetBarGeo = new THREE.BoxGeometry(2.5, 1.2, 0.8);
    const northMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const southMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3 });

    const northMesh = new THREE.Mesh(magnetBarGeo, northMat);
    northMesh.position.x = 1.25;
    magnetGroup.add(northMesh);

    const southMesh = new THREE.Mesh(magnetBarGeo, southMat);
    southMesh.position.x = -1.25;
    magnetGroup.add(southMesh);

    // Curved Magnetic Field Loops (North to South)
    for (let m = 1; m <= 4; m++) {
      const fieldCurvePointsTop: THREE.Vector3[] = [];
      const fieldCurvePointsBottom: THREE.Vector3[] = [];
      const steps = 40;
      const height = m * 1.6;
      const width = 3.5 + m * 1.2;

      for (let s = 0; s <= steps; s++) {
        const theta = (s / steps) * Math.PI;
        const px = Math.cos(theta) * width;
        const py = Math.sin(theta) * height;
        fieldCurvePointsTop.push(new THREE.Vector3(px, py, 0));
        fieldCurvePointsBottom.push(new THREE.Vector3(px, -py, 0));
      }

      const topGeo = new THREE.BufferGeometry().setFromPoints(fieldCurvePointsTop);
      const bottomGeo = new THREE.BufferGeometry().setFromPoints(fieldCurvePointsBottom);
      const fieldMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });

      magnetGroup.add(new THREE.Line(topGeo, fieldMat));
      magnetGroup.add(new THREE.Line(bottomGeo, fieldMat));
    }

    // --- Interactive Mouse Drag Orbit ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for tablets / mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseX;
      const dy = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      targetRotY += dx * 0.01;
      targetRotX += dy * 0.01;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // --- Resize Observer ---
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const currentSpeed = isPausedRef.current ? 0 : speedRef.current;
      const currentMode = modeRef.current;

      // Toggle group visibilities
      atomGroup.visible = currentMode === "atom";
      prismGroup.visible = currentMode === "prism";
      magnetGroup.visible = currentMode === "magnet";

      // Smooth manual drag rotation
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.1;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.1;

      // Ambient idle rotation when not dragging
      if (!isDragging && !isPausedRef.current) {
        targetRotY += 0.003 * currentSpeed;
      }

      // Mode-specific animations
      if (currentMode === "atom") {
        nucleusGroup.rotation.y += 0.01 * currentSpeed;
        nucleusGroup.rotation.z += 0.007 * currentSpeed;

        rings.forEach((ring, rIdx) => {
          const time = clock.getElapsedTime() * ring.speed * currentSpeed;
          ring.electrons.forEach((eMesh, eIdx) => {
            const phase = (eIdx / ring.electronCount) * Math.PI * 2;
            const angle = time + phase;

            // Compute 3D position along tilted elliptical orbit
            const rawX = Math.cos(angle) * ring.radius;
            const rawY = Math.sin(angle) * ring.radius;

            const pos = new THREE.Vector3(rawX, rawY, 0);
            pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), ring.tiltX);
            pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), ring.tiltY);

            eMesh.position.copy(pos);
          });
        });
      } else if (currentMode === "prism") {
        prismMesh.rotation.y += 0.004 * currentSpeed;
      } else if (currentMode === "magnet") {
        magnetGroup.rotation.z = Math.sin(clock.getElapsedTime() * 0.8 * currentSpeed) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-slate-950/90 to-black shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Top Holographic Header & Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
            3D WebGL STEM Apparatus
          </span>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMode("atom")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              mode === "atom"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            ⚛️ Bohr Atom Shells
          </button>
          <button
            type="button"
            onClick={() => setMode("prism")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              mode === "prism"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            💎 Light Prism (VIBGYOR)
          </button>
          <button
            type="button"
            onClick={() => setMode("magnet")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              mode === "magnet"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            🧲 Magnetic Field Loops
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-[360px] sm:h-[420px] md:h-[480px] cursor-grab active:cursor-grabbing"
      />

      {/* Holographic Laser Scanner Overlay Line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_15px_#06b6d4] animate-pulse" />
      </div>

      {/* Bottom Information HUD & Drag Hint */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none bg-slate-950/60 px-3 py-1.5 rounded-xl border border-white/5 backdrop-blur-md">
        <span className="flex items-center gap-1.5">
          <span className="text-cyan-400">🖱️</span>
          <span>Click & Drag to Orbit 3D Space</span>
        </span>
        <span className="font-mono text-cyan-300/80">
          {mode === "atom" && "Bohr Model: K(2) L(8) M(1) Electron Configuration"}
          {mode === "prism" && "Refraction & Dispersion: White Light → VIBGYOR Spectrum"}
          {mode === "magnet" && "Magnetic Dipole: Vector Field Loops North → South"}
        </span>
      </div>
    </div>
  );
}
