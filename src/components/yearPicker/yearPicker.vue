<template>
  <div class="year-picker">
    <ns-popup position="bottom" v-model="showPicker" @close="onClose" custom-style="height: 20%">
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
    <div class="year-picker__value" @click="showPicker = true">
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
        showPicker: false,
        columns: [],
        currentYear: '',
        defaultIndex: 0,
      };
    },

    created() {
      this.getArray();
    },

    watch: {
      value: {
        handler(val) {
          this.currentYear = val;

          this.$nextTick(() => {
            this.defaultIndex = this.columns.findIndex(i => i === this.currentYear) || 0;
          });

        },
        immediate: true,
      },
    },

    methods: {
      getArray() {
        let currentYear = new Date().getFullYear();
        this.columns = Array.from({length: 50}, (v, i) => {
          return currentYear - i;
        });
      },

      onClose() {
        this.currentYear = this.value;
        this.$refs.yearPicker.setValues([this.currentYear]);
        this.showPicker = false;
      },

      changePicker(item, val) {
        this.currentYear = val;
      },

      confirm() {
        this.showPicker = false;


        this.$emit('input', this.currentYear);

        if (this.value !== this.currentYear) {
          this.$emit('change', this.currentYear);
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
