import * as THREE from "three";
// import sceneConf from "../confs/scene-conf";
import { customAnimation } from "../libs/animation";

class Camera {
  constructor() {
    this.instance = null;
  }

  init(el) {
    const containerOffsetWidth = el.offsetWidth;
    const containerOffsetHeight = el.offsetHeight;
    this.instance = new THREE.PerspectiveCamera(
      70,
      containerOffsetWidth / containerOffsetHeight,
      0.1,
      9000
    );
    this.instance.position.x = 0;
    this.instance.position.y = 0;
    this.instance.position.z = 1500;
    return this.instance;
  }

  updatePosition(newTargetPosition) {
    customAnimation.to(this.instance.position, 0.5, {
      x: newTargetPosition.x - 10,
      y: newTargetPosition.y + 10,
      z: newTargetPosition.z + 10
    });
    customAnimation.to(this.target, 0.5, {
      x: newTargetPosition.x,
      y: newTargetPosition.y,
      z: newTargetPosition.z
    });
  }

  reset() {
    this.instance.position.set(-10, 10, 10);
    this.target = new THREE.Vector3(0, 0, 0);
  }
}

export default new Camera();
