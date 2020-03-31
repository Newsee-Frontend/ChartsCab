const Time = {
  state: {
    global_year: '',
    isCurrentYear: new Date().getFullYear() === this.global_year
  },

  mutations: {
    SET_GLOBAL_TEAR: (state, data) => {
      state.global_year = data;
    },
  },
  actions: {
    /**
     * 设置全局当前年时间
     * @param commit
     * @param data
     */
    setGlobalYear({commit}, data) {
      commit('SET_GLOBAL_TEAR', data);
    },
  },
};

export default Time;
