import { camera } from "../scene/index";

class CameraMouseMove {
  constructor() {}

  init(el) {
    this.el = el;
    this.camera = camera.instance;
    this.movePlan = {
      isLock: true,
      x: 0,
      y: 0
    };
    this.bind();
  }

  bind() {
    this.el.addEventListener("wheel", this.mousewheel.bind(this));
    this.el.addEventListener("mousedown", this.mouseDown.bind(this), false);
    this.el.addEventListener("mousemove", this.mouseMove.bind(this), false);
    this.el.addEventListener("mouseup", this.mouseUp.bind(this), false);
    this.el.addEventListener("mouseout", this.mouseUp.bind(this), false);
  }

  mousewheel(e) {
    const { camera } = this;
    e.preventDefault();
    if (e.wheelDelta > 0) {
      camera.position.z -= 80;
      if (camera.position.z < 0) camera.position.z = 1;
    }
    if (e.wheelDelta < 0) {
      camera.position.z += 80;
      if (camera.position.z > 6000) camera.position.z = 6000;
    }
    camera.updateProjectionMatrix();
  }

  mouseDown(e) {
    this.el.style.cursor = "pointer";
    this.movePlan.isLock = false;
    this.movePlan.x = e.clientX;
    this.movePlan.y = e.clientY;
  }

  mouseMove(e) {
    const { camera, movePlan } = this;
    if (!movePlan.isLock) {
      const moveX = movePlan.x - e.clientX;
      const moveY = movePlan.y - e.clientY;
      const size = Math.ceil(Math.abs(camera.position.z / 1000));
      camera.position.x += moveX * size;
      camera.position.y += -moveY * size;
      movePlan.x = e.clientX;
      movePlan.y = e.clientY;
    }
  }

  mouseUp() {
    this.el.style.cursor = "default";
    this.movePlan.isLock = true;
  }
}

export default new CameraMouseMove();
