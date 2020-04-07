<!--饼图-->
<template>
  <canvas :id="id" :style="{ width: width, height: height }"></canvas>
</template>

<script>
import F2 from '@antv/f2';
import { remUnit } from '../../../config';
import mixins from '../mixins';

export default {
  mixins: [mixins],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    //单位
    unit: {
      type: String,
      default: '',
    },
    color: {
      type: Array,
      default: () => ['#446BF8', '#F35894', '#FFCC37', '#0FD09B'],
    },

    blankColor: {
      type: Array,
      default: () => ['#eeeeee'],
    },

    blankText: {
      type: String,
      default: '暂无数据',
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
      chart: null,
      pieData: [],
      pieMap: {},
      pieSum: 0, //计算总和用于显示
    };
  },

  computed: {
    isBlank(){
      return !this.data.length || this.pieSum === 0;
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
      this.chart.axis(false);
      this.chart.legend({
        position: 'right',
        offsetX: this.isBlank ? -30 : 0,
        offsetY: 6,
        marker: {
          radius: 6,
        },
        nameStyle: {
          fill: '#333',
          fontSize: '12',
        },
        valueStyle: {
          fill: '#333',
          fontSize: '12',
        },
        itemMarginBottom: 18,
        wordSpace: 4, //marker和文本之间的间距
        itemFormatter: val => {
          return this.isBlank ? val : (val + '  ' + this.pieMap[val].toFixed(2) + this.unit);
        },
        clickable: false,
      });

      this.chart.coord('polar', {
        transposed: true,
        radius: 0.9,
        innerRadius: 0.75,
      });

      //绘制
      this.paint();
    },
    /**
     * 更新数据
     */
    updateData() {
      //添加x轴数据，匹配属性赋值
      this.pieData = this.data.map(i => {
        Object.keys(this.keyRef).forEach(key => {
          i[key] = i[this.keyRef[key]];
        });
        return {
          name: i.name,
          value: i.value,
          const: 'const',
        };
      });

      //使name关联value用于图例展示
      this.pieMap = {};

      this.pieData.forEach(i => {
        this.pieMap[i.name] = i.value;
      });

      //计算总和用于显示
      this.pieSum = this.pieData
        .reduce((sum, obj) => {
          return sum + Number(obj.value);
        }, 0);
    },
    /**
     * 绘制
     * @param val
     */
    paint(val) {
      this.chart.clear();
      this.chart.source(this.isBlank? [{ name: this.blankText, value: 200, const: 'const' }] : this.pieData);
      this.chart
        .interval()
        .position('const*value')
        .color('name', this.isBlank? this.blankColor: this.color)
        .adjust('stack');
      this.chart.guide().html({
        position: ['50%', '50%'],
        html: `<div style="text-align: center;">
          <div style="font-size: ${216 / remUnit}px;color: #999;">收入</div>
          <div style="font-size: ${288 / remUnit}px;color: #333;white-space: nowrap;">
            <strong>${this.pieSum.toFixed(2)}</strong><span style="font-size: ${216 /
          remUnit}px;color: #999;">${this.unit}</span>
          </div>
        </div>`,
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
      deep: true,
    },
  },
  created() {
    this.updateData();
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
