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
  import {mapGetters} from 'vuex';
  import {deadline} from '../../utils/library/time';

  export default create({
    name: 'yearPicker',
    components: {
      Picker,
      Popup,
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

    computed: {
      ...mapGetters(['global_year']),
    },

    watch: {
      global_year(val){
        this.currentYear = val;
      }
    },

    methods: {
      getArray() {
        let currentYear = new Date().getFullYear();
        this.columns = Array.from({length: 50}, (v, i) => {
          return currentYear - i;
        });
      },

      onClose() {
        this.currentYear = this.global_year;
        this.$refs.yearPicker.setValues([this.currentYear]);
        this.showPicker = false;
      },

      changePicker(item, val) {
        this.currentYear = val;
      },

      confirm() {
        this.showPicker = false;
        this.$store.dispatch('setGlobalYear', this.currentYear);
        deadline.splice(0);
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
