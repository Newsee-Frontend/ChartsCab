<!--首页-->
<template>
  <ns-layout :title="departmentName">
    <ns-data-statistics class="container-block" :idList="idList1"></ns-data-statistics>
    <ns-block-head>
      <template #main>客户投诉变化趋势</template>
    </ns-block-head>
    <ns-line-charts id="complaints" :data="lineChartData"></ns-line-charts>
    <ns-block-head>
      <template #main>客服工单数量</template>
    </ns-block-head>
    <ns-property-statistics class="work-order" :activeName="0" :idList="idList2"></ns-property-statistics>
    <div class="pie-chart-container">
      <ns-pie-charts centerText="受理电话<br>占比类别" :data="pieChartData"></ns-pie-charts>
    </div>
    <ns-position-info
      v-if="getUrlParam('targetLevel') !== '4'"
      :titleText="[getUrlParam('targetLevel') !== '1' ? '城市公司排名' : '项目服务排名', '单位: 个']"
      :tabList="tabList"
      :tables="tables"
      curDirname="Service"
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
      idList1: [
        { id: '20', key: 'actualTarget' }, //业主满意率
        { id: '205', key: 'actualTarget' }, //客户投诉数量
        { id: '206', key: 'actualTarget' }, //投诉完成率
      ],
      idList2: [
        { id: '285', key: 'actualDenominator' }, //全部工单数量
        { id: '285', key: 'actualNumerator' }, //完成总数量
        { id: '285', key: 'actualTarget' }, //完成率
      ],
      lineChartData: [],
      pieChartData: [],
      tabList: [
        { title: '服务满意率', name: 'a' },
        { title: '工单总数量', name: 'b' },
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
            { value: 'actualTarget', label: '工单总数量' },
          ],
          key: '26',
          orderBy: 'actualTarget',
        },
        c: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualTarget', label: '工单投诉数量'},
          ],
          key: '338',
          orderBy: 'actualTarget',
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
          date: getAllMonths(2, this.global_year),
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
      this.getLineChartData();
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
.work-order{
  margin-top: 5px;
}
.pie-chart-container {
  padding: 16px 0;
}
</style>
