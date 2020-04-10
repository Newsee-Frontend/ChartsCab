<template>
  <div class="manager-block container-block">
    <!--头部标题区域-->
    <ns-block-head>
      <template slot="main">{{titleText[0]}}</template>
      <template slot="right">{{titleText[1]}}</template>
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
  import {getData} from '../../service/fetch';
  import baseMixins from '../../mixins/index';
  import qs from 'querystring';

  export default create({
    name: 'managePositionInfo',

    mixins: [ baseMixins ],

    components: {
      Tab,
      Tabs,
      BlockHead,
      positionTable,
    },
    props: {
      titleText: {
        type: Array,
        default: () => []
      },
      // 标签页配置
      tabList: {
        type: Array,
        default: () => []
      },
      // 表格配置
      tables: {
        type: Object,
        default: () => ({})
      },
      // 当前目录名
      curDirname: String,
      // 详情页目录名
      detailDirname: {
        type: String,
        default: ''
      },
    },

    data() {
      return {
        isLoading: false,
        data: {},
      };
    },

    created(){
      this.refresh();
    },

    methods: {

      refresh(){
        this.getTableData();
      },

      clickColumn(item) {
        let {departmentID, departmentName, targetLevel} = item;
        let dir = targetLevel === '4' && this.detailDirname ? this.detailDirname : this.curDirname;
        location.href = `../${dir}/index.html?${qs.stringify({departmentID, departmentName, targetLevel})}`;
      },


      getTableData(){
        const keys = Object.values(this.tables).map(i => i.key);
        let query =  keys.map( i => {
          return this.getQueryByFactory({
            targetItemID: i,
          }, true)
        });
        console.log('表格NEXT',query)
        getData(query).then( res => {
          Object.keys(this.tables).forEach( i => {
            let tableName = i;
            let requestId = this.tables[tableName].key;
            this.$set(this.data, tableName, res[requestId] || []);
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

<style rel="stylesheet/scss" lang="scss">
  .manager-block{
    margin-top: 15px;
  }
</style>
