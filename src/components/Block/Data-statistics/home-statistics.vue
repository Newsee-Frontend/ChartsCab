<template>
  <div class="home-data-statistics data-statistics">
    <!--头部标题区域-->
    <ns-block-head>
      <template slot="sub"><span class="time-title">{{deadlineTitle}}</span></template>
      <template slot="right">
        <!--时间 - 年度 选择-->
        <ns-year-picker>
          <div class="time-picker fr clear">
            <div>{{ global_year }} 年</div>
            <ns-icon name="play"></ns-icon>
          </div>
        </ns-year-picker>
      </template>
    </ns-block-head>

    <ns-row class="content-area" gutter="5">
      <ns-skeleton :row="idList.length" :loading="!finalData.length">
        <ns-col :span="24 / columns" v-for="(item, index) in finalData" :key="index">
          <ns-data-box :content="item.content" :notes="notes[index]" :color="item.color"></ns-data-box>
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
    props: {
      /**
       * 通过 id 和 key 查询控制器，锁定渲染配置对象，输出渲染数据队列
       */
      idList: {
        type: Array,
        default: () => []
      },
      noteList: {
        type: Array,
        default: () => []
      },
      columns: {
        type: [Number, String],
        default: 3
      }
    },
    data() {
      return {
        finalData: [],
        notes: []
      };
    },

    created() {
      this.refresh();
      console.log(this.noteQuery)
    },

    computed: {
      query() {
        return [...new Set(this.idList.map(i => i.id))].map(i => {
          return this.getQueryByFactory({
            targetItemID: i,
          });
        });
      },
      noteQuery(){
        let newArr = [[]];
        this.noteList.forEach((item, itemIndex) => {
          item.index = itemIndex;
          let index = 0;
          for(let i = 0; i < newArr.length; i++){
            if(!newArr[i].find(obj => obj.id === item.id)){
              index = i;
              break;
            }else{
              i === newArr.length - 1 && (index = i + 1);
            }
          }
          newArr[index] ? newArr[index].push(item) : newArr[index] = [item];
        });
        return newArr;
      }
    },

    methods: {
      refresh(){
        this.getRevenueData()
      },

      /**
       * 获取当前条件下的数据
       */
      getRevenueData() {
        //发起请求数据
        console.log('数据块1',this.query)
        getData(this.query).then(res => {

          console.log('请求返回数据:');
          console.log(res);

          //分段数据 - 单个数据块的数据处理
          const subdata = this.singleBoxDataHandle(res, this.idList);

          console.log('分段数据 - 单个数据块的数据处理');
          console.log(subdata);

          //最终赋值
          this.finalData = this.drawTheme(subdata);//数据块主题上色


          console.log('最终赋值-最终赋值');
          console.log(this.finalData);
          console.log('最终赋值-最终赋值')

        });
        //获取备注数据
        this.noteQuery.forEach((item, index) => {
          let ids = item.map(i => i.id);
          let query = item.map(i => {
            let theMonth = this.global_year + (new Date().getMonth() + 1).toString().padStart(2, 0);
            switch(i.type){
              case '月度':
                return this.getQueryByFactory({
                  targetItemID: i.id,
                  repotyType: 3,
                  date: theMonth
                });
              case '环比':
                return this.getQueryByFactory({
                  targetItemID: i.id,
                  date: theMonth,
                  repotyType: 3,
                  compared: 1,
                });
              case '同比':
              case '计划同比':
                return this.getQueryByFactory({
                  targetItemID: i.id,
                  date: theMonth,
                  compared: 0,
                });
              default:
                return this.getQueryByFactory({
                  targetItemID: i.id,
                });
            }
          });
          getData(query).then(res => {
            // Object.keys()
          });
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
    },
  });
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .data-statistics {
    .time-picker {
      margin-top: 7px;
    }

    .content-area{
      overflow: hidden;
      margin: 0 !important;
      >div{
        position: relative;
        padding: 0 !important;
        margin-bottom: 5px;
        &:after{
          content: '';
          position: absolute;
          top: 50%;
          right: -1px;
          width: 1px;
          height: 22px;
          background: #EAEAEA;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
