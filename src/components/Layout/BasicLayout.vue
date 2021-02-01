<template>
  <div class="page-basic-layout">
    <BasicLayoutHeader />
    <router-view class="page-basic-body" />
    <BasicLayoutFooter />
  </div>
</template>
<script type="text/javascript">
import BasicLayoutHeader from "./BasicLayoutHeader.vue";
import BasicLayoutFooter from "./BasicLayoutFooter.vue";

export default {
  components: {
    BasicLayoutHeader,
    BasicLayoutFooter
  }
};
</script>

<style type="text/css" lang="less" scoped>
.page-basic-layout {
  min-height: 100vh;
  min-width: 1080px;
  display: flex;
  flex-direction: column;
}
.page-basic-body {
  flex: 1;
  background-color: #f8fafc;
}
</style>
