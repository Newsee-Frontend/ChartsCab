import Vue from 'vue';
import App from './App.vue';

//load  UI / plugins / style / components
import '../../UI/index';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
