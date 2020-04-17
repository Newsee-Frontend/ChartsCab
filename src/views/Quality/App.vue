<!--首页-->
<template>
  <ns-layout :title="departmentName">
    <ns-data-statistics class="container-block" columns="2" :idList="idList"></ns-data-statistics>
    <ns-block-head>
      <template #main>品质巡检信息</template>
    </ns-block-head>
    <ns-property-statistics
      class="quality-data"
      :activeName="0"
      :idList="idList2"
    ></ns-property-statistics>
    <ns-block-head>
      <template #main>工程巡检信息</template>
    </ns-block-head>
    <ns-property-statistics
      class="quality-data"
      :activeName="0"
      :idList="idList3"
    ></ns-property-statistics>
    <ns-position-info
      v-if="getUrlParam('targetLevel') !== '4'"
      :titleText="[getUrlParam('targetLevel') !== '1' ? '城市公司排名' : '项目服务排名']"
      :tabList="tabList"
      :tables="tables"
      curDirname="Quality"
    ></ns-position-info>
  </ns-layout>
</template>

<script>
import create from '../../utils/core/create';
import { dataStatistics, BlockHead, propertyStatistics, PositionInfo } from './index';
import baseMixins from '../../mixins/index';

export default create({
  name: 'Quality',
  mixins: [baseMixins],
  components: {
    dataStatistics,
    BlockHead,
    propertyStatistics,
    PositionInfo,
  },
  data() {
    return {
      idList: [
        { id: '22', key: 'actualTarget' }, //督导完成合格率
        { id: '32', key: 'actualTarget' }, //PDA巡检完成率
      ],
      idList2: [
        { id: '28', key: 'actualDenominator' },
        { id: '28', key: 'actualNumerator' },
        { id: '28', key: 'actualTarget' }, //品质巡检完成率
      ],
      idList3: [
        { id: '32', key: 'actualDenominator' },
        { id: '32', key: 'actualNumerator' },
        { id: '32', key: 'actualTarget' }, //工程巡检完成率
      ],
      tabList: [
        { title: '督导完成率', name: 'a' },
        { title: 'PDA巡检完成率', name: 'b' },
      ],
      tables: {
        a: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualTarget', label: '督导完成率', unit: '%' },
          ],
          key: '22',
          orderBy: 'actualTarget',
        },
        b: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualTarget', label: 'PDA巡检完成率', unit: '%' },
          ],
          key: '32',
          orderBy: 'actualTarget',
        },
      },
    };
  },
});
</script>

<style rel="stylesheet/scss" lang="scss">
.quality-data {
}
</style>
