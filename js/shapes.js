export const SHAPES = ["sun", "moon", "saturn", "jupiter", "stars", "car", "bike"];

export const SHAPE_COLORS = {
  sun: 0xFFD700,
  moon: 0xCCCCFF,
  saturn: 0xFFA500,
  jupiter: 0xFF4500,
  stars: 0xFFFFFF,
  car: 0xFF0000,
  bike: 0x00FF00
};

export function generateShape(type, count) {
  const arr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x, y, z;

    switch(type) {
      case "sun":
        const rSun = 2 + Math.random() * 0.8;
        const thetaSun = Math.random() * Math.PI * 2;
        const phiSun = Math.random() * Math.PI;
        x = rSun * Math.sin(phiSun) * Math.cos(thetaSun);
        y = rSun * Math.sin(phiSun) * Math.sin(thetaSun);
        z = rSun * Math.cos(phiSun);
        break;

      case "moon":
        const thetaMoon = Math.random() * Math.PI * 2;
        x = Math.cos(thetaMoon) * 2;
        y = Math.sin(thetaMoon) * 2;
        z = Math.random() - 0.5;
        break;

      case "saturn":
        if (i < count * 0.6) {
          const phi = Math.acos(2 * Math.random() - 1);
          const theta = Math.random() * Math.PI * 2;
          x = Math.sin(phi) * Math.cos(theta) * 1.5;
          y = Math.sin(phi) * Math.sin(theta) * 1.5;
          z = Math.cos(phi) * 1.5;
        } else {
          const r = 2.5 + Math.random();
          const a = Math.random() * Math.PI * 2;
          x = Math.cos(a) * r;
          y = (Math.random() - 0.5) * 0.15;
          z = Math.sin(a) * r;
        }
        break;

      case "jupiter":
        const thetaJ = Math.random() * Math.PI * 2;
        const phiJ = Math.random() * Math.PI;
        x = Math.sin(phiJ) * Math.cos(thetaJ) * 2.5;
        y = Math.cos(phiJ) * 2;
        z = Math.sin(phiJ) * Math.sin(thetaJ) * 2.5;
        break;

      case "stars":
        x = (Math.random() - 0.5) * 10;
        y = (Math.random() - 0.5) * 10;
        z = (Math.random() - 0.5) * 10;
        break;

      case "car":
        x = (Math.random() - 0.5) * 4;
        y = (Math.random() - 0.5) * 2;
        z = (Math.random() - 0.5) * 2;
        break;

      case "bike":
        x = (Math.random() - 0.5) * 3;
        y = (Math.random() - 0.5) * 1.5;
        z = (Math.random() - 0.5) * 2;
        break;
    }

    arr.set([x, y, z], i * 3);
  }

  return arr;
}
