import debounce from '../../../utils/library/debounce';

export default {
  mounted() {
    // this.__resizeHandler = debounce(() => {
    //   console.log(555555555);
    //   if (this.chart) {
    //     // this.chart.clear();
    //     // this.paint(this.data);
    //     // this.updateData();
    //   }
    // }, 100);
    // window.addEventListener('resize', this.__resizeHandler);
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.__resizeHandler);
  },
};
