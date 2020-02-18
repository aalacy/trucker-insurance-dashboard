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
import { faCaretLeft,faSpinner, faAlignLeft,faCaretRight,faPhoneAlt,faQuestion,faTimes, faSearch, faSortDown } from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faFacebookF,faGoogle, faTwitter, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import VueSwal from 'vue-swal'
import VueSignaturePad from 'vue-signature-pad';
import VueIntercom from 'vue-intercom';
import VueScrollTo from'vue-scrollto';
import * as VueGoogleMaps from 'vue2-google-maps'

library.add(faCaretLeft, faSearch, faSpinner, faAlignLeft,faCaretRight,faFacebookSquare, faFacebookF,faGoogle, faTwitter, faLinkedinIn, faPhoneAlt,faQuestion,faTimes, faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueSwal);
Vue.use(BootstrapVue);
Vue.use(VueSignaturePad);
Vue.use(VueIntercom, { appId: 'ct2qyf3u' });
Vue.use(VueScrollTo);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBAsXZ3BoGXNuEAo72cRzpgn0ug1JFSTXE',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
  installComponents: true
})

// Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
