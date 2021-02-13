import { scene, camera } from "./scene/index";
import ContainerResize from "./events/container-resize.js";
import CameraMouseMove from "./events/camera-mouse-move.js";

class Main {
  constructor(props) {
    this.el = props.el;
    this.init();
    this.render();
  }

  init() {
    this.scene = scene;
    this.scene.init(this.el);
    this.camera = camera.instance;
    this.bind();
  }

  bind() {
    ContainerResize.init(this.el);
    CameraMouseMove.init(this.el);
  }

  render() {
    this.scene.render();
    requestAnimationFrame(this.render.bind(this));
  }
}

export default Main;
