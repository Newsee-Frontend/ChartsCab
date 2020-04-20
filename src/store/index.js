import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import Time from './modules/Time';
import Base from './modules/Base'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Time,
    Base
  },
  getters,
});

export default store;
