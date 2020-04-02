<!--首页-->
<template>
  <ns-layout :title="departmentName">
    <ns-data-statistics class="container-block"></ns-data-statistics>
    <ns-property-fee></ns-property-fee>
    <ns-revenue-chart></ns-revenue-chart>
    <ns-position-info></ns-position-info>
  </ns-layout>
</template>

<script>
  import create from '../../utils/core/create';
  import { dataStatistics, propertyFee, revenueChart, lineCharts, PositionInfo } from './index';
  import baseMixins from '../../mixins/index';

  export default create({
    name: 'ManagerCab',
    mixins: [baseMixins],
    components: {
      PositionInfo,
      revenueChart,
      dataStatistics,
      propertyFee,
      lineCharts,
    }
  });
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
