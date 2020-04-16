<!--首页-->
<template>
  <ns-layout :title="departmentName">
    <ns-data-statistics class="container-block" :idList="idList"></ns-data-statistics>
    <ns-block-head>
      <template #main>员工构成情况</template>
    </ns-block-head>
    <ns-employee-composition></ns-employee-composition>
    <ns-block-head>
      <template #main>薪资支出情况 (万元)</template>
    </ns-block-head>
    <ns-line-charts id="salary" :data="lineChartData"></ns-line-charts>
    <ns-position-info
      v-if="getUrlParam('targetLevel') !== '4'"
      :titleText="[getUrlParam('targetLevel') !== '1' ? '城市公司排名' : '项目服务排名', '单位: 人']"
      :tabList="tabList"
      :tables="tables"
      curDirname="Employee"
    ></ns-position-info>
  </ns-layout>
</template>

<script>
import create from '../../utils/core/create';
import { dataStatistics, BlockHead, employeeComposition, lineCharts, positionInfo } from './index';
import baseMixins from '../../mixins/index';
import { getData } from '../../service/fetch';
import { getAllMonths } from '../../utils/library/date';
export default create({
  name: 'Employee',
  mixins: [baseMixins],
  components: { dataStatistics, BlockHead, employeeComposition, lineCharts, positionInfo },
  data() {
    return {
      idList: [
        { id: '283', key: 'actualDenominator' }, //总员工数
        { id: '283', key: 'actualNumerator' }, //薪酬总支出
        { id: '283', key: 'actualTarget' }, //薪酬平均支出
      ],
      lineChartData: [],
      tabList: [
        { title: '员工人数', name: 'a' },
        { title: '员工入职率', name: 'b' },
        { title: '员工离职率', name: 'c' },
      ],
      tables: {
        a: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualDenominator', label: '员工人数' },
          ],
          key: '283',
          orderBy: 'actualDenominator',
        },
        b: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualTarget', label: '员工入职率', unit: '%' },
          ],
          key: '222',
          orderBy: 'actualTarget',
        },
        c: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualTarget', label: '员工离职率', unit: '%' },
          ],
          key: '224',
          orderBy: 'actualTarget',
        },
      },
    };
  },
  methods: {
    getLineChartData(val) {
      const line_requestId = 283;
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
          value: Number(i['actualNumerator']),
          type: i.date.slice(0, 4),
        }));
      });
    },
    refresh() {
      this.isCurrentYear && this.getLineChartData();
    },
  },
  created() {
    this.getLineChartData();
  },
});
</script>

<style lang="scss" scoped>
.pie-chart-container {
  padding: 16px 0;
}
</style>
