<template>
  <div class="data-statistics" style="position: relative">
    <div class="tab-line">
      <ns-tabs class="bg-radius-tab" @change="changeTab" v-model="tabValue" v-show="isCurrentYear">
        <ns-tab v-for="tab in tablist" :title="tab.title" :key="tab.title" :name="tab.name"></ns-tab>
      </ns-tabs>

      <!--时间 - 年度 选择-->
      <ns-year-picker>
        <div class="time-picker fr clear">
          <div>{{ global_year }} 年</div>
          <ns-icon name="play"></ns-icon>
        </div>
      </ns-year-picker>

      <!--头部标题区域-->
      <ns-block-head class="detail-head">
        <template slot="sub">
          <div :class="isCurrentYear ? '' : 'no-tab'">{{deadlineTitle}}</div>
        </template>
      </ns-block-head>
    </div>

    <div class="body-area">
      <ns-row class="content-area" gutter="5">
        <ns-skeleton row="8" :loading="!finalData.length">
          <ns-col span="8" v-for="(item, index) in finalData" :key="index">
            <ns-data-box :content="item.content" :color="item.color" :back="item.back"></ns-data-box>
          </ns-col>
        </ns-skeleton>
      </ns-row>
    </div>

    <div class="pie-chart-container">
      <ns-pie-charts unit="万" :data="pieData"></ns-pie-charts>
    </div>

  </div>
</template>

<script>
  import create from '../../../utils/core/create';
  import { Tab, Tabs, Skeleton } from 'vant';
  import pieCharts from '../../Charts/pieCharts/pieCharts';
  import Mixins from './mixins';
  import baseMixin from '../../../mixins/index';
  import { getData } from '../../../service/fetch';

  export default create({
    name: 'data-statistics',

    mixins: [Mixins, baseMixin],

    components: {
      Tabs,
      Tab,
      Skeleton,
      pieCharts,
    },

    data() {
      return {
        //组装入参
        ids_request: ['80', '256', '266'],
        tablist: [{ title: '本月', name: 3 }, { title: '本季度', name: 2 }, { title: '本年', name: 0 }],
        tabValue: 3,
        thisYear: new Date().getFullYear(),
        year: new Date().getFullYear(),
        finalData: [],
        pieData: [],
      };
    },

    created() {
      this.refresh();
    },


    methods: {
      //获取当前条件下的数据
      refresh() {
        this.getDataBox();     //数据块
        this.getPieChart();    //饼图
      },

      //数据块
      getDataBox() {
        //入参
        const query = this.ids_request.map(i => {
          return this.getQueryByFactory({
            targetItemID: i,
            repotyType: this.isCurrentYear ? this.tabValue : 0,
            date: this.isCurrentYear? '' : this.global_year
          });
        });
        console.log('数据块',query)
        getData(query).then(res => {

          console.log('请求返回数据:');
          console.log(res);

          /**
           * 通过 id 和 key 查询控制器，锁定渲染配置对象，输出渲染数据队列
           * @type {*[]}
           */
          const ids_render = [
            { id: '80', key: 'actualDenominator' },//计划总营收
            { id: '80', key: 'actualNumerator' },//实际总营收
            { id: '80', key: 'actualTarget' },//总营收完成率
            { id: '256', key: 'actualDenominator' },//项目数量
            { id: '256', key: 'actualNumerator' },//项目面积
            { id: '256', key: 'actualTarget' },//储备面积
            { id: '266', key: 'actualDenominator' },//项目数量
            { id: '266', key: 'actualNumerator' },//项目面积
            { id: '266', key: 'actualTarget' },//储备面积
          ];

          //分段数据 - 单个数据块的数据处理
          const subdata = this.singleBoxDataHandle(res, ids_render);

          console.log('分段数据 - 单个数据块的数据处理');
          console.log(subdata);

          //最终赋值
          this.finalData = this.drawTheme(subdata);//数据块主题上色


          console.log('最终赋值-最终赋值');
          console.log(this.finalData);
          console.log('最终赋值-最终赋值');
        });
      },

      /**
       * 数据块主题上色
       * @param data
       * @returns {*}
       */
      drawTheme(data) {
        return data.map((item, index) => {
          let i = index % 3;
          const colorKey = Object.keys(this.palette)[i];
          return {
            content: item,
            color: colorKey ? this.palette[colorKey].color : '',
            back: colorKey ? this.palette[colorKey].back : '',
          };
        });
      },

      //饼图
      getPieChart() {
        const pie_requestId = 229;
        let params = [this.getQueryByFactory({
          targetItemID: pie_requestId,
          repotyType: this.isCurrentYear ? this.tabValue : 0,
          date: this.isCurrentYear? '' : this.global_year,
          childTargetName: 'all',
        })];
        console.log('饼图',params)
        getData(params).then(res => {
          this.pieData = (res[pie_requestId] || []).map(i => {
            return { name: i.targetItem, value: i.actualTarget };
          });
        });
      },

      //月、季度、年的修改
      changeTab() {
        this.refresh();
      },
    },
  });
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../../style/tab.scss';

  .data-statistics {
    .detail-head{
      padding: 0 12px;
    }
    .body-area {
      padding: 0 12px;
    }
    .tab-line {
      min-height: 44px;
      .time-picker {
        position: absolute;
        top: 0px;
        right: 5px;
        margin-top: 10px;
        display: flex;
      }
    }

    .no-tab {
      margin-top: 5px;
    }

    .pie-chart-container {
      position: relative;
      padding: 16px 0;
    }
  }


</style>
