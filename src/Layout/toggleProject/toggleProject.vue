<template>
  <ns-popup v-model="showPicker"
            position="left"
            class="toggleProject"
  >
    <div class="header">

      <ns-nav-bar
        title="切换地区"
        right-text="确定"
        left-arrow
        @click-left="close"
        @click-right="submitProject"
      />
    </div>

    <!--搜索-->

    <ns-search
      v-model="searchInput"
      @search="searchProjectList"
      @change="searchChange"
      @clear="searchChange"
      placeholder="搜索区域、城市、或项目"></ns-search>

    <div v-show="!searching" class="toggleProject-tree__body">
      <ns-tree-select
        class="fl side-menu"
        height="auto"
        :items="items"
        :main-active-index.sync="activeIndex"
        :active-id.sync="activeId"
        @click-item="clickItem"
        @click-nav="clickNav"
      >
      </ns-tree-select>

      <div class="fl content van-tree-select__content">
        <div v-for="item in projectList"
             class="van-ellipsis van-tree-select__item"
             :class="item.id === projectId? 'van-tree-select__item--active' : ''"
             @click="clickProject(item)"
             :key="item.id">
          {{item.text}}

          <i class="van-icon van-icon-checked van-tree-select__selected"
             v-show="item.id === projectId"
          ></i>
        </div>
      </div>
    </div>

    <div v-show="searching" class="toggleProject-search__body">
      <div v-for="item in searchList" :key="item.id" class="search-line" @click="selectProject(item)">
        <div class="search-line__main">{{ item.text}}</div>
        <div class="search-line__decs">{{ item.decs }}</div>
      </div>
    </div>
  </ns-popup>
</template>

<script>
  import create from '../../utils/core/create-basic';
  import { Popup, TreeSelect, Search, NavBar,Toast } from 'vant';

  export default create({
    name: 'toggleProject',

    components: {
      Popup,
      TreeSelect,
      Search,
      NavBar
    },

    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        items: [],

        activeIndex: 1,
        activeId: undefined,
        projectId: undefined,

        projectList: [],
        showPicker: false,

        searchInput: '',
        searching: false,
        searchList: [],
      };
    },

    watch: {
      visible(val) {
        this.showPicker = val;
      },
    },

    methods: {
      //add 自定义的 标签
      addBlankTag(){
        this.items = [
          {
            text: '浙江',
            id: 1,
            children: [
              {
                text: '杭州',
                children: [
                  { text: '西湖区', id: 111 },
                  { text: '拱墅区', id: 112 },
                  { text: '下城区', id: 113 },
                  { text: '江干区', id: 114 },
                  { text: '萧山区', id: 115 },
                  { text: '富阳区', id: 116 },
                  { text: '余杭区', id: 117 },
                ],
                id: 11,
              },
              {
                text: '宁波',
                id: 12,
                children: [
                  { text: '鄞州区', id: 121, children: [], dot: true },
                  { text: '江东区', id: 122, children: [], dot: true },
                ],
              },
            ],
          },
          {
            text: '江苏',
            id: 2,
            children: [
              {
                text: '苏州',
                id: 21,
                children: [
                  {
                    text: '姑苏区',
                    id: 211,
                  },
                ],
              },
            ],
          },
          {
            text: '河北',
            id: 3,
          },
          {
            text: '河南',
            id: 4,
          },
          {
            text: '陕西',
            id: 5,
          },
          {
            text: '山西',
            id: 6,
          },
          {
            text: '贵洲',
            id: 7,
          },
          {
            text: '广西',
            id: 8,
          },
          {
            text: '江西',
            id: 9,
          },
        ];
        this.items.unshift({ text: '全国', id: '' });
        this.items.forEach( item => {
          if(item.children) {
            item.children.unshift({ text: '全部', id: '' })
          }
        })
      },

      //菜单一级点击
      clickNav(index) {
         //一级是全国
        this.activeId = undefined;
        this.projectList = [];
        this.projectId = undefined;
      },

      //菜单二级点击
      clickItem(data) {
        //二级是全部
        let list = data.children || [];
        this.projectList = list.slice(0, list.length);
        this.projectList.unshift({ text: '全部', id: '' });
        this.projectId = undefined;
      },

      //项目区点击
      clickProject(data) {
        //三级是全部
        this.projectId = data.id;
        this.selectProject(data);
      },

      // 保存
      submitProject(){
        if(this.searching){
          Toast('请选择需要切换的项目');
        }else{
          this.searchProjectList();
        }
      },


      /**
       * 项目查询
       */
      searchProjectList() {
        this.searching = true;
        this.searchList = [
          { text: '苍翼旅游', decs: '杭州西湖区', id: 1 },
          { text: '苍翼旅游', decs: '杭州西湖区', id: 2 },
          { text: '苍翼旅游', decs: '杭州西湖区', id: 3 },
          { text: '苍翼旅游', decs: '杭州西湖区', id: 4 },
          { text: '苍翼旅游', decs: '杭州西湖区', id: 5 },
          { text: '苍翼旅游', decs: '杭州西湖区', id: 6 },
        ];
      },

      /**
       * search 切换
       */
      searchChange() {
        if (!this.searchInput) {
          this.searching = false;
        }
      },

      /**
       * search select
       */
      selectProject(data){
        console.log(data);
        console.log(111111111111111);
        this.close();
      },

      close(){
        // 数据还原
        this.showPicker = false;
        this.$emit('update:visible',  this.showPicker);
        Object.assign(this.$data, this.$options.data.call(this), {items: this.$data.items});
      },
    },

    created(){
      this.addBlankTag();
    }
  });
</script>

<style lang="scss">
  .toggleProject {
    height: 100%;
    width: 100%;

    .van-nav-bar .van-icon{
      color: #666666;
    }

    .van-sidebar-item--select{
      color: #4F9BFF;
      border-color: #4F9BFF;
    }

    .van-tree-select__item--active{
      color: #4F9BFF;
    }

    .side-menu {
      width: 60%;
      .van-tree-select__content {
        flex: 1;
      }
    }

    .content {
      width: 40%
    }

    .toggleProject-search__body{
      border-top: 1px solid #EEEEEE;
      margin-top: 8px;
      .search-line{
        margin-left: 24px;
        padding: 10px 0;
        border-bottom:  1px solid #EEEEEE;

        &__main{
          color: #333333;
          font-size:15px;
        }

        &__decs{
          color: #999;
          font-size:12px;
          margin-top: 4px;
        }
      }
    }
  }
</style>
