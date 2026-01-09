export const SHAPES = ["saturn", "cube", "sphere", "pyramid"];

export const SHAPE_COLORS = {
  saturn: 0xffcc00,
  cube: 0x00ccff,
  sphere: 0xff00ff,
  pyramid: 0x00ff88
};

export function generateShape(type, count = 15000) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    switch (type) {
      case "cube":
        positions[i*3] = (Math.random() - 0.5) * 6;
        positions[i*3 + 1] = (Math.random() - 0.5) * 6;
        positions[i*3 + 2] = (Math.random() - 0.5) * 6;
        break;
      case "sphere":
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * Math.PI * 2;
        const r = 3;
        positions[i*3] = r * Math.sqrt(1 - u*u) * Math.cos(theta);
        positions[i*3 + 1] = r * Math.sqrt(1 - u*u) * Math.sin(theta);
        positions[i*3 + 2] = r * u;
        break;
      case "pyramid":
        const height = 4;
        const base = 3;
        const t = Math.random();
        const angle = Math.random() * Math.PI*2;
        const radius = base * (1-t);
        positions[i*3] = Math.cos(angle) * radius;
        positions[i*3 + 1] = t * height - 2;
        positions[i*3 + 2] = Math.sin(angle) * radius;
        break;
      case "saturn":
      default:
        const angle2 = Math.random() * Math.PI*2;
        const radius2 = Math.random()*3 + 1;
        positions[i*3] = Math.cos(angle2) * radius2;
        positions[i*3 + 1] = (Math.random() - 0.5) * 1;
        positions[i*3 + 2] = Math.sin(angle2) * radius2;
        break;
    }
  }

  return positions;
}
