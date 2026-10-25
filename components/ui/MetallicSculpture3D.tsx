"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface MetallicSculpture3DProps {
  className?: string;
}

export function MetallicSculpture3D({
  className,
}: MetallicSculpture3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    // WebGL fallback
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    // --------------------------------------------------
    // SCENE AND CAMERA
    // --------------------------------------------------

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 9.6);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.background = "transparent";

    container.appendChild(renderer.domElement);

    // --------------------------------------------------
    // BACKGROUND STARFIELD
    // Stays independent from the rotating sculpture.
    // --------------------------------------------------

    const starCount = 260;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSeeds: number[] = [];

    const goldColor = new THREE.Color(0xc6a76a);
    const ivoryColor = new THREE.Color(0xf2ebdd);

    for (let i = 0; i < starCount; i++) {
      let x = 0;
      let y = 0;

      // Keep the central region relatively clean so
      // the metallic sculpture remains the focal point.
      do {
        x = (Math.random() - 0.5) * 10.5;
        y = (Math.random() - 0.5) * 7.5;
      } while (x * x + y * y < 3.8);

      const z = -1.5 - Math.random() * 4.5;

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      const color = Math.random() > 0.7 ? ivoryColor : goldColor;
      const variation = 0.55 + Math.random() * 0.45;

      starColors[i * 3] = color.r * variation;
      starColors[i * 3 + 1] = color.g * variation;
      starColors[i * 3 + 2] = color.b * variation;

      starSeeds.push(Math.random() * Math.PI * 2);
    }

    const starGeometry = new THREE.BufferGeometry();

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );

    starGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColors, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // A smaller layer of brighter stars
    const brightStarCount = 36;
    const brightPositions = new Float32Array(brightStarCount * 3);

    for (let i = 0; i < brightStarCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.3 + Math.random() * 3.1;

      brightPositions[i * 3] = Math.cos(angle) * radius;
      brightPositions[i * 3 + 1] =
        Math.sin(angle) * radius * 0.72;
      brightPositions[i * 3 + 2] = -1.8 - Math.random() * 2.5;
    }

    const brightGeometry = new THREE.BufferGeometry();

    brightGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(brightPositions, 3),
    );

    const brightMaterial = new THREE.PointsMaterial({
      color: 0xf2ebdd,
      size: 0.043,
      transparent: true,
      opacity: 0.78,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const brightStars = new THREE.Points(
      brightGeometry,
      brightMaterial,
    );

    scene.add(brightStars);

    // --------------------------------------------------
    // CELESTIAL SPARKLES
    // Tiny cross-shaped glints for a refined starfield.
    // --------------------------------------------------

    const sparkleVertices: number[] = [];

    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 2.5;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.7;
      const z = -2.0 - Math.random() * 2.0;
      const size = 0.035 + Math.random() * 0.035;

      // Horizontal line
      sparkleVertices.push(
        x - size, y, z,
        x + size, y, z,
      );

      // Vertical line
      sparkleVertices.push(
        x, y - size, z,
        x, y + size, z,
      );
    }

    const sparkleGeometry = new THREE.BufferGeometry();

    sparkleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(sparkleVertices, 3),
    );

    const sparkleMaterial = new THREE.LineBasicMaterial({
      color: 0xc6a76a,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    const sparkles = new THREE.LineSegments(
      sparkleGeometry,
      sparkleMaterial,
    );

    scene.add(sparkles);

    // --------------------------------------------------
    // DISTANT GOLDEN DUST
    // --------------------------------------------------

    const dustCount = 90;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSeeds: {
      x: number;
      y: number;
      z: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < dustCount; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 6;
      const z = -0.8 - Math.random() * 3;

      dustPositions[i * 3] = x;
      dustPositions[i * 3 + 1] = y;
      dustPositions[i * 3 + 2] = z;

      dustSeeds.push({
        x,
        y,
        z,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const dustGeometry = new THREE.BufferGeometry();

    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );

    const dustMaterial = new THREE.PointsMaterial({
      color: 0xc6a76a,
      size: 0.018,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // --------------------------------------------------
    // SCULPTURE ASSEMBLY
    // --------------------------------------------------

    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // The knot rotates independently from the assembly.
    const knotGroup = new THREE.Group();
    sculptureGroup.add(knotGroup);

    // Champagne gold
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc6a76a,
      metalness: 0.94,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.2,
    });

    const ivoryMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2ebdd,
      metalness: 0.88,
      roughness: 0.24,
    });

    const darkGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0x806335,
      metalness: 0.95,
      roughness: 0.28,
    });

    // Main torus knot
    const knotGeometry = new THREE.TorusKnotGeometry(
      1.2,
      0.32,
      240,
      36,
      2,
      3,
    );

    const knot = new THREE.Mesh(knotGeometry, goldMaterial);
    knotGroup.add(knot);

    // --------------------------------------------------
    // TIGHT ORBITAL RINGS
    // --------------------------------------------------

    const ringGeometry1 = new THREE.TorusGeometry(
      1.58,
      0.007,
      12,
      200,
    );

    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xc6a76a,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
    ring1.rotation.set(Math.PI / 3, 0.2, 0.1);
    sculptureGroup.add(ring1);

    const ringGeometry2 = new THREE.TorusGeometry(
      1.74,
      0.0055,
      12,
      200,
    );

    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xf2ebdd,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });

    const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ring2.rotation.set(-Math.PI / 6, Math.PI / 4, 0);
    sculptureGroup.add(ring2);

    // --------------------------------------------------
    // METALLIC SATELLITES
    // --------------------------------------------------

    const satelliteGeometry = new THREE.SphereGeometry(
      0.032,
      20,
      20,
    );

    const satellites: THREE.Mesh[] = [];

    for (let i = 0; i < 4; i++) {
      const satellite = new THREE.Mesh(
        satelliteGeometry,
        i % 2 === 0 ? ivoryMaterial : darkGoldMaterial,
      );

      const angle = (i / 4) * Math.PI * 2;

      satellite.position.set(
        Math.cos(angle) * 1.58,
        Math.sin(angle) * 1.35,
        Math.sin(angle * 2) * 0.35,
      );

      sculptureGroup.add(satellite);
      satellites.push(satellite);
    }

    // --------------------------------------------------
    // SUBTLE LIGHTING
    // --------------------------------------------------

    scene.add(new THREE.AmbientLight(0xf2ebdd, 0.8));

    const keyLight = new THREE.DirectionalLight(0xfff1d4, 3.5);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc6a76a, 4);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    const sideLight = new THREE.DirectionalLight(0xf2ebdd, 1.5);
    sideLight.position.set(-4, -2, 3);
    scene.add(sideLight);

    const fillLight = new THREE.PointLight(0xc6a76a, 18, 14);
    fillLight.position.set(0, -3, 4);
    scene.add(fillLight);

    // --------------------------------------------------
    // INTERACTION
    // --------------------------------------------------

    let pointerX = 0;
    let pointerY = 0;

    let dragRotationX = 0;
    let dragRotationY = 0;

    let dragVelocityX = 0;
    let dragVelocityY = 0;

    let isDragging = false;
    let previousX = 0;
    let previousY = 0;

    let hasPointer = false;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      isDragging = true;
      previousX = event.clientX;
      previousY = event.clientY;

      dragVelocityX = 0;
      dragVelocityY = 0;

      try {
        container.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture may be unavailable in some environments.
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      hasPointer = true;

      if (isDragging) {
        const deltaX = event.clientX - previousX;
        const deltaY = event.clientY - previousY;

        dragRotationY += deltaX * 0.009;
        dragRotationX += deltaY * 0.009;

        dragRotationX = clamp(
          dragRotationX,
          -Math.PI / 2,
          Math.PI / 2,
        );

        dragVelocityX = deltaX * 0.009;
        dragVelocityY = deltaY * 0.009;

        previousX = event.clientX;
        previousY = event.clientY;
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      isDragging = false;

      try {
        if (container.hasPointerCapture(event.pointerId)) {
          container.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Safe cleanup.
      }
    };

    const onPointerLeave = () => {
      if (!isDragging) hasPointer = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);

    // --------------------------------------------------
    // RESPONSIVE SIZING
    // --------------------------------------------------

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    // --------------------------------------------------
    // ANIMATION
    // --------------------------------------------------

    const clock = new THREE.Clock();

    let animationFrameId = 0;
    let disposed = false;

    const animate = () => {
      if (disposed) return;

      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const deltaFactor = delta * 60; // Frame-rate independent scaling
      const elapsed = clock.getElapsedTime();
      const reducedMotion = reducedMotionQuery.matches;

      if (!reducedMotion) {
        // Organic floating motion
        sculptureGroup.position.y = Math.sin(elapsed * 0.65) * 0.06;
        sculptureGroup.position.x = Math.sin(elapsed * 0.35) * 0.02;

        sculptureGroup.rotation.y = elapsed * 0.08;
        sculptureGroup.rotation.z = Math.sin(elapsed * 0.3) * 0.025;

        // Knot inertia and continuous rotation (fluid 60/120/144Hz damping)
        if (!isDragging) {
          dragRotationY += dragVelocityX * deltaFactor;
          dragRotationX += dragVelocityY * deltaFactor;

          const decay = Math.pow(0.95, deltaFactor);
          dragVelocityX *= decay;
          dragVelocityY *= decay;

          dragRotationY += 0.0025 * deltaFactor;
        }

        // Independent orbital movement
        ring1.rotation.z += 0.002 * deltaFactor;
        ring2.rotation.y -= 0.0015 * deltaFactor;

        // Satellite movement
        satellites.forEach((satellite, index) => {
          const angle =
            elapsed * 0.25 +
            (index / satellites.length) * Math.PI * 2;

          satellite.position.y = Math.sin(angle) * 1.35;
          satellite.position.z = Math.sin(angle * 1.4) * 0.35;
        });

        // Twinkling background stars
        starMaterial.opacity =
          0.57 + (Math.sin(elapsed * 0.8) + 1) * 0.09;

        brightMaterial.opacity =
          0.62 + (Math.sin(elapsed * 1.15) + 1) * 0.16;

        sparkleMaterial.opacity =
          0.32 + (Math.sin(elapsed * 0.7) + 1) * 0.15;

        // Slowly drifting dust
        const positions = dustGeometry.attributes.position
          .array as Float32Array;

        for (let i = 0; i < dustCount; i++) {
          const seed = dustSeeds[i];

          positions[i * 3] =
            seed.x + Math.sin(elapsed * 0.25 + seed.phase) * 0.02;

          positions[i * 3 + 1] =
            seed.y + Math.cos(elapsed * 0.2 + seed.phase) * 0.02;

          positions[i * 3 + 2] = seed.z;
        }

        dustGeometry.attributes.position.needsUpdate = true;
      }

      // Background layers stay independent from the sculpture.
      stars.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 0.04) * 0.015;
      brightStars.rotation.z = reducedMotion
        ? 0
        : -Math.sin(elapsed * 0.035) * 0.02;

      // Mouse-following tilt
      const targetTiltY = hasPointer ? pointerX * 0.35 : 0;
      const targetTiltX = hasPointer ? pointerY * 0.25 : 0;

      currentTiltY += (targetTiltY - currentTiltY) * 0.05;
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;

      knotGroup.rotation.y = dragRotationY + currentTiltY;
      knotGroup.rotation.x = dragRotationX + currentTiltX;

      renderer.render(scene, camera);
    };

    // Initial dimensions
    const initialWidth = container.clientWidth;
    const initialHeight = container.clientHeight;

    if (initialWidth > 0 && initialHeight > 0) {
      camera.aspect = initialWidth / initialHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(initialWidth, initialHeight);
      renderer.render(scene, camera);
    }

    animate();

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      disposed = true;

      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);

      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.LineSegments
        ) {
          geometries.add(object.geometry);

          const objectMaterials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          objectMaterials.forEach((material) => {
            materials.add(material);
          });
        }
      });

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        className,
      )}
      aria-hidden="true"
    >
      {/* Diffused gold atmosphere, not a visible panel */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[65%] w-[65%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#C6A76A]/[0.06]
          blur-[100px]
        "
      />

      {/* Interactive transparent Three.js scene */}
      <div
        ref={containerRef}
        className="
          pointer-events-auto absolute inset-0
          h-full w-full
          cursor-grab active:cursor-grabbing
          touch-none
        "
      />
    </div>
  );
}