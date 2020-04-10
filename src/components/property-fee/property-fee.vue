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
        <ns-property-statistics :activeName="activeName" :idList="idList"></ns-property-statistics>
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
    <div class="bar-contanier" :class="tabData[activeName].isLimited ? 'is-limited' : ''">
      <ns-bar-charts :data="barData" id="propertyFeeChart"></ns-bar-charts>
      <div class="show-more" v-show="tabData[activeName].showBtn" @click="toggle">{{tabData[activeName].isLimited ? '查看更多' : '收起'}}</div>
    </div>
  </div>
</template>

<script>
  import create from '../../utils/core/create';
  import {Tab, Tabs} from 'vant';
  import propertyStatistics from '../Block/Data-statistics/Property-statistics'
  import barCharts from '../Charts/barCharts/barCharts';
  import {getData} from '../../service/fetch';
  import baseMixins from '../../mixins/index';


  export default create({
    name: 'property-free',
    components: {
      propertyStatistics,
      barCharts,
      Tab,
      Tabs
    },

    mixins: [baseMixins],

    props: {
      departmentId: [Number, String]
    },
    data() {
      return {

        activeName: 0,

        activeFeeType: [0, 0],

        ids: [256, 266],

        tabData: [
          {
            title: '物业费收缴',
            showBtn: false,
            isLimited: false,
          },
          {
            title: '物业费欠费',
            showBtn: false,
            isLimited: false,
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

        idList: [
          {id: '256', key: 'actualDenominator'},//计划总营收
          {id: '256', key: 'actualNumerator'},//实际总营收
          {id: '256', key: 'actualTarget'},//总营收完成率
          {id: '275', key: 'actualTarget'},//本年欠费
          {id: '266', key: 'actualDenominator'},//往年欠费
          {id: '266', key: 'actualNumerator'},//往年欠费收缴
          {id: '266', key: 'actualTarget'},//往年欠费收缴率
        ]
      };
    },
    methods: {
      //重刷
      refresh(){
        this.getBarData();
      },
      toggle(){
        this.tabData[this.activeName].isLimited = !this.tabData[this.activeName].isLimited;
      },

      changeTab() {
        this.activeFeeType[0] === this.activeFeeType[1] && this.changeTab2();
      },
      changeTab2(val) {
        let attrs = ['actualDenominator', 'actualNumerator', 'actualTarget'];
        let index = this.activeFeeType[this.activeName];
        this.barData = this.orgData[this.ids[this.activeName]].map(i => ({
          name: i.departmentName,
          value: Number(i[attrs[index]]),
        }));
      },

      getBarData() {
        let params = this.ids.map( i=> {
          return this.getQueryByFactory({
            targetItemID: i,
          }, true)
        });
        console.log('条形图NEXT',params)
        getData(params).then(res => {
          this.ids.forEach((item, index) => {
            this.tabData[index].showBtn = res[item].length > 10 ? true : false;
            this.tabData[index].isLimited = this.tabData[index].showBtn;
          });
          this.orgData = res;
          this.changeTab2();
        })
      }
    },

    created() {
      this.refresh();
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

    .bar-contanier{
      position: relative;
      overflow: hidden;
      &.is-limited{
        height: 275px;
        .show-more{
          position: absolute;
          bottom: 0;
          width: 100%;
        }
      }
      canvas{
        vertical-align: top;
      }
      .show-more{
        line-height: 25px;
        font-size: 14px;
        text-align: center;
        color: #a2a3a4;
        background: #fff;
      }
    }
  }
</style>
