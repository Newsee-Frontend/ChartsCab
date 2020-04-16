<template>
  <div class="employee-composition">
    <ns-tabs
      swipeable
      class="line-tab"
      line-width="84px"
      line-height="2px"
      v-model="activeIndex"
      @change="changeTab"
    >
      <ns-tab v-for="(tab, tabIndex) in tabList" :title="tab" :name="tabIndex" :key="tabIndex">
      </ns-tab>
    </ns-tabs>
    <ns-pie-charts centerText="员工构成<br>情况" unit="%" :data="pieData"></ns-pie-charts>
    <!-- <div class="chart-select">
      <div
        class="chart-select__item"
        :class="index === activeIndex ? 'active' : ''"
        v-for="(item, index) in tabList"
        :key="index"
        v-html="item"
        @click="changeTab(index)"
      ></div>
    </div> -->
  </div>
</template>

<script>
import create from '../../utils/core/create';
import { Tab, Tabs } from 'vant';
import pieCharts from '../Charts/pieCharts/pieCharts';
import { getData } from '../../service/fetch';
import baseMixins from '../../mixins/index';

export default create({
  name: 'employee-composition',
  components: {
    Tab,
    Tabs,
    pieCharts,
  },

  mixins: [baseMixins],

  props: {
    departmentId: [Number, String],
  },
  data() {
    return {
      activeIndex: 0,
      tabList: ['员工学历构成', '员工司龄构成', '员工年龄构成'],
      orgData: [],
      pieData: [],
      ids: ['209', '211', '210'],
    };
  },
  methods: {
    //重刷
    refresh() {
      this.getPieData();
    },

    changeTab(val) {
      this.activeIndex = val;
      this.pieData = this.orgData[this.ids[this.activeIndex]].map(i => ({
        name: i.targetItem,
        value: Number(i.actualTarget),
      }));
    },

    getPieData() {
      let params = this.ids.map(i => {
        return this.getQueryByFactory({
          targetItemID: i,
          childTargetName: 'all',
          repotyType: '3',
          date: this.isCurrentYear
            ? this.global_year + (new Date().getMonth() + 1).toString().padStart(2, '0')
            : this.global_year + '12',
        });
      });
      console.log('饼图', params);
      getData(params).then(res => {
        this.orgData = res;
        this.changeTab(this.activeIndex);
      });
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
