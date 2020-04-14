<template>
  <div class="employee-composition">
    <!-- <ns-column-bar-charts :data="barData" id="propertyFeeChart"></ns-column-bar-charts> -->
    <div class="chart-select">
      <div
        class="chart-select__item"
        :class="index === activeIndex ? 'active' : ''"
        v-for="(item, index) in tabList"
        :key="index"
        v-html="item"
        @click="changeTab(index)"
      ></div>
    </div>
  </div>
</template>

<script>
import create from '../../utils/core/create';
// import columnBarCharts from '../Charts/columnBarCharts/columnBarCharts';
import { getData } from '../../service/fetch';
import baseMixins from '../../mixins/index';

export default create({
  name: 'employee-composition',
  components: {
    // columnBarCharts
  },

  mixins: [baseMixins],

  props: {
    departmentId: [Number, String],
  },
  data() {
    return {
      activeIndex: 0,
      tabList: ['员工学历<br>构成', '员工司龄<br>构成', '员工年龄<br>构成'],
      barData: [],
      orgData: [],

      idList: [
        { id: '209', key: 'actualDenominator' }, //计划总营收
        { id: '211', key: 'actualNumerator' }, //实际总营收
        { id: '210', key: 'actualTarget' }, //总营收完成率
      ],
    };
  },
  methods: {
    //重刷
    refresh() {
      this.getColumnBarData();
    },

    changeTab(val) {
      this.activeIndex = val;
      // let attrs = ['actualDenominator', 'actualNumerator', 'actualTarget'];
      // let index = this.activeFeeType[this.activeName];
      // this.barData = this.orgData[this.ids[this.activeName]].map(i => ({
      //   name: i.departmentName,
      //   value: Number(i[attrs[index]]),
      // }));
    },

    getColumnBarData() {
      // let params = this.ids.map(i => {
      //   return this.getQueryByFactory({
      //     targetItemID: i,
      //     childTargetName: 'all',
      //     repotyType: '3',
      //   }, true);
      // });
      // console.log('条形图NEXT', params);
      // getData(params).then(res => {
      //   this.ids.forEach((item, index) => {
      //     this.tabData[index].showBtn = res[item].length > 10 ? true : false;
      //     this.tabData[index].isLimited = this.tabData[index].showBtn;
      //   });
      //   this.orgData = res;
      //   this.changeTab2();
      // });
    },
  },

  created() {
    this.refresh();
  },
});
</script>

<style rel="stylesheet/scss" lang="scss">
.employee-composition {
  .chart-select {
    display: flex;
    justify-content: space-between;
    &__item {
      flex: 1;
      text-align: center;
      color: rgb(102, 102, 102);
      background: rgba(242, 243, 246, 1);
      border-radius: 4px;
      padding: 7px 0;
      margin: 0 5px;
      font-size: 12px;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
      &.active {
        color: rgba(79, 155, 255, 1);
        background: rgba(231, 240, 251, 1);
      }
    }
  }
}
</style>
