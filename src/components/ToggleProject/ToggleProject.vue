<template>
  <div style="height: 55vw">
    <ns-tree-select
      class="fl"
      style="width: 60%;background-color: red"
      height="100%"
      :items="items"
      :main-active-index.sync="activeIndex"
      @click-item="clickItem"
      @click-nav="clickNav"
    />

    <div class="fl" style="width: 40%;height: 100%;background-color: #ff175a"></div>
  </div>
</template>

<script>
export default {
  name: 'ToggleProject',
  data() {
    return {
      items: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [
                { text: '西湖区', children: [] },
                { text: '拱墅区', children: [] },
                { text: '下城区', children: [] },
                { text: '江干区', children: [] },
                { text: '萧山区', children: [] },
                { text: '富阳区', children: [] },
                { text: '余杭区', children: [] },
              ],
            },
            {
              text: '宁波',
              children: [
                { text: '鄞州区', children: [], dot: true },
                { text: '江东区', children: [], dot: true },
              ],
            },
          ],
        },
        {
          text: '江苏',
          children: [],
        },
      ],
    };
  },
  methods: {
    clickNav(index) {
      console.log(index);
      if (index === 1) {
        const arr = [
          {
            text: '苏州',
            children: [
              { text: '苏州1', children: [], dot: true },
              { text: '苏州2', children: [], dot: true },
            ],
          },
          {
            text: '南京',
            children: [
              { text: '南京1', children: [], dot: true },
              { text: '南京2', children: [], dot: true },
            ],
          },
        ];
        this.items[index].children = [...arr];
      }
    },
    clickItem(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped></style>
