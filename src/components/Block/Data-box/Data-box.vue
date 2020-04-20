<!--数据单元盒子-->
<template>
  <div class="data-box" :style="{ 'background-color': back }">
    <p class="sub">{{ content.sub }}</p>
    <p class="main" :style="{ color: color }">
      <span class="main_num" :style="{ 'font-size': convertFontSize }">{{ content.num }}</span><span class="main_unit">{{ content.unit }}</span>
    </p>
    <!-- <div class="notes" v-show="content.notes.length" :style="{ 'justify-content': content.notes.length > 1 ? 'space-between' : 'center' }">
      <p v-for="(item, index) in content.notes" :key="index">
        <span class="notes_compare">{{ item.compare }}</span>
        <span class="notes_content" :style="{ color: item.num >= 0 ? palette['green'].color : palette['red'].color }">
          {{ item.num + item.unit }}
        </span>
      </p>
    </div> -->
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
          num: '',
          unit: '',
          // notes: [{
          //   compare: '',
          //   num: '',
          //   unit: '',
          // }],
        };
      },
    },
  },
  data() {
    return {
      palette
    }
  },
  computed: {
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
  box-sizing: border-box;
  text-align: center;
  p.sub {
    font-size: 10px;
    color: rgba(102, 102, 102, 1);
    line-height: 15px;
    // margin-bottom: 2px;
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
  div.notes {
    display: flex;
    font-size: 8px;
    font-weight: 400;
    color: rgba(127, 127, 127, 1);
    height: 12px;
    line-height: 12px;
    margin-top: 3px;
    >p{
      display: inline-block;
    }
  }
}
</style>
