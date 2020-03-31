const Time = {
  state: {
    global_year: new Date().getFullYear(),
    isCurrentYear: true
  },

  mutations: {
    SET_GLOBAL_TEAR: (state, data) => {
      state.global_year = data;
      state.isCurrentYear = !!(data ===  new Date().getFullYear());
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
