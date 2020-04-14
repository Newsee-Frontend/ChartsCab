<!--首页-->
<template>
  <ns-layout :title="departmentName">
    <ns-data-statistics class="container-block" :idList="idList"></ns-data-statistics>
    <ns-block-head>
      <template #main>员工构成情况</template>
    </ns-block-head>
    <ns-block-head>
      <template #main>薪资支出情况 (万元)</template>
    </ns-block-head>
    <ns-line-charts id="salary" :data="lineChartData"></ns-line-charts>
    <ns-position-info
      v-if="getUrlParam('targetLevel') !== '4'"
      :titleText="['城市公司排名', '']"
      :tabList="tabList"
      :tables="tables"
      curDirname="Employee"
    ></ns-position-info>
  </ns-layout>
</template>

<script>
import create from '../../utils/core/create';
import {
  dataStatistics,
  propertyStatistics,
  BlockHead,
  lineCharts,
  pieCharts,
  positionInfo,
} from './index';
import baseMixins from '../../mixins/index';
import { getData } from '../../service/fetch';
import { getAllMonths } from '../../utils/library/date';
export default create({
  name: 'Service',
  mixins: [baseMixins],
  components: {
    dataStatistics,
    propertyStatistics,
    BlockHead,
    lineCharts,
    pieCharts,
    positionInfo,
  },
  data() {
    return {
      idList: [
        { id: '283', key: 'actualDenominator' }, //业主满意率
        { id: '283', key: 'actualNumerator' }, //客户投诉数量
        { id: '283', key: 'actualTarget' }, //投诉完成率
      ],
      lineChartData: [],
      pieChartData: [],
      tabList: [
        { title: '服务满意率', name: 'a' },
        { title: '工单全部数量', name: 'b' },
        { title: '工单投诉数量', name: 'c' },
      ],
      tables: {
        a: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualTarget', label: '服务满意率', unit: '%' },
          ],
          key: '20',
          orderBy: 'actualTarget',
        },
        b: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualDenominator', label: '总数' },
            { value: 'actualTarget', label: '完成率', unit: '%' },
            { value: 'actualNumerator', label: '完成数' },
          ],
          key: '285',
          orderBy: 'actualNumerator',
        },
        c: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualDenominator', label: '总数' },
            { value: 'actualTarget', label: '完成率', unit: '%' },
            { value: 'actualNumerator', label: '完成数' },
          ],
          key: '206',
          orderBy: 'actualNumerator',
        },
      },
    };
  },
  methods: {
    getLineChartData(val) {
      const line_requestId = 205;
      let params = [
        this.getQueryByFactory({
          targetItemID: line_requestId,
          repotyType: 3,
          date: getAllMonths(2),
        }),
      ];
      console.log('折线图', params);
      getData(params).then(res => {
        this.lineChartData = res[line_requestId].map(i => ({
          time: i.date.slice(4),
          value: Number(i['actualTarget']),
          type: i.date.slice(0, 4),
        }));
      });
    },
    getPieChartData(val) {
      const pie_requestId = 76;
      let params = [
        this.getQueryByFactory({
          targetItemID: pie_requestId,
          repotyType: 0,
          date: this.isCurrentYear ? '' : this.global_year,
          childTargetName: 'all',
        }),
      ];
      console.log('饼图', params);
      getData(params).then(res => {
        this.pieChartData = res[pie_requestId].map(i => ({
          name: i.targetItem,
          value: i.actualTarget,
        }));
      });
    },
    refresh() {
      this.isCurrentYear && this.getLineChartData();
      this.getPieChartData();
    },
  },
  created() {
    this.getLineChartData();
    this.getPieChartData();
  },
});
</script>

<style lang="scss" scoped>
.pie-chart-container {
  padding: 16px 0;
}
</style>
