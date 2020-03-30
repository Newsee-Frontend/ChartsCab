<!--首页-->
<template>
  <ns-layout title="管理驾驶舱">
    <ns-data-statistics class="container-block" :departmentId="departmentId"></ns-data-statistics>
    <ns-property-fee :departmentId="departmentId"></ns-property-fee>
    <ns-revenue-chart></ns-revenue-chart>
    <ns-position-info></ns-position-info>
  </ns-layout>
</template>

<script>
  import create from '../../utils/core/create';
  import {dataStatistics, propertyFee, revenueChart, lineCharts, PositionInfo} from './index';

  export default create({
    name: 'ManagerCab',
    components: {
      PositionInfo,
      revenueChart,
      dataStatistics,
      propertyFee,
      lineCharts,
    },
    data() {
      return {
        departmentId: ''
      };
    },
  });
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
