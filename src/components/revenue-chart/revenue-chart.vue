<template>
  <div class="income-chart container-block">
    <!--头部标题区域-->
    <ns-block-head>
      <template slot="main">年度营收金额/完成率</template>
    </ns-block-head>

    <div class="manager-block__body">
      <ns-tabs class="line-tab" swipeable line-width="80px" line-height="2px" @change="changeTab">
        <ns-tab title="年度营收金额" name="amount"></ns-tab>
        <ns-tab title="营收完成率" name="rate"></ns-tab>
        <ns-tab title="在管面积趋势" name="area"></ns-tab>
      </ns-tabs>

      <ns-line-charts :data="lineData"></ns-line-charts>

      <div class="chart-select">
        <div
          class="chart-select__item"
          v-for="item in list[activeType]"
          :key="item.value"
          @click="changeSelect(item.value)"
          :class="item.value === activeOption[activeType] ? 'active' : ''"
          v-html="item.label"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockHead from '../Block/Block-head/Block-head';
import lineCharts from '../Charts/lineCharts/lineCharts';
import { Tabs, Tab } from 'vant';
import create from '../../utils/core/create';
import { getData } from '../../service/fetch';
import { getAllMonths } from '../../utils/library/date';
import baseMixins from '../../mixins/index';

export default create({
  name: 'managerIncomeChart',

  mixins: [ baseMixins ],

  components: {
    BlockHead,
    lineCharts,
    Tabs,
    Tab,
  },

  data() {
    return {
      activeType: 'amount',
      activeOption: {
        amount: 0,
        rate: 3,
        area: 6,
      },

      list: {
        amount: [
          { value: 0, label: '年度营收</br>趋势' },
          { value: 1, label: '物业费营收</br>趋势' },
          { value: 2, label: '物业费清欠</br>趋势' },
        ],
        rate: [
          { value: 3, label: '年度营收</br>趋势' },
          { value: 4, label: '物业费营收</br>趋势' },
          { value: 5, label: '物业费清欠</br>趋势' },
        ],
        area: [],
      },
      lineData: [],
      orgData: {},
    };
  },

  methods: {
    refresh() {
      this.getLineData();
    },
    
    changeSelect(val) {
      this.activeOption[this.activeType] = val;
      this.getRevenueChartData();
    },

    changeTab(val) {
      this.activeType = val;
      this.getRevenueChartData(val === 'area' ? 6 : -1);
    },

    /**
     * 获取图的信息
     */
    getRevenueChartData(val) {
      let ids = [80, 256, 266, 80, 256, 266, 14];
      let index = val > 0 ? val : this.activeOption[this.activeType];
      this.lineData = this.orgData[ids[index]].map(i => ({
        time: i.date.slice(4),
        value: Number(i[index < 3 ? 'actualNumerator' : 'actualTarget']),
        type: i.date.slice(0, 4),
      }));
    },


    getLineData() {
      let ids = [80, 256, 266, 14];

      let params = ids.map( i=> {
        return this.getQueryByFactory({
          targetItemID: i,
          repotyType: 3,
          date: getAllMonths(2, this.global_year)
        })
      });
      console.log('折线图',params)
      getData(params).then(res => {
        this.orgData = res;
        this.changeSelect(0);
      });
    },
  },

  created() {
    this.getLineData()
  },
});
</script>

<style rel="stylesheet/scss" lang="scss">
.income-chart {
  font-size: 13px;
  .chart {
    width: 100%;
    height: 200px;
    display: none;
    &.active {
      display: block;
    }
  }
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
