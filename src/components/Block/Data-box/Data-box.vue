<!--数据单元盒子-->
<template>
  <div class="data-box" :style="{ 'background-color': back }">
    <p class="sub">{{ content.sub }}</p>
    <p class="main" :style="{ color: color }">
      <span class="main_num" :style="{ 'font-size': convertFontSize }">{{ content.main.num }}</span><span class="main_unit">{{ content.main.unit }}</span>
    </p>
    <p class="notes" v-if="content.notes">
      <span class="notes_compare">{{ content.notes.compare }}</span>

      <span class="notes_content" :style="{ color: notes_num_color }">{{ notes_content }}</span>
    </p>
  </div>
</template>

<script>
import { palette, remUnit } from '../../../config';

export default {
  name: 'data-box',
  props: {
    color: { type: String, default: '#000' },
    back: { type: String, default: 'transparent' },
    perNum: { type: Number, default: 3 }, //每行几个
    content: {
      type: Object,
      default: () => {
        return {
          sub: '',
          main: {
            num: '',
            unit: '',
          },
          notes: {
            compare: '',
            num: '',
            unit: '',
          },
        };
      },
    },
  },
  computed: {
    notes_num() {
      return this.content.notes.num || '';
    },
    notes_unit() {
      return this.content.notes.unit || '';
    },
    notes_content() {
      return `${this.notes_num}${this.notes_unit}`;
    },
    notes_num_color() {
      return this.notes_num > 0 ? palette['green'].color : palette['red'].color;
    },
    convertFontSize() {
      const px = (24 / this.perNum) * 4 - 4;
      const rem = px / remUnit;
      return rem + 'rem';
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.data-box {
  padding: 10px 0;
  margin-bottom: 5px;
  box-sizing: border-box;
  text-align: center;
  p.sub {
    font-size: 10px;
    color: rgba(102, 102, 102, 1);
    line-height: 15px;
    margin-bottom: 2px;
  }
  p.main {
    .main_num {
      font-size: 24px;
      font-weight: bolder;
      line-height: 32px;
    }
    .main_unit {
      font-size: 10px;
      line-height: 16px;
      font-weight: 400;
    }
  }
  p.notes {
    font-size: 8px;
    font-weight: 400;
    color: rgba(127, 127, 127, 1);
    height: 12px;
    line-height: 12px;
    margin-top: 3px;
  }
}
</style>
