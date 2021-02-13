import * as THREE from "three";

class GirdLine {
  constructor(size, step, layer, color, opacity = 1) {
    let geometry = new THREE.Geometry();
    for (let i = -size; i <= size; i += step) {
      geometry.vertices.push(
        // 横线
        new THREE.Vector3(-size, i, layer),
        new THREE.Vector3(size, i, layer),
        // 竖线
        new THREE.Vector3(i, -size, layer),
        new THREE.Vector3(i, size, layer)
      );
    }
    return new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ color, opacity })
    );
  }
}

export default GirdLine;
