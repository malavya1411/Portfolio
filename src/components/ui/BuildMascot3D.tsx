"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const ORANGE = 0xe8774b;

function makeBuildTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 150;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  context.fillStyle = "#d8d0c7";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#7c7168";
  context.lineWidth = 9;
  context.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
  context.fillStyle = "#1a1a1a";
  context.font = "900 66px Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("BUILD", canvas.width / 2, canvas.height / 2 + 5);
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
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    // A slightly low, fixed point of view gives the small mascot a little presence.
    camera.position.set(0, -0.05, 9);
    camera.lookAt(0, -0.45, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const robot = new THREE.Group();
    const torso = new THREE.Group();
    const head = new THREE.Group();
    const antenna = new THREE.Group();
    const leftArm = new THREE.Group();
    const rightArm = new THREE.Group();
    robot.add(torso, head, antenna, leftArm, rightArm);
    scene.add(robot);

    const orange = new THREE.MeshPhysicalMaterial({ color: ORANGE, roughness: 0.28, metalness: 0.05, clearcoat: 0.4, clearcoatRoughness: 0.3 });
    const orangeAccent = new THREE.MeshStandardMaterial({ color: 0xc94c2e, roughness: 0.38, metalness: 0.12 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xfff9ed, roughness: 0.45, metalness: 0.06 });
    const joint = new THREE.MeshStandardMaterial({ color: 0x2d2d2d, roughness: 0.3, metalness: 0.6 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x101010, roughness: 0.1, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.05 });
    const eye = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.25, roughness: 0.25 });
    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, position: [number, number, number], parent: THREE.Group = robot) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // A softly bevelled, vinyl-toy silhouette: body sits behind the face and chest plate.
    torso.position.y = -0.72;
    add(new RoundedBoxGeometry(2.42, 1.85, 1.12, 8, 0.38), orange, [0, 0, 0], torso);
    add(new THREE.SphereGeometry(1.05, 32, 20), orangeAccent, [0, -0.28, -0.08], torso).scale.set(1, 0.55, 0.72);
    add(new RoundedBoxGeometry(1.2, 0.57, 0.09, 4, 0.1), joint, [0, -0.35, 0.62], torso);
    add(new THREE.PlaneGeometry(1.04, 0.42), new THREE.MeshBasicMaterial({ map: makeBuildTexture() }), [0, -0.35, 0.675], torso);

    head.position.set(0, 0.78, 0.23);
    add(new RoundedBoxGeometry(2.02, 1.7, 1.05, 8, 0.34), cream, [0, 0, 0], head);
    add(new RoundedBoxGeometry(1.62, 1.37, 0.2, 8, 0.44), joint, [0, 0, 0.56], head);
    const face = add(new THREE.SphereGeometry(0.68, 40, 24), glass, [0, 0, 0.68], head);
    face.scale.set(1, 1, 0.22);
    const faceRim = add(new THREE.TorusGeometry(0.69, 0.07, 14, 48), orangeAccent, [0, 0, 0.72], head);
    faceRim.scale.y = 1.02;

    // Separate pupils ride on a subtly curved face, so the character actually looks toward the pointer.
    const leftPupil = add(new THREE.SphereGeometry(0.13, 20, 12), eye, [-0.21, 0, 0.84], head);
    const rightPupil = add(new THREE.SphereGeometry(0.13, 20, 12), eye, [0.21, 0, 0.84], head);
    leftPupil.scale.y = 1.4;
    rightPupil.scale.y = 1.4;

    antenna.position.set(-0.65, 1.8, 0.16);
    add(new THREE.CapsuleGeometry(0.105, 0.55, 8, 16), orange, [0, 0.22, 0], antenna);
    const antennaTip = add(new THREE.SphereGeometry(0.18, 24, 16), orangeAccent, [0, 0.58, 0.03], antenna);
    const tipLight = new THREE.PointLight(0xff7954, 2, 2.5);
    tipLight.position.set(0, 0.58, 0.35);
    antenna.add(tipLight);

    const createArm = (arm: THREE.Group, side: number) => {
      arm.position.set(side * 1.37, -0.47, 0.12);
      add(new THREE.SphereGeometry(0.26, 24, 16), cream, [0, 0, 0], arm);
      const upperArm = add(new THREE.CapsuleGeometry(0.16, 0.43, 8, 16), joint, [side * 0.19, -0.28, 0.03], arm);
      upperArm.rotation.z = side * -0.54;
      add(new THREE.SphereGeometry(0.2, 24, 16), cream, [side * 0.39, -0.56, 0.06], arm);
      const hand = add(new RoundedBoxGeometry(0.42, 0.34, 0.46, 5, 0.13), joint, [side * 0.53, -0.76, 0.1], arm);
      hand.rotation.z = side * -0.16;
    };
    createArm(leftArm, -1);
    createArm(rightArm, 1);

    [-1, 1].forEach((side) => {
      add(new THREE.SphereGeometry(0.19, 24, 16), cream, [side * 0.54, -1.55, -0.08]);
      const calf = add(new THREE.CapsuleGeometry(0.17, 0.44, 8, 16), joint, [side * 0.54, -1.95, -0.1]);
      calf.rotation.z = side * 0.09;
      const foot = add(new RoundedBoxGeometry(0.58, 0.24, 0.72, 5, 0.12), joint, [side * 0.54, -2.36, 0.18]);
      foot.rotation.x = -0.08;
    });

    const key = new THREE.DirectionalLight(0xffffff, 3.1);
    key.position.set(3.5, 4.5, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -5;
    key.shadow.camera.right = 5;
    key.shadow.camera.top = 5;
    key.shadow.camera.bottom = -5;
    const fill = new THREE.DirectionalLight(0xffba99, 1.6);
    fill.position.set(-4, 0.5, 4);
    scene.add(key, fill, new THREE.HemisphereLight(0xd9ebff, 0xffdfcd, 2.3));
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ color: 0x385776, opacity: 0.18 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.49;
    ground.receiveShadow = true;
    scene.add(ground);

    const target = new THREE.Vector2();
    const current = new THREE.Vector2();
    const pointerVelocity = new THREE.Vector2();
    const previousPointer = new THREE.Vector2();
    let hasPointer = false;
    let lastPointerTime = performance.now();
    let wasIdle = false;
    let perk = 0;
    let blinkUntil = 0;
    let nextBlinkAt = 0;
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const move = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const now = performance.now();
      const nextTarget = new THREE.Vector2(
        THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1),
        THREE.MathUtils.clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1),
      );
      if (hasPointer) {
        const elapsed = Math.max((now - lastPointerTime) / 1000, 0.016);
        pointerVelocity.copy(nextTarget).sub(previousPointer).multiplyScalar(1 / elapsed).clampLength(0, 4);
      }
      if (wasIdle) perk = 1;
      target.copy(nextTarget);
      previousPointer.copy(nextTarget);
      hasPointer = true;
      lastPointerTime = now;
      wasIdle = false;
    };
    const leave = () => target.set(0, 0);
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      if (!reducedMotion) {
        const now = performance.now();
        const idle = now - lastPointerTime > 2000;
        if (idle && !wasIdle) {
          wasIdle = true;
          nextBlinkAt = time + 0.8;
        }
        if (wasIdle && time >= nextBlinkAt) {
          blinkUntil = time + 0.12;
          nextBlinkAt = time + 2.2 + Math.random() * 2.5;
        }
        perk = Math.max(0, perk - 0.045);
        pointerVelocity.multiplyScalar(0.9);
        current.lerp(target, 0.065);
        robot.rotation.y = THREE.MathUtils.lerp(robot.rotation.y, current.x * 0.12, 0.09);
        robot.rotation.x = THREE.MathUtils.lerp(robot.rotation.x, -current.y * 0.06, 0.09);
        const breathing = wasIdle ? Math.sin(time * 2.1) : Math.sin(time * 1.4) * 0.35;
        const perkBounce = perk * Math.sin((1 - perk) * Math.PI) * 0.23;
        robot.position.y = breathing * 0.075 + perkBounce;
        torso.scale.set(1 - breathing * 0.018 + perk * 0.06, 1 + breathing * 0.03 - perk * 0.075, 1 - breathing * 0.018 + perk * 0.06);
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, current.x * 0.35, 0.11);
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -current.y * 0.22, 0.11);
        torso.rotation.y = THREE.MathUtils.lerp(torso.rotation.y, current.x * 0.17, 0.09);
        torso.rotation.x = THREE.MathUtils.lerp(torso.rotation.x, -current.y * 0.1, 0.09);
        leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, 0.13 - current.x * 0.16 + Math.sin(time * 1.8) * 0.04 - perk * 0.33, 0.08);
        rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.13 - current.x * 0.16 - Math.sin(time * 1.8) * 0.04 + perk * 0.33, 0.08);
        const antennaWiggle = pointerVelocity.x * 0.2 + Math.sin(time * (wasIdle ? 1.4 : 7.5)) * (wasIdle ? 0.1 : pointerVelocity.length() * 0.07);
        antenna.rotation.z = THREE.MathUtils.lerp(antenna.rotation.z, -current.x * 0.25 + antennaWiggle, 0.055);
        antenna.rotation.x = THREE.MathUtils.lerp(antenna.rotation.x, pointerVelocity.y * 0.055, 0.07);
        leftPupil.position.x = -0.21 + current.x * 0.075;
        leftPupil.position.y = -current.y * 0.06;
        rightPupil.position.x = 0.21 + current.x * 0.075;
        rightPupil.position.y = -current.y * 0.06;
        const eyelid = time < blinkUntil ? 0.08 : 1;
        leftPupil.scale.y = 1.4 * eyelid;
        rightPupil.scale.y = 1.4 * eyelid;
        key.position.x = 3.5 + current.x * 2.3;
        key.position.y = 4.5 - current.y * 1.4;
        tipLight.intensity = 1.5 + Math.sin(time * 3) * 0.5;
        antennaTip.scale.setScalar(1 + Math.sin(time * 3) * 0.07);
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
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="build-mascot-3d" role="img" aria-label="An interactive 3D BUILD robot mascot" />;
}
