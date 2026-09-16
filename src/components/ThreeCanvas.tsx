"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 1. Interactive 3D Particle Field (Knowledge Nodes)
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Jewel tone color palette for Class 10 subjects (Emerald, Indigo, Amber, Rose)
    const subjectColors = [
      new THREE.Color("#10B981"), // Science (Emerald)
      new THREE.Color("#6366F1"), // Mathematics (Indigo)
      new THREE.Color("#F59E0B"), // Social Science (Amber)
      new THREE.Color("#EC4899"), // English (Rose)
      new THREE.Color("#8B5CF6"), // AI (Violet)
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const col = subjectColors[i % subjectColors.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle sprite
    const pMaterial = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 2. Floating 3D Geometric Mesh (Math/Science Icosahedron)
    const icoGeometry = new THREE.IcosahedronGeometry(4.2, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#4F46E5"),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(14, -6, -5);
    scene.add(icosahedron);

    // 3. Second floating Torus (Planetary Orbit / Magnetic Field)
    const torusGeometry = new THREE.TorusGeometry(3.5, 0.4, 8, 24);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#10B981"),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-16, 8, -8);
    scene.add(torus);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera parallax
      targetX += (mouseX * 2.5 - targetX) * 0.04;
      targetY += (-mouseY * 2.0 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Gentle rotation of 3D objects
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      icosahedron.rotation.x += 0.003;
      icosahedron.rotation.y += 0.004;

      torus.rotation.x += 0.002;
      torus.rotation.z += 0.003;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      pMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-85 dark:opacity-60"
      aria-hidden="true"
    />
  );
}
