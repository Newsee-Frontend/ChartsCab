import Vue from 'vue';
import App from './App.vue';
import store from '../../store/index';

//load  UI / plugins / style / components
import '../../UI/index';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
});
