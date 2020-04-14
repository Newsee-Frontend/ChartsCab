<!--块 - 标题区域-->
<template>
  <div class="block-head clear"  :style="{marginTop: !!$slots.main ? '10px' : ''}">
    <div class="block-head__main fl" v-show="!!$slots.main">
      <slot name="main"></slot>
    </div>
    <div class="block-head__sub fl">
      <slot name="sub"></slot>
    </div>
    <div class="block-head__right fr">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'block-head',
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .block-head {
    line-height: 36px;
    .block-head__main {
      font-size: 16px;
      font-weight: bold;
      height: 36px;
    }

    .block-head__sub, .block-head__right {
      font-size: 10px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

  }
</style>
