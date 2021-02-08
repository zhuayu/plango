<template>
  <div class="page-home" ref="container"></div>
</template>

<script>
// import * as THREE from 'three';
// import dat from 'dat.gui';

export default {
  data: () => ({
    scene: null,
    camera: null,
    render: null,
    controls: {
      rotationSpeed: 0.02
    }
  }),
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const containerOffsetWidth = this.$refs.container.offsetWidth;
      const containerOffsetHeight = this.$refs.container.offsetHeight;
      // eslint-disable-next-line
      this.scene = new THREE.Scene();
      // eslint-disable-next-line
      this.camera = new THREE.PerspectiveCamera(70, containerOffsetWidth / containerOffsetHeight, 0.1, 5000);
      // this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 5000);
      console.log(containerOffsetWidth);
      console.log(containerOffsetHeight);

      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 1500;
      this.camera.lookAt(this.scene.position);
      // eslint-disable-next-line
      let geometry = new THREE.Geometry();
      console.log(geometry);

      function getGridOn2D(step, iLayer) {
        // eslint-disable-next-line
        let geometry = new THREE.Geometry();
        for (let i = -8000; i <= 8000; i += step) {
          // eslint-disable-next-line
          geometry.vertices.push( new THREE.Vector3( -8000, i, iLayer ), new THREE.Vector3( 8000, i, iLayer ));
          // eslint-disable-next-line
          geometry.vertices.push( new THREE.Vector3( i, -8000, iLayer ), new THREE.Vector3( i, 8000, iLayer ));
        }
        // eslint-disable-next-line
        return new THREE.LineSegments(geometry,
          // eslint-disable-next-line
          new THREE.LineBasicMaterial( { color: 0xD0D0D0, opacity: 1 } ) );
      }
      const GridStep100 = getGridOn2D(100, -2);
      const GridStep500 = getGridOn2D(500, -1);
      this.scene.add(GridStep100);
      this.scene.add(GridStep500);

      // eslint-disable-next-line
      this.renderer = new THREE.WebGLRenderer();
      // eslint-disable-next-line
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
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
}
</style>
