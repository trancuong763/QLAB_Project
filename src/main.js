/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import '@fortawesome/fontawesome-free/css/all.min.css'
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor );
Vue.use(Vuetify);
Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  vuetify: new Vuetify(),
  router,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");
