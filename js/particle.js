import { generateShape, SHAPE_COLORS } from "./shapes.js";

export class ParticleSystem {
  constructor(scene, count = 15000) {
    this.count = count;
    this.scene = scene;

    this.targetPositions = generateShape("saturn", count);
    this.currentPositions = this.targetPositions.slice();

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.currentPositions.slice(), 3)
    );

    this.material = new THREE.PointsMaterial({
      size: 0.04,
      color: SHAPE_COLORS["saturn"]
    });

    this.points = new THREE.Points(this.geometry, this.material);
    scene.add(this.points);
    this.currentShape = "saturn";
  }

  setShape(type) {
    this.targetPositions = generateShape(type, this.count);
    if (SHAPE_COLORS[type]) {
      this.material.color.setHex(SHAPE_COLORS[type]);
    }
    this.currentShape = type;
  }

  handleGestures(hand) {
    const index = hand[8];
    const thumb = hand[4];

    // Mirror X axis for natural hand movement
    const x = -(index.x - 0.5) * 10;
    const y = -(index.y - 0.5) * 6;
    const z = (thumb.x - index.x) * 8;

    this.points.position.lerp(new THREE.Vector3(x, y, z), 0.1);

    // Pinch → scale
    const pinchDist = Math.hypot(index.x - thumb.x, index.y - thumb.y);
    this.points.scale.setScalar(1 + pinchDist * 4);
  }

  explode() {
    const pos = this.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i++) {
      pos[i] += (Math.random() - 0.5) * 2;
    }
  }

  update() {
    const pos = this.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i++) {
      this.currentPositions[i] += (this.targetPositions[i] - this.currentPositions[i]) * 0.08;
      pos[i] = this.currentPositions[i];
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.points.rotation.y += 0.002;
    this.points.rotation.x += 0.001;
  }
}
