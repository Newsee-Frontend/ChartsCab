<template>
  <div class="data-statistics">
    <!--头部标题区域-->
    <ns-block-head>
      <template slot="sub">{{currentTimeTitle()}}</template>
      <template slot="right">
        <!--时间 - 年度 选择-->
        <ns-year-picker v-model="year" @change="changeYear">
          <div class="time-picker fr clear">
            <div>{{ year }} 年</div>
            <ns-icon name="play"></ns-icon>
          </div>
        </ns-year-picker>
      </template>
    </ns-block-head>

    <ns-row class="content-area" gutter="5">
      <ns-skeleton row="6" :loading="!finalData.length">
        <ns-col span="8" v-for="(item, index) in finalData" :key="index">
          <ns-data-box :content="item.content" :color="item.color"></ns-data-box>
        </ns-col>
      </ns-skeleton>
    </ns-row>


  </div>
</template>

<script>
  import create from '../../../utils/core/create-basic';
  import Mixins from './mixins';
  import baseMixins from '../../../mixins/index'
  import {getData} from '../../../service/fetch';
  import { Skeleton } from 'vant';

  export default create({
    name: 'data-statistics',
    mixins: [Mixins, baseMixins],
    components: {
      Skeleton
    },
    data() {
      return {
        /**
         * 查询入参指标队列
         * 总营收完成率  - 80 （包含计划总营收/实际总营收)
         * 项目数量 - 307
         * 项目面积 - 14
         * 储备面积 - 337
         * @type {string[]}
         */
        ids_request: ['80', '307', '14', '337'],
        finalData: [],
      };
    },

    created() {
      this.getRevenueData();
    },
    computed: {
      query() {
        return this.ids_request.map(i => {
          return {
            targetItemID: i,
            targetLevel: 2,
            departmentID: this.departmentId,
            repotyType: 0,  //本年有季度，月份， 其他没有
            date: this.year === this.thisYear ? '' : this.year, //all、yyyy、yyyymm
          };
        });
      }
    },
    methods: {
      /**
       * 获取当前条件下的数据
       */
      getRevenueData() {
        console.log('入参：');
        console.log(this.query);
        //发起请求数据
        getData(this.query).then(res => {

          console.log('请求返回数据:');
          console.log(res);

          /**
           * 通过 id 和 key 查询控制器，锁定渲染配置对象，输出渲染数据队列
           * @type {*[]}
           */
          const ids_render = [
            {id: '80', key: 'actualDenominator'},//计划总营收
            {id: '80', key: 'actualNumerator'},//实际总营收
            {id: '80', key: 'actualTarget'},//总营收完成率
            {id: '307', key: 'actualTarget'},//项目数量
            {id: '14', key: 'actualTarget'},//项目面积
            {id: '337', key: 'actualTarget'},//储备面积
          ];


          //分段数据 - 单个数据块的数据处理
          const subdata = this.singleBoxDataHandle(res, ids_render);

          console.log('分段数据 - 单个数据块的数据处理');
          console.log(subdata);

          //最终赋值
          this.finalData = this.drawTheme(subdata);//数据块主题上色


          console.log('最终赋值-最终赋值');
          console.log(this.finalData);
          console.log('最终赋值-最终赋值')

        });
      },


      /**
       * 数据块主题上色
       * @param data
       * @returns {*}
       */
      drawTheme(data) {
        return data.map((item, index) => {
          const colorKey = Object.keys(this.palette)[index];
          return {
            content: item,
            color: colorKey ? this.palette[colorKey].color : ''
          };
        });
      },

      changeYear() {
        this.getRevenueData()
      }
    },
  });
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .data-statistics {
    .time-picker {
      margin-top: 7px;
    }
  }
</style>
