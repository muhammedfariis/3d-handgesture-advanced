import { initHandTracking } from "./hand.js";
import { ParticleSystem } from "./particle.js";
import { SHAPES } from "./shapes.js";

const canvas = document.getElementById("three-canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);

scene.add(new THREE.AmbientLight(0xffffff, 1));

const particles = new ParticleSystem(scene);

let shapeIndex = 0;
let lastX = null;
let lastSwitch = 0;
const SWITCH_DELAY = 700; 
const SWIPE_THRESHOLD = 0.12;

function isPinching(hand) {
  const a = hand[4];
  const b = hand[8];
  return Math.hypot(a.x - b.x, a.y - b.y) < 0.04;
}

initHandTracking((hand) => {
  const now = Date.now();
  const x = hand[8].x;

  // Shape switch (left/right swipe)
  if (lastX !== null && now - lastSwitch > SWITCH_DELAY) {
    if (x - lastX > SWIPE_THRESHOLD) {
      shapeIndex = (shapeIndex + 1) % SHAPES.length;
      particles.setShape(SHAPES[shapeIndex]);
      lastSwitch = now;
    } else if (lastX - x > SWIPE_THRESHOLD) {
      shapeIndex = (shapeIndex - 1 + SHAPES.length) % SHAPES.length;
      particles.setShape(SHAPES[shapeIndex]);
      lastSwitch = now;
    }
  }
  lastX = x;

  // Pinch → explode
  if (isPinching(hand)) {
    particles.explode();
  }

  particles.handleGestures(hand);
});

function animate() {
  requestAnimationFrame(animate);
  particles.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
