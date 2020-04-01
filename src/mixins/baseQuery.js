import {mapGetters} from 'vuex';
import {getUrlParam} from '../utils/library/urlhandle'

export default {
  data() {
    return {
      nextLevelMap: {
        2: 1,
        1: 4
      },
    };
  },
  computed: {
    ...mapGetters(['global_year', 'isCurrentYear']),
  },
  watch: {
    global_year(val) {
      this.refresh();
    }
  },
  methods: {
    refresh(){},

    /**
     * getQueryByFactory
     * @param options - 个性化入参
     * @param isNext - 是否查询下一层级
     * @returns {*}
     */
    getQueryByFactory(options, isNext) {
      if (typeof options !== 'object') return;
      return Object.assign(JSON.parse(JSON.stringify(this.createBaseQuery(isNext))), options)
    },

    createBaseQuery(isNext) {
      console.log(this.$store.state);
      const targetLevel = getUrlParam('targetLevel') || 2;
      const departmentID = getUrlParam('departmentID');

      const base = {
        targetItemID: '',
        targetLevel: isNext ? this.nextLevelMap[targetLevel] : targetLevel,
        departmentID: departmentID || '',
        repotyType: 0,  //本年有季度，月份， 其他没有
        date: this.global_year, //all、yyyy、yyyymm
      };

      return base;
    }
  },
};
