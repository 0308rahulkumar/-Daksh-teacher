"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThemePalette {
  primary: THREE.Color;
  secondary: THREE.Color;
  tertiary: THREE.Color;
  gridColor: THREE.Color;
}

const PALETTES: Record<string, ThemePalette> = {
  obsidian: {
    primary: new THREE.Color("#F59E0B"), // Amber Gold
    secondary: new THREE.Color("#FB923C"), // Warm Flame
    tertiary: new THREE.Color("#D97706"), // Deep Gold
    gridColor: new THREE.Color("#D97706"),
  },
  kage: {
    primary: new THREE.Color("#E0231C"), // Kage Crimson
    secondary: new THREE.Color("#FF4D4D"), // Neon Vermilion
    tertiary: new THREE.Color("#C9A24A"), // Imperial Gold
    gridColor: new THREE.Color("#DC2626"),
  },
  "field-manuals": {
    primary: new THREE.Color("#C3A47B"), // Antique Brass
    secondary: new THREE.Color("#EADFC7"), // Warm Parchment
    tertiary: new THREE.Color("#9A7B4F"), // Vintage Leather
    gridColor: new THREE.Color("#B48A54"),
  },
  cyberpunk: {
    primary: new THREE.Color("#8B5CF6"), // Electric Violet
    secondary: new THREE.Color("#06B6D4"), // Cyber Cyan
    tertiary: new THREE.Color("#EC4899"), // Neon Magenta
    gridColor: new THREE.Color("#7C3AED"),
  },
  matrix: {
    primary: new THREE.Color("#10B981"), // Terminal Emerald
    secondary: new THREE.Color("#34D399"), // Spring Green
    tertiary: new THREE.Color("#059669"), // Deep Code Green
    gridColor: new THREE.Color("#059669"),
  },
};

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b0e, 0.016);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 26);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- Texture for Glowing Circular Nodes ---
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.25, "rgba(255, 255, 255, 0.9)");
      grad.addColorStop(0.6, "rgba(255, 255, 255, 0.35)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const nodeTexture = new THREE.CanvasTexture(canvas);

    // --- Active Palette State ---
    const getActiveThemeId = (): string => {
      if (typeof document !== "undefined") {
        const theme = document.documentElement.getAttribute("data-theme");
        if (theme && PALETTES[theme]) return theme;
      }
      return "obsidian";
    };

    let currentThemeId = getActiveThemeId();
    let currentPalette = { ...PALETTES[currentThemeId] };
    let targetPalette = { ...PALETTES[currentThemeId] };

    // --- Background Vibe Mode State ---
    let bgMode = (typeof localStorage !== "undefined" && localStorage.getItem("daksh-bg-mode")) || "constellation";

    // --- 1. NEURAL CONSTELLATION NODES ---
    const PARTICLE_COUNT = 160;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pVelocities: { x: number; y: number; z: number; ox: number; oy: number; oz: number }[] = [];
    const pColors = new Float32Array(PARTICLE_COUNT * 3);

    const spreadX = 48;
    const spreadY = 32;
    const spreadZ = 20;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY + 1;
      const z = (Math.random() - 0.5) * spreadZ;

      pPositions[i * 3] = x;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = z;

      pVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.015,
        ox: x,
        oy: y,
        oz: z,
      });

      const col = i % 3 === 0 ? currentPalette.primary : i % 3 === 1 ? currentPalette.secondary : currentPalette.tertiary;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    pGeometry.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeometry.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: nodeTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    // --- 2. DYNAMIC CONSTELLATION LASER CONNECTIONS ---
    const MAX_LINES = 360;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors = new Float32Array(MAX_LINES * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(linePositions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    const colAttr = new THREE.BufferAttribute(lineColors, 3);
    colAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute("position", posAttr);
    lineGeometry.setAttribute("color", colAttr);

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // --- 3. RETRO-CYBER HORIZON GRID (Undulating Synthwave Wave) ---
    const gridSegmentsX = 32;
    const gridSegmentsY = 20;
    const gridGeometry = new THREE.PlaneGeometry(72, 44, gridSegmentsX, gridSegmentsY);
    gridGeometry.rotateX(-Math.PI / 2.2);
    gridGeometry.translate(0, -10, -2);

    let gridWireframe = new THREE.WireframeGeometry(gridGeometry);
    const gridMaterial = new THREE.LineBasicMaterial({
      color: currentPalette.gridColor,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const gridMesh = new THREE.LineSegments(gridWireframe, gridMaterial);
    scene.add(gridMesh);

    const gridPosAttr = gridGeometry.attributes.position;
    const gridOrigY = new Float32Array(gridPosAttr.count);
    for (let i = 0; i < gridPosAttr.count; i++) {
      gridOrigY[i] = gridPosAttr.getY(i);
    }

    // --- 4. FLOATING STUDY CODING EMBERS ---
    const DUST_COUNT = 80;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 55;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.75,
      map: nodeTexture,
      color: currentPalette.primary,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);

    // --- 5. INTERACTIVE CLICK SHOCKWAVES ---
    interface Shockwave {
      x: number;
      y: number;
      z: number;
      radius: number;
      maxRadius: number;
      strength: number;
    }
    const shockwaves: Shockwave[] = [];

    // --- Mouse & Touch Coordinates in 3D Space ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 1.5;
    const mouse3D = new THREE.Vector3(0, 0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseX = normX * 2.2;
      mouseY = normY * 1.8;
      mouse3D.set(normX * 20, normY * 14, 2);
    };

    const handlePointerDown = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      shockwaves.push({
        x: normX * 20,
        y: normY * 14,
        z: 2,
        radius: 0.5,
        maxRadius: 18,
        strength: 0.65,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // --- Theme & Mode Listeners ---
    const updateThemeFromDOM = () => {
      const themeId = getActiveThemeId();
      if (PALETTES[themeId]) {
        targetPalette = { ...PALETTES[themeId] };
        currentThemeId = themeId;
      }
    };

    const handleCustomThemeChange = (e: Event) => {
      const customTheme = (e as CustomEvent).detail;
      if (PALETTES[customTheme]) {
        targetPalette = { ...PALETTES[customTheme] };
        currentThemeId = customTheme;
      }
    };

    const handleBgModeChange = (e: Event) => {
      bgMode = (e as CustomEvent).detail;
    };

    window.addEventListener("daksh-theme-changed", handleCustomThemeChange);
    window.addEventListener("daksh-bg-mode-changed", handleBgModeChange);

    const observer = new MutationObserver(() => {
      updateThemeFromDOM();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Main Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const CONNECTION_DIST = 5.2;
    const MOUSE_CONNECT_DIST = 7.0;
    const MOUSE_REPEL_RADIUS = 4.8;

    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      frameCount++;

      // Smooth color lerp towards target theme palette
      currentPalette.primary.lerp(targetPalette.primary, 0.05);
      currentPalette.secondary.lerp(targetPalette.secondary, 0.05);
      currentPalette.tertiary.lerp(targetPalette.tertiary, 0.05);
      currentPalette.gridColor.lerp(targetPalette.gridColor, 0.05);

      gridMaterial.color.copy(currentPalette.gridColor);
      dustMaterial.color.copy(currentPalette.primary);

      // Visibility adjustments based on bgMode
      if (bgMode === "cybergrid") {
        gridMaterial.opacity = 0.55;
        pMaterial.opacity = 0.5;
        lineMaterial.opacity = 0.3;
      } else if (bgMode === "embers") {
        gridMaterial.opacity = 0.1;
        pMaterial.opacity = 0.98;
        lineMaterial.opacity = 0.15;
      } else {
        // default constellation
        gridMaterial.opacity = 0.3;
        pMaterial.opacity = 0.95;
        lineMaterial.opacity = 0.55;
      }

      // Smooth Camera Parallax
      targetCameraX += (mouseX - targetCameraX) * 0.035;
      targetCameraY += (1.5 + mouseY - targetCameraY) * 0.035;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // Expand and apply shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 0.45;
        sw.strength *= 0.96;
        if (sw.radius > sw.maxRadius || sw.strength < 0.02) {
          shockwaves.splice(s, 1);
        }
      }

      // Update Node positions, Mouse Physics & Shockwaves
      const positions = pGeometry.attributes.position.array as Float32Array;
      const colors = pGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const vel = pVelocities[i];

        positions[idx] += vel.x;
        positions[idx + 1] += vel.y;
        positions[idx + 2] += vel.z;

        // Soft bounding elastic envelope
        if (Math.abs(positions[idx] - vel.ox) > 4.5) vel.x *= -1;
        if (Math.abs(positions[idx + 1] - vel.oy) > 3.8) vel.y *= -1;
        if (Math.abs(positions[idx + 2] - vel.oz) > 3.0) vel.z *= -1;

        // Mouse elastic repulsion
        const dx = positions[idx] - mouse3D.x;
        const dy = positions[idx + 1] - mouse3D.y;
        const dz = positions[idx + 2] - mouse3D.z;
        const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distToMouse < MOUSE_REPEL_RADIUS && distToMouse > 0.01) {
          const force = (1 - distToMouse / MOUSE_REPEL_RADIUS) * 0.035;
          positions[idx] += (dx / distToMouse) * force;
          positions[idx + 1] += (dy / distToMouse) * force;
        }

        // Apply expanding click shockwaves
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = positions[idx] - sw.x;
          const sdy = positions[idx + 1] - sw.y;
          const sdz = positions[idx + 2] - sw.z;
          const sDist = Math.sqrt(sdx * sdx + sdy * sdy + sdz * sdz);
          const ringDist = Math.abs(sDist - sw.radius);

          if (ringDist < 2.5 && sDist > 0.01) {
            const shockForce = (1 - ringDist / 2.5) * sw.strength * 0.08;
            positions[idx] += (sdx / sDist) * shockForce;
            positions[idx + 1] += (sdy / sDist) * shockForce;
            positions[idx + 2] += (sdz / sDist) * shockForce;
          }
        }

        const col = i % 3 === 0 ? currentPalette.primary : i % 3 === 1 ? currentPalette.secondary : currentPalette.tertiary;
        colors[idx] += (col.r - colors[idx]) * 0.05;
        colors[idx + 1] += (col.g - colors[idx + 1]) * 0.05;
        colors[idx + 2] += (col.b - colors[idx + 2]) * 0.05;
      }
      pGeometry.attributes.position.needsUpdate = true;
      pGeometry.attributes.color.needsUpdate = true;

      // Dynamic Constellation Connections
      let lineIndex = 0;
      const lPositions = lineGeometry.attributes.position.array as Float32Array;
      const lColors = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT && lineIndex < MAX_LINES - 12; i++) {
        const i3 = i * 3;
        const xi = positions[i3];
        const yi = positions[i3 + 1];
        const zi = positions[i3 + 2];

        for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < MAX_LINES - 12; j++) {
          const j3 = j * 3;
          const xj = positions[j3];
          const yj = positions[j3 + 1];
          const zj = positions[j3 + 2];

          const d = Math.sqrt((xi - xj) ** 2 + (yi - yj) ** 2 + (zi - zj) ** 2);
          if (d < CONNECTION_DIST) {
            const alpha = 1 - d / CONNECTION_DIST;
            const lIdx = lineIndex * 6;

            lPositions[lIdx] = xi;
            lPositions[lIdx + 1] = yi;
            lPositions[lIdx + 2] = zi;
            lPositions[lIdx + 3] = xj;
            lPositions[lIdx + 4] = yj;
            lPositions[lIdx + 5] = zj;

            const c = currentPalette.primary;
            lColors[lIdx] = c.r * alpha;
            lColors[lIdx + 1] = c.g * alpha;
            lColors[lIdx + 2] = c.b * alpha;
            lColors[lIdx + 3] = c.r * alpha;
            lColors[lIdx + 4] = c.g * alpha;
            lColors[lIdx + 5] = c.b * alpha;

            lineIndex++;
          }
        }

        // Connect node to cursor if close
        const dMouse = Math.sqrt((xi - mouse3D.x) ** 2 + (yi - mouse3D.y) ** 2 + (zi - mouse3D.z) ** 2);
        if (dMouse < MOUSE_CONNECT_DIST && lineIndex < MAX_LINES) {
          const alpha = (1 - dMouse / MOUSE_CONNECT_DIST) * 1.1;
          const lIdx = lineIndex * 6;

          lPositions[lIdx] = xi;
          lPositions[lIdx + 1] = yi;
          lPositions[lIdx + 2] = zi;
          lPositions[lIdx + 3] = mouse3D.x;
          lPositions[lIdx + 4] = mouse3D.y;
          lPositions[lIdx + 5] = mouse3D.z;

          const c = currentPalette.secondary;
          lColors[lIdx] = c.r * alpha;
          lColors[lIdx + 1] = c.g * alpha;
          lColors[lIdx + 2] = c.b * alpha;
          lColors[lIdx + 3] = c.r * alpha;
          lColors[lIdx + 4] = c.g * alpha;
          lColors[lIdx + 5] = c.b * alpha;

          lineIndex++;
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Cyber Grid Undulation every other frame
      if (frameCount % 2 === 0) {
        const gridPositions = gridGeometry.attributes.position;
        for (let i = 0; i < gridPositions.count; i++) {
          const gx = gridPositions.getX(i);
          const gz = gridPositions.getZ(i);
          const wave = Math.sin(gx * 0.14 + elapsedTime * 0.8) * Math.cos(gz * 0.16 + elapsedTime * 0.6) * 0.75;
          gridPositions.setY(i, gridOrigY[i] + wave);
        }
        gridPositions.needsUpdate = true;
        gridWireframe.dispose();
        gridWireframe = new THREE.WireframeGeometry(gridGeometry);
        gridMesh.geometry = gridWireframe;
      }

      // Slow ambient drift
      dustParticles.rotation.y = elapsedTime * 0.015;
      dustParticles.rotation.x = elapsedTime * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("daksh-theme-changed", handleCustomThemeChange);
      window.removeEventListener("daksh-bg-mode-changed", handleBgModeChange);
      observer.disconnect();

      pGeometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      gridGeometry.dispose();
      gridWireframe.dispose();
      gridMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      nodeTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
}
