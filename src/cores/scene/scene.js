import * as THREE from "three";
// import sceneConf from "../confs/scene-conf";
import camera from "./camera";
import GirdLine from "../objects/GirdLine.js";

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

    const girdLine100 = new GirdLine(4000, 100, -1, 0xd0d0d0);
    this.instance.add(girdLine100);

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
    this.camera.aspect = containerOffsetWidth / containerOffsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(containerOffsetWidth, containerOffsetHeight);
  }
}

export default new Scene();
