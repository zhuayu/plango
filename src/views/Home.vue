<template>
  <div class="page-home" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  data: () => ({
    scene: null,
    camera: null,
    render: null,
    controls: {
      rotationSpeed: 0.02
    },
    movePlan: {
      isLock: true,
      x: 0,
      y: 0
    }
  }),
  created() {
    this.resize = debounce(this.resize, 100);
    this.mousewheel = debounce(this.mousewheel, 10);
  },
  mounted() {
    this.init();
    addListener(this.$refs.container, this.resize);
    this.$refs.container.addEventListener("wheel", this.mousewheel);
    this.$refs.container.addEventListener("mousedown", this.mouseDown, false);
    this.$refs.container.addEventListener("mousemove", this.mouseMove, false);
    this.$refs.container.addEventListener("mouseup", this.mouseUp, false);
    this.$refs.container.addEventListener("mouseout", this.mouseUp, false);
  },
  beforeDestroy() {
    removeListener(this.$refs.container, this.resize);
  },
  methods: {
    resize() {
      if (this.renderer) {
        const containerOffsetWidth = this.$refs.container.offsetWidth;
        const containerOffsetHeight = this.$refs.container.offsetHeight;
        this.camera.aspect = containerOffsetWidth / containerOffsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(containerOffsetWidth, containerOffsetHeight);
      }
    },
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
    },
    mouseDown(e) {
      this.$refs.container.style.cursor = "pointer";
      this.movePlan.isLock = false;
      this.movePlan.x = e.clientX;
      this.movePlan.y = e.clientY;
    },
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
    },
    mouseUp() {
      this.$refs.container.style.cursor = "default";
      this.movePlan.isLock = true;
    },
    init() {
      const containerOffsetWidth = this.$refs.container.offsetWidth;
      const containerOffsetHeight = this.$refs.container.offsetHeight;
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        70,
        containerOffsetWidth / containerOffsetHeight,
        0.1,
        9000
      );

      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 1500;
      this.camera.lookAt(this.scene.position);

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
      this.scene.add(GridStep100);
      this.scene.add(GridStep500);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(new THREE.Color(0xeeeeee));
      this.renderer.setSize(containerOffsetWidth, containerOffsetHeight);
      this.$refs.container.append(this.renderer.domElement);
      this.renderScene();
    },
    renderScene() {
      let { scene, camera, renderer } = this;
      requestAnimationFrame(this.renderScene);
      renderer.render(scene, camera);
    }
  }
};
</script>

<style type="text/css" lang="less">
.page-home {
  height: 100%;
  overflow: hidden;
}
</style>
