<template>
  <canvas :id="id" :style="{ width: width, height: height }"></canvas>
</template>

<script>
import F2 from '@antv/f2';
import mixins from '../mixins';
import { getAllMonths } from '../../../utils/library/date';

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
      default: () => ['#4F9BFF', '#BBBBBB'],
    },

    keyRef: {
      //匹配属性名
      type: Object,
      default: () => ({}),
    },

    // 图表尺寸宽度
    width: {
      type: String,
      default: '100%',
    },

    // 图表尺寸宽度
    height: {
      type: String,
      default: '200px',
    },
  },

  data() {
    return {
      lineData: [],

      chart: null,

      isEmpty: true,
    };
  },

  methods: {
    /**
     * 初始化
     */
    init() {
      this.chart = new F2.Chart({
        id: this.id,
        pixelRatio: window.devicePixelRatio,
        padding: [50, 'auto', 'auto'],
        appendPadding: [15, 0]
      });
      this.chart.tooltip(false);
      this.chart.axis('time', {
        line: {
          //坐标轴
          lineWidth: 1,
          stroke: '#7a7a7a',
          top: true, //展示在最上层
        },
        tickLine: {
          //坐标轴刻度线
          lineWidth: 1,
          stroke: '#7a7a7a',
          length: 4, //刻度线长度
        },
        grid: null, //坐标轴网格线
        labelOffset: 10, //坐标轴文本距离轴线的距离
      });

      this.chart.axis('value', {
        grid: (text, index, total) => {
          return {
            stroke: '#dbdbdb',
            lineDash: [0], //虚线样式，如[5, 15, 25]
          };
        },
      });

      //绘制
      this.paint();
    },

    /**
     * 更新数据
     */
    updateData() {
      this.isEmpty = this.data.length ? false : true;
      if (this.isEmpty) {
        let arr = getAllMonths(2).split(',');
        this.lineData = Array.from({ length: 24 }, (item, index) => ({
          time: arr[index].slice(4),
          value: 0,
          type: arr[index].slice(0, 4),
        }));
      } else {
        this.lineData = this.data;
      }
    },

    /**
     * 绘制
     * @param val
     */
    paint() {
      this.chart.clear();

      let items = Array.from(new Set(this.lineData.map(i => i.type))).map((i, index) => {
        return {
          name: i,
          marker: {
            symbol: 'square',
            fill: this.color[index],
            radius: 6,
          },
        };
      });

      this.chart.legend({
        custom: true,
        itemWidth: null,
        itemGap: 30,
        items: items,
        clickable: false,
      });
      this.chart.source(
        this.lineData,
        this.isEmpty
          ? {
              value: {
                max: 60,
                tickCount: 7,
              },
            }
          : {}
      );
      let legends = [...new Set(this.lineData.map(i => i.type))];
      this.lineData.forEach(obj => {
        if (this.isEmpty || obj.type === legends[1]) return;
        this.chart.guide().text({
          //标注数据
          position: [obj.time, obj.value],
          content: obj.value,
          style: {
            textBaseline: 'bottom',
            textAlign: 'center',
          },
          offsetY: -4,
        });
      });
      this.chart
        .line()
        .position('time*value')
        .color('type', this.isEmpty ? ['transparent', 'transparent'] : this.color)
        .shape('smooth');
      this.chart
        .point()
        .position('time*value')
        .color('type', this.isEmpty ? ['transparent', 'transparent'] : this.color)
        .style({
          lineWidth: 1,
          stroke: '#fff',
        });
      this.chart.render();
    },
  },

  watch: {
    data: {
      handler(val) {
        if (!this.chart) return;
        this.updateData();
        this.paint();
      },
    },
  },

  mounted() {
    this.lineData = this.data;
    this.init();
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.clear();
    this.chart = null;
  },
};
</script>

<style scoped></style>
