import * as THREE from "three";
// import sceneConf from "../confs/scene-conf";
import camera from "./camera";

class Scene {
  constructor() {
    this.instance = null;
  }

  init(el) {
    this.el = el;
    this.instance = new THREE.Scene();
    this.camera = camera.init(el);
    this.camera.lookAt(this.instance.position);
    const containerOffsetWidth = el.offsetWidth;
    const containerOffsetHeight = el.offsetHeight;

    function getGridOn2D(step, iLayer) {
      let geometry = new THREE.Geometry();
      for (let i = -4000; i <= 4000; i += step) {
        geometry.vertices.push(
          new THREE.Vector3(-4000, i, iLayer),
          new THREE.Vector3(4000, i, iLayer)
        );
        geometry.vertices.push(
          new THREE.Vector3(i, -4000, iLayer),
          new THREE.Vector3(i, 4000, iLayer)
        );
      }
      return new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({ color: 0xd0d0d0, opacity: 1 })
      );
    }

    const GridStep100 = getGridOn2D(100, -2);
    const GridStep500 = getGridOn2D(500, -1);
    this.instance.add(GridStep100);
    this.instance.add(GridStep500);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(0xeeeeee));
    this.renderer.setSize(containerOffsetWidth, containerOffsetHeight);
    el.append(this.renderer.domElement);
    this.render();
  }

  render() {
    this.renderer.render(this.instance, this.camera);
  }

  resize() {
    const containerOffsetWidth = this.el.offsetWidth;
    const containerOffsetHeight = this.el.offsetHeight;
    console.log(containerOffsetWidth, containerOffsetHeight);
    this.camera.aspect = containerOffsetWidth / containerOffsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(containerOffsetWidth, containerOffsetHeight);
  }
}

export default new Scene();
