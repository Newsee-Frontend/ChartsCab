<!--粘性置顶-->
<template>
  <ns-sticky :offset-top="offsetTop" :class="['ns-sticky', isStickyShow ? 'show' : 'hide']">
    <div class="sticky-wrapper clear">
      <span class="fl">集团公司</span>

      <div class="toggle fr">
        <ns-icon name="exchange" />
        切换
      </div>
    </div>
  </ns-sticky>
</template>

<script>
import create from '../../utils/core/create-basic';
import { addEventHandler, removeEventHandler } from '../../utils/library/event';
import { Icon, Sticky } from 'vant';

export default create({
  name: 'sticky',
  components: {
    Icon,
    Sticky,
  },
  data() {
    return {
      scrollTop: 0,
      isStickyShow: false,
    };
  },
  props: {
    offsetTop: { type: Number, default: 0 },
  },
  mounted() {
    addEventHandler(window, 'scroll', this.handleScroll);

    this.$once('hook:beforeDestroy', () => {
      removeEventHandler(window, 'scroll');
    });
  },
  watch: {
    scrollTop(val) {
      this.isStickyShow = val > 800;
    },
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(this.scrollTop);
    },
  },
  beforeDestroy() {},
});
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ns-sticky {
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
  .sticky-wrapper {
    width: 100%;
    height: 36px;
    line-height: 36px;
    background: rgba(242, 242, 242, 1);
    padding: 0 20px;
    box-sizing: border-box;

    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    .toggle {
      font-size: 14px;
      font-weight: 600;
      color: rgba(55, 88, 211, 1);
    }
  }
}
</style>
