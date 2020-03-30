<!--物业费相关 - 统计  数据box-->
<template>
  <ns-row class="head" type="flex" justify="space-between" gutter="5">
    <ns-col
      :span="24 / finalData.length"
      v-for="(item, itemIndex) in finalData"
      :key="itemIndex"
    >
      <ns-data-box
        :content="item.content"
        :color="item.color"
        :back="item.back"
        :perNum="finalData.length"
      ></ns-data-box>
    </ns-col>
  </ns-row>
</template>

<script>
  import create from '../../../utils/core/create';
  import Mixins from './mixins';
  import {getData} from '../../../service/fetch';
  import {singleBoxDataHandle} from '../../../utils/data';

  export default create({
    name: "Property-statistics",

    mixins: [Mixins],
    props: {
      activeName: [Number, String],
      departmentId: [Number, String]
    },
    components: {},
    data() {
      return {

        /**
         * 查询入参指标队列
         * 物业费收缴率  - 256 （物业费应收/物业费实收)
         * 本年欠费 - 275
         * 往年欠费 - 266
         * 往年欠费收缴 - 266
         * 往年欠费收缴率 - 266
         * @type {string[]}
         */
        ids_request: ['256', '275', '266'],
        allBoxData: [],
      }
    },
    computed: {
      finalData() {
        if (this.activeName === 0) {
          //数据块数据截取并上色主题
          return this.drawTheme(this.allBoxData.slice(0, 3));
        }
        else if (this.activeName === 1) {
          //数据块数据截取并上色主题
          return this.drawTheme(this.allBoxData.slice(3, 7));
        }
        else {
          return []
        }
      }
    },
    methods: {
      getData,
      //数据块
      getDataBox() {

        //入参
        const query = this.ids_request.map(i => {
          return {
            targetItemID: i,
            targetLevel: 2,
            departmentID: this.departmentId,
            repotyType: this.year === this.thisYear ? this.tabValue : 0,  //本年有季度，月份， 其他没有
            date: this.year === this.thisYear ? '' : this.year, //all、yyyy、yyyymm
          };
        });


        this.getData(query).then(res => {

          console.log('请求返回数据:');
          console.log(res);

          /**
           * 通过 id 和 key 查询控制器，锁定渲染配置对象，输出渲染数据队列
           * @type {*[]}
           */
          const ids_render = [
            {id: '256', key: 'actualDenominator'},//计划总营收
            {id: '256', key: 'actualNumerator'},//实际总营收
            {id: '256', key: 'actualTarget'},//总营收完成率
            {id: '275', key: 'actualTarget'},//本年欠费
            {id: '266', key: 'actualDenominator'},//往年欠费
            {id: '266', key: 'actualNumerator'},//往年欠费收缴
            {id: '266', key: 'actualTarget'},//往年欠费收缴率
          ];


          //分段数据 - 单个数据块的数据处理
          this.allBoxData = singleBoxDataHandle(res, ids_render);


          console.log('最终赋值-最终赋值');
          console.log(this.allBoxData);
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
            color: colorKey ? this.palette[colorKey].color : '',
            back: colorKey ? this.palette[colorKey].back : ''
          };
        });
      },
    },
    created() {
      this.getDataBox()
    }
  })
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
