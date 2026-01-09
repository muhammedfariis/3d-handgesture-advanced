import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { ParticleSystem } from './particle.js';
import { SHAPES } from './shapes.js';
import { HandDetector } from './hand.js';

// Scene
const canvas = document.getElementById("three-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
scene.add(new THREE.AmbientLight(0xffffff, 1));

// Particles
const particles = new ParticleSystem(scene);
let shapeIndex = 0;
let lastX = null;
let lastSwitch = 0;

// Hand
const handDetector = new HandDetector("video");
handDetector.init((hand) => {
  const index = hand[8];
  const thumb = hand[4];

  // Pinch → explode
  const pinchDist = Math.hypot(index.x - thumb.x, index.y - thumb.y);
  if (pinchDist < 0.04) particles.explode();

  // Move particles
  particles.handleGestures(hand);

  // Swipe left/right → change shape
  const now = Date.now();
  const SWITCH_DELAY = 700;
  const SWIPE_THRESHOLD = 0.12;

  if (lastX !== null && now - lastSwitch > SWITCH_DELAY) {
    if (index.x - lastX > SWIPE_THRESHOLD) {
      shapeIndex = (shapeIndex + 1) % SHAPES.length;
      particles.setShape(SHAPES[shapeIndex]);
      lastSwitch = now;
    } else if (lastX - index.x > SWIPE_THRESHOLD) {
      shapeIndex = (shapeIndex - 1 + SHAPES.length) % SHAPES.length;
      particles.setShape(SHAPES[shapeIndex]);
      lastSwitch = now;
    }
  }
  lastX = index.x;
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  particles.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
