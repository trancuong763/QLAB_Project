import Vue from "vue";
import App from "./App";
import router from "./router/index";
import '@fortawesome/fontawesome-free/css/all.min.css'
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import CKEditor from '@ckeditor/ckeditor5-vue';
import '../src/assets/css/style.css'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$header = {
  headers: {
    Authorization: localStorage.getItem('token'),
  },
};
Vue.use(CKEditor);
Vue.use(PaperDashboard);
Vue.use(Vuetify);
Vue.prototype.$urlAPI = "http://62f15317a314.ngrok.io/api/";
Vue.prototype.CallAPI = function (method, url, data, callback, callbackError) {
  switch (method) {
    case "get":
      axios.get(this.$urlAPI + url, this.$header).then((result) => {
        let statusCode = result.data.statusCode;
        if (statusCode === 401) {
          localStorage.clear();
        }
        callback(result)
      })
      break;
    case "post":
      axios.get(this.$urlAPI + url, data, this.$header).then((result) => {
        let statusCode = result.data.statusCode;
        if (statusCode === 401) {
          localStorage.clear();
        }
        callback(result)
      }).catch((error) => callbackError(error))
      break;
    case "put":
      axios.get(this.$urlAPI + url, data, this.$header).then((result) => {
        let statusCode = result.data.statusCode;
        if (statusCode === 401) {
          localStorage.clear();
        }
        callback(result)
      }).catch((error) => callbackError(error))
      break;
    case "delete":
      axios.get(this.$urlAPI + url, data, this.$header).then((result) => {
        let statusCode = result.data.statusCode;
        if (statusCode === 401) {
          localStorage.clear();
        }
        callback(result)
      }).catch((error) => callbackError(error))
      break;
  }

}
new Vue({
  vuetify: new Vuetify(),
  router,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");

