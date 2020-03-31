<template>
  <div class="property-free container-block">
    <ns-tabs v-model="activeName" swipeable :border="false" class="bg-tab" @change="changeTab">
      <ns-tab
        class="tab-content"
        v-for="(tab, tabIndex) in tabData"
        :title="tab.title"
        :name="tabIndex"
        :key="tabIndex"
      >
        <ns-property-statistics :activeName="activeName" :departmentId="departmentId"></ns-property-statistics>
      </ns-tab>
    </ns-tabs>

    <ns-tabs
      v-model="activeFeeType[activeName]"
      class="line-tab"
      line-width="80px"
      line-height="2px"
      @change="changeTab2"
    >
      <ns-tab
        v-for="(tab, tabIndex) in tabFeeTypeData[activeName]"
        :title="tab.title"
        :name="tabIndex"
        :key="tabIndex"
      >
      </ns-tab>
    </ns-tabs>

    <ns-bar-charts :data="barData" id="propertyFeeChart"></ns-bar-charts>
  </div>
</template>

<script>
  import create from '../../utils/core/create';
  import {Tab, Tabs} from 'vant';
  import propertyStatistics from '../Block/Data-statistics/Property-statistics'
  import barCharts from '../Charts/barCharts/barCharts';
  import {getData} from '../../service/fetch';

  export default create({
    name: 'property-free',
    components: {
      propertyStatistics,
      barCharts,
      Tab,
      Tabs
    },
    props: {
      departmentId: [Number, String]
    },
    data() {
      return {

        activeName: 0,

        activeFeeType: [0, 0],

        tabData: [
          {
            title: '物业费收缴',
          },
          {
            title: '物业费欠费',
          },
        ],

        tabFeeTypeData: [
          [
            {
              title: '物业费应收',
            },
            {
              title: '物业费实收',
            },
            {
              title: '物业费收缴率',
            },
          ],
          [
            {
              title: '往年欠费',
            },
            {
              title: '往年欠费收缴',
            },
            {
              title: '往年欠费收缴率',
            },
          ],
        ],

        barData: [],
        orgData: [],
      };
    },
    methods: {
      changeTab() {
        this.activeFeeType[0] === this.activeFeeType[1] && this.changeTab2();
      },
      changeTab2(val) {
        let ids = [256, 266];
        let attrs = ['actualDenominator', 'actualNumerator', 'actualTarget'];
        let index = this.activeFeeType[this.activeName];
        this.barData = this.orgData[ids[this.activeName]].map(i => ({
          name: i.departmentName,
          value: Number(i[attrs[index]]),
        }));
      },
      getBarData() {
        var _this = this;
        getData([{targetItemID: 256, targetLevel: 1}, {targetItemID: 266, targetLevel: 1}]).then(res => {
          _this.orgData = res;
          _this.changeTab2();
        })
      }
    },

    created() {
      this.getBarData();
    },

  });
</script>

<style rel="stylesheet/scss" lang="scss">
  $perNum: 3;
  $perGap: 9px;
  .property-free {
    .tab-content {
      padding: 10px 0 0 0;
    }

    .line-tab {
      margin: 4px 0 10px 0;
    }
  }
</style>
