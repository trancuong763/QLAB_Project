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
import axios from 'axios'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use( CKEditor );
Vue.use(PaperDashboard);
Vue.use(Vuetify);

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

Vue.prototype.$urlAPI = 'http://62f15317a314.ngrok.io/api/'

Vue.prototype.$config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

Vue.prototype.CallAPI = function (method, url, data, callResponse, callError) {
  switch (method) {
    case "post":
      axios.post(this.$urlAPI + url, data, this.$config).then((response) => {
        if (response.data.statusCode === 401) {
          localStorage.clear();
          location.reload();
        }
        callResponse(response)
      })
        .catch((error) => callError(error))
      break;
    case "get":
      axios.get(this.$urlAPI + url, this.$config)
        .then((response) => {
          if (response.data.statusCode === 401) {
            localStorage.clear();
            location.reload();
          }
          callResponse(response)
        })
        .catch((error) => callError(error))
      break;
    case "put":
      axios.put(this.$urlAPI + url, data, this.$config).then((response) => {
        if (response.data.statusCode === 401) {
          localStorage.clear();
          location.reload();
        }
        callResponse(response)
      })
        .catch((error) => callError(error))
      break;
    case "delete":
      axios.delete(this.$urlAPI + url, data, this.$config).then((response) => {
        if (response.data.statusCode === 401) {
          localStorage.clear();
          location.reload();
        }
        callResponse(response)
      })
        .catch((error) => callError(error))
      break;
  }
}
new Vue({
  vuetify: new Vuetify(),
  router,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");
