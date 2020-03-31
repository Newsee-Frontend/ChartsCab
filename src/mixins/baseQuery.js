import {mapGetters} from 'vuex';
import {getUrlParam} from '../utils/library/urlhandle'

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['global_year', 'isCurrentYear']),
  },
  methods: {
    /**
     * getQueryByFactory
     * @param options - 个性化入参
     * @returns {*}
     */
    getQueryByFactory(options) {
      if (typeof options !== 'object') return;
      return Object.assign(JSON.parse(JSON.stringify(this.createBaseQuery())), options)
    },

    createBaseQuery() {

      const targetLevel = getUrlParam('targetLevel');
      const departmentID = getUrlParam('departmentID');

      const base = {
        targetItemID: '',
        targetLevel: targetLevel || 2,
        departmentID: departmentID || '',
        repotyType: 0,  //本年有季度，月份， 其他没有
        date: this.isCurrentYear ? '' : this.global_year, //all、yyyy、yyyymm
      };

      return base;


    }
  },
};
