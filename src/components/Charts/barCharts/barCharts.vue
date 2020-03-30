<template>
  <canvas :id="id" :style="{ width: width }"></canvas>
</template>

<script>
import F2 from '@antv/f2';
import mixins from '../mixins';

export default {
  name: 'lineCharts',
  mixins: [mixins],
  props: {
    data: {
      type: Array,
      default: () => [],
    },

    color: {
      type: Array,
      default: () => ['#4F9BFF', '#EAEAEA'],
    },

    // 图表尺寸宽度
    width: {
      type: String,
      default: '100%',
    },
    // 高度范围
    heightRange: {
      type: Array,
      default: () => [150, 300],
    },
    // 每一项高度
    itemHeight: {
      type: Number,
      default: 25,
    },
    // 柱条高度
    barHeight: {
      type: Number,
      default: 15,
    },
  },
  data() {
    return {
      chart: null,

      barData: [],

      finalHeight: 0,
    };
  },
  computed: {
    isEmpty(){
      return !this.data.length;
    }
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.chart = new F2.Chart({
        id: this.id,
        pixelRatio: window.devicePixelRatio,
        padding: [0, 'auto'],
      });
      this.chart.tooltip(false);
      this.chart.legend(false);
      this.chart.axis('value', {
        line: null,
        label: null,
      });
      this.chart.axis('name', {
        grid: null,
        label: text => ({
          text: this.isEmpty ? '暂无' : text,
        }),
      });
      this.chart.coord({
        transposed: true,
      });

      this.updateData();
      this.paint();
    },

    /**
     * 更新数据
     */
    updateData() {
      if (this.isEmpty) {
        this.barData = Array.from({ length: 6 }, (item, index) => ({
          name: index.toString(),
          value: 0,
          const: 'const',
        }));
      } else {
        this.barData = this.data.map(i => {
          i.const = 'const';
          return i;
        });
      }
    },

    /**
     * 绘制
     */
    paint() {
      let itemsHeigtht = this.barData.length * this.itemHeight;
      if (itemsHeigtht < this.heightRange[0]) {
        this.finalHeight = this.heightRange[0];
      } else if (itemsHeigtht > this.heightRange[1]) {
        this.finalHeight = this.heightRange[1];
      } else {
        this.finalHeight = itemsHeigtht;
      }
      this.chart.changeSize(null, this.finalHeight);
      this.chart.clear();
      this.chart.source(this.barData, {
        value: {
          range: [0, 0.9],
        },
      });
      this.chart
        .interval()
        .position('name*value')
        .color('const', this.color)
        .adjust('stack')
        .size(this.barHeight);
      this.barData.forEach(obj => {
        this.chart.guide().text({
          position: [obj.name, obj.value],
          content: obj.value,
          style: {
            fill: '#333',
            textAlign: 'left',
          },
          offsetX: 4,
        });
      });
      this.chart.render();
    },
  },

  watch: {
    data: {
      handler() {
        if (!this.chart) return;
        this.updateData();
        this.paint();
      },
      deep: true,
    },
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    if (!this.chart) return;
    this.chart.clear();
    this.chart = null;
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
