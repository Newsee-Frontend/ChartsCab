<template>
  <div class="year-picker">
    <ns-popup position="bottom" v-model="show" @close="onClose" custom-style="height: 20%">
      <ns-picker
        ref="yearPicker"
        :columns="columns"
        :show-toolbar="true"
        :defaultIndex="defaultIndex"
        @cancel="onClose"
        @confirm="confirm"
        @change="changePicker"
      ></ns-picker>
    </ns-popup>
    <div class="year-picker__value" @click="show = true">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {Picker, Popup} from 'vant';
  import create from '../../utils/core/create';

  export default create({
    name: 'yearPicker',
    components: {
      Picker,
      Popup,
    },

    props: {
      value: [Number, String],
    },

    data() {
      return {
        show: false,
        columns: [],
        year: '',
        defaultIndex: 0,
      };
    },

    created() {
      this.getArray();
    },

    watch: {
      value: {
        handler(val) {
          this.year = val;
          this.$nextTick(() => {
            this.defaultIndex = this.columns.findIndex(i => i === this.year) || 0;
          });
        },
        immediate: true,
      },
    },

    methods: {
      getArray() {
        let year = new Date().getFullYear();
        this.columns = Array.from({length: 50}, (v, i) => {
          return year - i;
        });
      },

      onClose() {
        this.year = this.value;
        this.$refs.yearPicker.setValues([this.year]);
        this.show = false;
      },

      changePicker(item, val) {
        this.year = val;
      },

      confirm() {
        this.show = false;
        this.$emit('input', this.year);
        if (this.value !== this.year) {
          this.$emit('change', this.year);
        }
      },
    },
  });
</script>

<style rel="stylesheet/scss" lang="scss">
  .time-picker {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(44, 115, 223, 1);
    border-radius: 13px;
    padding: 4px 8px;
    font-size: 12px;
    line-height: 0;
    .van-icon-play {
      transform: rotate(90deg);
      margin-left: 3px;
    }
  }

</style>
