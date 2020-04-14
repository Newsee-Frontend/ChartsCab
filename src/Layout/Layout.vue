<!--整体布局-->
<template>
  <div id="app" class="layout">
    <sticky></sticky>

    <div class="toggle"></div>
    <div class="title">{{title}}</div>
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import sticky from './sticky/sticky';

export default {
  name: 'Layout',
  props: {
    title: ''
  },
  components: {
    sticky,
  },
  data() {
    return {};
  },
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
