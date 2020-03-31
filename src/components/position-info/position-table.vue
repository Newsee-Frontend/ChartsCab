<template>
  <div class="position-container">
    <table class="position-table">
      <!--表头-->
      <thead>
        <tr>
          <th class="index" width="20px"></th>
          <th v-for="column in columnList" :key="column.value">{{ column.label }}</th>
        </tr>
      </thead>

      <!--表数据-->
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          v-show="showAll || index < defaultNum"
          @click="clickColumn(item)"
        >
          <td class="column-index">{{ index + 1 }}</td>

          <td v-for="column in columnList" :key="column.value" :class="`column-${column.value}`">
            <div>{{ item[column.value] || 0 }}</div>
          </td>
        </tr>

      </tbody>
    </table>

    <div class="blank-text" :class="data.length === 0? 'no-data': ''" @click="showAll = true">
      {{ lastText }}
    </div>
  </div>
</template>

<script>
  import baseMixins from '../../mixins/index';
  export default {
  name: 'position-table',

  mixins: [baseMixins],

  props: {
    data: {
      type: Array,
      default: () => [],
    },

    columnList: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    lastText(){
      if(!this.data.length){
        return '暂无数据';
      }else if( this.showAll || this.data.length < this.defaultNum){
        return '没有数据了';
      }else{
        return '查看更多';
      }
    }
  },

  data() {
    return {
      showAll: false,

      defaultNum: 6,
    };
  },

  methods: {
    clickColumn(item) {
      this.$emit('clickColumn', item);
    },

    refresh(){
      this.showAll = false
    }
  },
};
</script>

<style lang="scss">
.position-container {
  .date {
    color: #333;
    font-size: 12px;
    margin: 10px;
  }

  .position-table {
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    table-layout:fixed;

    thead {
      background: #f2f3f6;
      color: #666666;
      width:48px;
      font-size:10px;
      height:32px;
      line-height: 32px;
      tr th:nth-of-type(2){
        text-align: left;
        min-width: 100px;
        width: 30%;
      }
    }

    thead th,
    tbody td {
      text-align: center;
      word-wrap: break-word;
      word-break: break-all;
    }

    tbody {
      tr {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #eff4f7;
        color: #999999;

        &:active {
          background: #f5f5f5;
        }

        td{
          line-height: 20px;
          &.column-index {
            font-weight: bold;
            color: #b2b2b2;
          }
          //区域
          &:nth-of-type(2) {
            font-weight: bold;
            color: #000;
            div{
              width: 100%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }


          .unit{
            font-size: 0.8em;
          }

          &:last-of-type{
            font-size: 1.2em;
            font-weight: bold;
            color: #333333;
            .unit{
              font-size: 0.6em;
              color: #333;
            }
          }

        }


        &:last-of-type {
          border-bottom: none;
        }



        &:nth-of-type(1) {
          td:last-of-type,  .column-index {
            color: #f13939;
          }
        }

        &:nth-of-type(2) {
          td:last-of-type,  .column-index{
            color: #ff9c17;
          }
        }

        &:nth-of-type(3) {
          td:last-of-type,  .column-index {
            color: #3fbf83;
          }
        }
      }
    }
  }

  .blank-text {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #a2a3a4;
    margin-bottom: 50px;
    &.no-data{
      padding: 30px;
      border-bottom: 1px solid #EBEBEB;
    }
  }
}
</style>
