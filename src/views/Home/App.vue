<!--首页-->
<template>
  <ns-layout>
    <ns-data-statistics class="container-block" :idList="idList" :noteList="noteList"></ns-data-statistics>
    <ns-property-fee></ns-property-fee>
    <ns-revenue-chart></ns-revenue-chart>
    <ns-position-info
      :titleText="[getUrlParam('targetLevel') !== '1' ? '城市公司排名' : '项目服务排名', '单位: 万元']"
      :tabList="tabList"
      :tables="tables"
      curDirname="Home"
      detailDirname="HomeDetails"
    ></ns-position-info>
  </ns-layout>
</template>

<script>
import create from '../../utils/core/create';
import { dataStatistics, propertyFee, revenueChart, PositionInfo } from './index';
import baseMixins from '../../mixins/index';

export default create({
  name: 'ManagerCab',
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
      noteList: [
        {id: '207', type: '计划同比'},
        {id: '207', type: '月度'},
        {id: '80', type: '环比'},
        {id: '307', type: '月度'},
        {id: '14', type: '月度'},
        {id: '337', type: '同比'},
      ],
      tabList: [
        { title: '营业完成金额', name: 'businessCompletionAmount' },
        { title: '物业费收缴金额', name: 'feeCollectionAmount' },
        { title: '在管项目面积', name: 'projectAreaUnderManagement' },
      ],
      tables: {
        businessCompletionAmount: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualDenominator', label: '计划金额' },
            { value: 'actualTarget', label: '完成率', unit: '%' },
            { value: 'actualNumerator', label: '完成金额' },
          ],
          key: '80',
          orderBy: 'actualNumerator',
        },
        feeCollectionAmount: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'actualDenominator', label: '应收金额' },
            { value: 'actualTarget', label: '完成率', unit: '%' },
            { value: 'actualNumerator', label: '实收金额' },
          ],
          key: '256',
          orderBy: 'actualNumerator',
        },
        projectAreaUnderManagement: {
          list: [
            { value: 'departmentName', label: '区域名称' },
            { value: 'shouldTarget', label: '计划面积' },
            { value: 'actualTarget', label: '实际完成面积' },
          ],
          key: '14',
          orderBy: 'actualTarget',
        },
      },
    };
  },
});
</script>

<style rel="stylesheet/scss" lang="scss"></style>
