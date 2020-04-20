import {mapGetters} from 'vuex';
import {getUrlParam} from '../utils/library/urlhandle'
import {getTime, deadline} from '../utils/library/time'

export default {
  data() {
    return {
      deadline,
      nextLevelMap: {
        2: 1,
        1: 4
      },
    };
  },

  computed: {
    ...mapGetters(['global_year', 'isCurrentYear']),
    deadlineTitle(){
      // console.log(this.deadline, Math.max(...this.deadline));
      let deadlineTmp = this.deadline.length && Math.max(...this.deadline) ? getTime(Math.max(...this.deadline)) : '';
      return `截止: ${deadlineTmp}`;
    }
  },
  watch: {
    global_year(val) {
      this.refresh();
    }
  },
  methods: {
    getUrlParam,

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
      const { departmentID, targetLevel}  = this.$store.state.Base;

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
