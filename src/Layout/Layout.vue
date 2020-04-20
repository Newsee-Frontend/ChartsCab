<!--整体布局-->
<template>
  <div id="app" class="layout">
    <!--吸顶切换-->
    <sticky @change="toggleProject"></sticky>

    <!--项目切换组件-->
    <toggle-project  :visible.sync="showProjectPopup"></toggle-project>

    <div class="toggle" @click="toggleProject"></div>
    <div class="title">{{title}}</div>
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import sticky from './sticky/sticky';
import toggleProject from './toggleProject/toggleProject';

export default {
  name: 'Layout',
  components: {
    sticky,
    toggleProject
  },
  data() {
    return {
      showProjectPopup: false,
      title: '',
    };
  },

  methods: {
    toggleProject(){
      this.showProjectPopup = true;
    }
  },

  mounted(){
    this.title = this.$store.state.Base.departmentName;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$top_gap: 102px;
#app.layout {
  height: 100%;
  background: url('../assets/img/back@3x.png') top left no-repeat;
  background-size: 100%;
  padding-top: $top_gap;
  .title {
    font-size: 24px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 31px;
    background-image: -webkit-linear-gradient(top, #8ac8ff, #fff);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    position: absolute;
    top: 25px;
    left: 23px;
  }

  .toggle {
    position: absolute;
    width: 80px;
    height: 44px;
    background: url('../assets/img/toggle.png') top left no-repeat;
    background-size: 100%;
    top: 29px;
    right: 15px;
  }

  .wrapper {
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
    margin: 0 12px;
    padding: 0 12px;
    height: calc(100vh - #{$top_gap});

    .container-block {
      padding-top: 5px;
    }
  }
}
</style>
