<template>
  <div class="home-page" v-loading="loading">
    <div class="banner-section">
      BANNER
      <icon-svg svg-class="homework-svg-class" svg-name="demo"></icon-svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loading: false
    };
  },
  created() {}
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  padding: 20px 0 80px;
}
</style>
