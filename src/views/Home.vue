<template>
  <div class="page-home" ref="container"></div>
</template>

<script>
import Main from "@/cores/main";

export default {
  data: () => ({}),
  mounted() {
    this.main = new Main({
      el: this.$refs.container
    });
    this.main.render();
  },
  beforeDestroy() {
    this.main.unbind();
  },
  methods: {}
};
</script>

<style type="text/css" lang="less">
.page-home {
  height: 100%;
  overflow: hidden;
}
</style>
