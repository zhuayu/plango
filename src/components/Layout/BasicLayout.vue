<template>
  <el-container>
    <BasicLayoutHeader />
    <el-container class="page-body">
      <el-aside width="250px">
        <el-scrollbar class="scrollbar-section">
          <div class="abc" style="height: 1800px;">123</div>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer height="40px">
      <BasicLayoutFooter />
    </el-footer>
  </el-container>
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

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  height: 60px;
}

.el-footer {
  background-color: #b3c0d1;
  height: 40px;
}

.page-body {
  height: calc(100vh - 100px);
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  padding: 0;
}
</style>
