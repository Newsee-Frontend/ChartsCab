import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import Time from './modules/Time'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Time,
  },
  getters,
});

export default store;
