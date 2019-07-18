import Vue from 'vue';
import Vuelidate from 'vuelidate';
import 'bootstrap';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import router from './router.js';
import store from './store/index.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { faCaretLeft,faSpinner, faAlignLeft,faCaretRight,faPhoneAlt,faQuestion,faTimes } from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare,faGoogle} from '@fortawesome/free-brands-svg-icons'


library.add(faCaretLeft,faSpinner, faAlignLeft,faCaretRight,faFacebookSquare,faGoogle,faPhoneAlt,faQuestion,faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(BootstrapVue)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
