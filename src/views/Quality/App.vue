<!--首页-->
<template>
  <ns-layout :title="departmentName">
    <ns-data-statistics class="container-block" :idList="idList"></ns-data-statistics>
    <ns-property-fee></ns-property-fee>
    <ns-revenue-chart></ns-revenue-chart>
    <ns-position-info></ns-position-info>
  </ns-layout>
</template>

<script>
  import create from '../../utils/core/create';
  import { dataStatistics, propertyFee, revenueChart, PositionInfo } from './index';
  import baseMixins from '../../mixins/index';

  export default create({
    name: 'Quality',
    mixins: [baseMixins],
    components: {
      PositionInfo,
      revenueChart,
      dataStatistics,
      propertyFee,
    },
    data() {
      return {
        idList: [
          { id: '80', key: 'actualDenominator' }, //计划总营收
          { id: '80', key: 'actualNumerator' }, //实际总营收
          { id: '80', key: 'actualTarget' }, //总营收完成率
          { id: '307', key: 'actualTarget' }, //项目数量
          { id: '14', key: 'actualTarget' }, //项目面积
          { id: '337', key: 'actualTarget' }, //储备面积
        ],
      };
    },
  });
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
