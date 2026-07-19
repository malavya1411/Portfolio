"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ORANGE = 0xf36f2e;
const DARK = 0x17130f;

function makeBuildTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  context.fillStyle = "#f36f2e";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#17130f";
  context.font = "900 62px Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("BUILD", 128, 68);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function BuildMascot3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.25, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const robot = new THREE.Group();
    const upper = new THREE.Group();
    robot.add(upper);
    scene.add(robot);

    const orange = new THREE.MeshStandardMaterial({ color: ORANGE, roughness: 0.38, metalness: 0.14 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xfff9ed, roughness: 0.55 });
    const dark = new THREE.MeshStandardMaterial({ color: DARK, roughness: 0.28, metalness: 0.5 });
    const eye = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x5b5b5b, emissiveIntensity: 0.25 });
    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, position: [number, number, number], parent = robot) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      parent.add(mesh);
      return mesh;
    };

    // Main body, face housing, and the inset chest label.
    add(new THREE.BoxGeometry(2.45, 2.05, 1.12), orange, [0, -0.55, 0]);
    add(new THREE.BoxGeometry(1.72, 1.52, 0.22), cream, [0, 0.55, 0.61], upper);
    add(new THREE.CylinderGeometry(0.56, 0.56, 0.12, 48), dark, [0, 0.55, 0.77], upper).rotation.x = Math.PI / 2;
    const leftEye = add(new THREE.CapsuleGeometry(0.095, 0.22, 6, 12), eye, [-0.19, 0.57, 0.87], upper);
    const rightEye = add(new THREE.CapsuleGeometry(0.095, 0.22, 6, 12), eye, [0.19, 0.57, 0.87], upper);
    leftEye.rotation.z = Math.PI / 2;
    rightEye.rotation.z = Math.PI / 2;

    const label = add(new THREE.PlaneGeometry(1.15, 0.48), new THREE.MeshBasicMaterial({ map: makeBuildTexture() }), [0, -0.55, 0.69]);
    label.rotation.x = 0;
    add(new THREE.BoxGeometry(1.33, 0.66, 0.12), dark, [0, -0.55, 0.63]);
    label.position.z = 0.7;

    // Antenna, side ear, articulated arms, and spring-like legs give each part real depth.
    add(new THREE.BoxGeometry(0.24, 0.72, 0.24), orange, [-0.78, 1.65, 0], upper);
    add(new THREE.SphereGeometry(0.21, 24, 16), orange, [-0.78, 1.27, 0.02], upper);
    add(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 32), dark, [1.35, 0.55, 0], upper).rotation.z = Math.PI / 2;

    [-1, 1].forEach((side) => {
      const arm = new THREE.Group();
      arm.position.set(side * 1.47, -0.25, 0);
      arm.rotation.z = side * -0.28;
      robot.add(arm);
      add(new THREE.SphereGeometry(0.23, 24, 16), cream, [0, 0, 0], arm);
      add(new THREE.CylinderGeometry(0.16, 0.16, 0.7, 20), dark, [side * 0.25, -0.26, 0], arm).rotation.z = Math.PI / 2.6;
      add(new THREE.SphereGeometry(0.22, 24, 16), cream, [side * 0.48, -0.52, 0], arm);
      add(new THREE.BoxGeometry(0.36, 0.26, 0.46), dark, [side * 0.58, -0.72, 0], arm);

      add(new THREE.SphereGeometry(0.18, 24, 16), cream, [side * 0.57, -1.66, 0]);
      const shin = add(new THREE.CylinderGeometry(0.17, 0.2, 0.62, 18), dark, [side * 0.57, -2.02, 0]);
      shin.rotation.z = side * 0.09;
      add(new THREE.BoxGeometry(0.62, 0.2, 0.7), dark, [side * 0.57, -2.42, 0.18]);
    });

    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(3, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffc5a9, 1.3);
    fill.position.set(-4, 1, 4);
    scene.add(fill, new THREE.HemisphereLight(0xd8ecff, 0xffe5d8, 2.1));

    const target = new THREE.Vector2();
    const current = new THREE.Vector2();
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const move = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      target.set(
        THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1),
        THREE.MathUtils.clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1),
      );
    };
    const leave = () => target.set(0, 0);
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!reducedMotion) {
        current.lerp(target, 0.075);
        robot.rotation.y = THREE.MathUtils.lerp(robot.rotation.y, current.x * 0.42, 0.09);
        robot.rotation.x = THREE.MathUtils.lerp(robot.rotation.x, -current.y * 0.2, 0.09);
        robot.position.y = Math.sin(performance.now() * 0.0015) * 0.09;
        upper.rotation.y = current.x * 0.12;
        key.position.x = 3 + current.x * 2;
        key.position.y = 5 - current.y;
      }
      renderer.render(scene, camera);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    mount.addEventListener("pointermove", move, { passive: true });
    mount.addEventListener("pointerleave", leave, { passive: true });
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mount.removeEventListener("pointermove", move);
      mount.removeEventListener("pointerleave", leave);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const material = object.material;
        (Array.isArray(material) ? material : [material]).forEach((item) => item.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="build-mascot-3d" role="img" aria-label="An interactive 3D BUILD robot mascot" />;
}
