<template>
  <div class="manager-block container-block">
    <!--头部标题区域-->
    <ns-block-head>
      <template slot="main">经营指标排名</template>
      <template slot="sub">{{`统计数据截止:${getTime()}`}}</template>
    </ns-block-head>

    <div class="manager-block__body">
      <ns-tabs class="line-tab" swipeable line-width="80px" line-height="2px">
        <ns-tab
          v-for="tab in tabList"
          :title="tab.title"
          :name="tab.name"
          :key="tab.name">
          <ns-position-table
            :column-list="tables[tab.name].list"
            :data="data[tab.name]"
            @clickColumn="clickColumn"
          ></ns-position-table>
        </ns-tab>
      </ns-tabs>
    </div>
  </div>
</template>

<script>
  import create from '../../utils/core/create';
  import {Tab, Tabs} from 'vant';
  import BlockHead from '../Block/Block-head/Block-head';
  import positionTable from './position-table';
  import {getTime} from '../../utils/library/time';
  import {getData} from '../../service/fetch';
  import qs from 'querystring'


  export default create({
    name: 'managePositionInfo',

    components: {
      Tab,
      Tabs,
      BlockHead,
      positionTable,
    },

    data() {
      return {
        isLoading: false,
        activeTab: 'businessCompletionAmount',

        tabList: [
          { title: '营业完成金额', name: 'businessCompletionAmount'},
          { title: '物业费收缴金额', name: 'feeCollectionAmount'},
          { title: '在管项目面积', name: 'projectAreaUnderManagement'},
        ],

        tables: {
          businessCompletionAmount: {
            list: [
              { value: 'departmentName', label: '区域名称', width: ""},
              { value: 'actualDenominator', label: '计划金额(万元)'},
              { value: 'actualTarget', label:'完成率', unit: '%'},
              { value: 'actualNumerator', label: '完成金额(万元)', unit: '万元'}
            ],
            key: '80',
            orderBy: 'actualNumerator'
          },
          feeCollectionAmount: {
            list: [
              { value: 'departmentName', label: '区域名称'},
              { value: 'actualDenominator', label: '应收金额'},
              { value: 'actualTarget', label:'完成率',unit: '%'},
              { value: 'actualNumerator', label: '实收金额',unit: '万元'}
            ],
            key: '256',
            orderBy: 'actualNumerator'
          },
          projectAreaUnderManagement: {
            list: [
              { value: 'departmentName', label: '区域名称'},
              { value: 'shouldTarget', label: '计划面积', unit: '万方'},
              { value: 'actualTarget', label: '实际完成面积', unit: '万方'},
            ],
            key: '14',
            orderBy: ''
          }
        },

        data: {
          businessCompletionAmount: [],
          feeCollectionAmount: [],
          projectAreaUnderManagement: [],
        },
      };
    },

    created(){
      this.getTableData();
    },

    methods: {
      getTime,

      clickColumn(item) {
        let {departmentID, departmentName} = item;
        qs.stringify({departmentID, departmentName});
        location.href = `../Details/index.html?${qs.stringify({departmentID, departmentName})}`;
      },


      getTableData(){
        const keys = ['80', '256', '14'];
        let query =  keys.map( i => {
          return {
            targetItemID: i,
            targetLevel: 1,
            repotyType: 0,
            date: new Date().getFullYear(),
          }
        });

        getData(query).then( res => {
          Object.keys(this.tables).forEach( i => {
            let tableName = i;
            let requestId = this.tables[tableName].key;
            this.data[tableName] = (res[requestId] || []);
            //根据字段排序
            let sortKey =  this.tables[tableName].orderBy;
            this.data[tableName].sort( (a,b) => {
              let aVal = +a[sortKey];
              let bVal = +b[sortKey];
              return aVal > bVal ? -1 : (bVal > aVal ? 1 : 0);
            });
          })
        })
      }
    },
  });
</script>

<style rel="stylesheet/scss" lang="scss"></style>
