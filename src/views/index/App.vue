<template>
  <ns-layout>
    <ns-index-anchor index="Z"/>
    <ns-cell title="主页" icon="shop-o">
      <template #right-icon>
        <ns-icon
          name="ellipsis"
          style="line-height: inherit;"
          @click="junmp('../Home/index.html')"
        />
      </template>
    </ns-cell>

    <ns-index-anchor index="G"/>
    <ns-cell title="概览页" icon="shop-o">
      <template #right-icon>
        <ns-icon
          name="ellipsis"
          style="line-height: inherit;"
          @click="junmp('../Details/index.html')"
        />
      </template>
    </ns-cell>
  </ns-layout>
</template>

<script>
  import create from '../../utils/core/create';
  import {Icon, IndexAnchor, Cell, TreeSelect} from 'vant';
  import {unitConvert} from '../../utils/library/unit'

  export default create({
    name: 'App',
    components: {
      Icon,
      Cell,
      IndexAnchor,
      TreeSelect,
    },
    data() {
      return {
        activeIndex: 0,
      };
    },
    created() {


      const data1 = unitConvert('20000', 'num');
      console.log(data1.num + data1.unit)

      const data2 = unitConvert('222', 'count');
      console.log(data2.num + data2.unit)

    },

    methods: {
      junmp(path) {
        window.location.href = path;
      },
    },
  });
</script>

<style rel=" stylesheet/scss" lang="scss"></style>
