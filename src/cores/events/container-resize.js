import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
import { scene, camera } from "../scene/index";

class ContainerResize {
  constructor() {}

  init(el) {
    this.el = el;
    this.camera = camera.instance;
    this.renderer = scene.renderer;
    this.bind();
  }

  bind() {
    this.resize = debounce(this.resize, 100);
    addListener(this.el, this.resize.bind(this));
  }

  unbind() {
    removeListener(this.el, this.resize);
  }

  resize() {
    const containerOffsetWidth = this.el.offsetWidth;
    const containerOffsetHeight = this.el.offsetHeight;
    this.camera.aspect = containerOffsetWidth / containerOffsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(containerOffsetWidth, containerOffsetHeight);
  }
}

export default new ContainerResize();
