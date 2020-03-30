<!--块 - 标题区域-->
<template>
  <div class="block-head clear">
    <div class="block-head__main fl">
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
      margin-right: 6px;
    }

    .block-head__sub {
      font-size: 10px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

  }
</style>
