<!--详情页-->
<template>
  <ns-layout :title="departmentName">
    <ns-data-statistics :departmentId="departmentId"></ns-data-statistics>

    <div class="container-block">
      <!--头部标题区域-->
      <ns-block-head>
        <template slot="main">近半年收入趋势</template>
      </ns-block-head>

      <div class="manage-block__body">
        <ns-line-charts id="incomeTrend " :data="halfYearList"></ns-line-charts>
      </div>
    </div>

    <div class="container-block">
      <!--头部标题区域-->
      <ns-block-head>
        <template slot="main">物业费收缴率趋势</template>
      </ns-block-head>

      <div class="manage-block__body">
        <ns-line-charts id="feeCollectionRateTrend" :data="feeCollectionRateList"></ns-line-charts>
      </div>
    </div>
  </ns-layout>
</template>

<script>
  import create from '../../utils/core/create';
  import {dataStatistics, BlockHead, lineCharts} from './index';
  import qs from 'querystring';
  import {getData} from '../../service/fetch';
  import {getRecentlyMonth, getFullYearMonth} from '../../utils/library/date'

  import {getUrlParam} from '../../utils/library/urlhandle'

  export default create({
    name: 'Details',

    components: {
      BlockHead,
      dataStatistics,
      lineCharts,
    },

    data() {
      return {
        departmentName: '',
        departmentId: '',

        halfYearList: [],
        feeCollectionRateList: []
      };
    },

    created() {
      let search = location.search.slice(1);

      const gcx = getUrlParam('departmentID');
      console.log(777777777777)
      console.log(777777777777)

      let params = qs.parse(search);
      this.departmentName = params.departmentName;
      this.departmentId = params.departmentID;

      console.log(search)
      console.log(gcx)
      console.log(this.departmentId)

      console.log(777777777777)


      //获取半年营收
      this.getHalfYearIncome();
      this.getFeeCollectionRate();
    },

    methods: {
      //近半年营收
      getHalfYearIncome() {
        let key = '207';
        let params = [{
          targetItemID: key,
          targetLevel: 1,
          departmentID: this.departmentId,
          date: getRecentlyMonth(6).join(','),
          repotyType: 3  //月份
        }];

        getData(params).then(res => {
          this.halfYearList = (res[key] || []).map(i => {
            return {time: i.date, value: +i.actualTarget, type: '近半年（万元）'}
          })
        })

      },

      //收缴率趋势
      getFeeCollectionRate() {
        let key = '256';
        let thisYear = new Date().getFullYear();
        let date = getFullYearMonth(thisYear).concat(getFullYearMonth(thisYear - 1));
        let params = [{
          targetItemID: key,
          targetLevel: 1,
          departmentID: this.departmentId,
          date: date.join(','),
          repotyType: 3  //月份
        }];

        getData(params).then(res => {
          this.feeCollectionRateList = (res[key] || []).map(i => {
            return {time: i.date.slice(-2), value: +i.actualTarget, type: i.date.slice(0, 4)}
          })
        })


      },
    }
  });
</script>

<style rel="stylesheet/scss" lang="scss"></style>
