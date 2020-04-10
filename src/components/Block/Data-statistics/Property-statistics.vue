<!--物业费相关 - 统计  数据box-->
<template>
  <ns-row class="head" justify="space-between" gutter="5">
    <ns-skeleton :row="idList.length" :loading="!finalData.length">
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
    </ns-skeleton>
  </ns-row>
</template>

<script>
  import create from '../../../utils/core/create';
  import Mixins from './mixins';
  import baseMixins from '../../../mixins/index';
  import {getData} from '../../../service/fetch';
  import {singleBoxDataHandle} from '../../../utils/data';
  import { Skeleton } from 'vant';

  export default create({
    name: "Property-statistics",

    mixins: [Mixins, baseMixins],
    props: {
      activeName: [Number, String],
      idList: {
        type: Array,
        default: () => []
      }
    },
    components: {
      Skeleton
    },
    data() {
      return {
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

    watch: {
      global_year(){
        this.getDataBox()
      }
    },

    methods: {
      getData,
      //数据块
      getDataBox() {

        //入参
        const query = [...new Set(this.idList.map(i => i.id))].map(i => {
          return this.getQueryByFactory({
            targetItemID: i,
          });
        });

        console.log('数据块2',query)
        this.getData(query).then(res => {

          console.log('请求返回数据:');
          console.log(res);

          //分段数据 - 单个数据块的数据处理
          this.allBoxData = singleBoxDataHandle(res, this.idList);


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
