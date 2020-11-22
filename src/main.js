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
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});
Vue.prototype.$axios = axios
Vue.prototype.$header = {
  headers: {
    "api-token": localStorage.getItem('token'),
  },
};
Vue.use(CKEditor);
Vue.use(PaperDashboard);
Vue.use(Vuetify);
Vue.prototype.$urlAPI = "http://8091338c0726.ngrok.io/api/";
Vue.prototype.CallAPI = function (method, url, data, callback) {
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
      axios.post(this.$urlAPI + url, data, this.$header).then((result) => {
        let statusCode = result.data.statusCode;
        if (statusCode === 401) {
          localStorage.clear();
        }
        callback(result)
      })
      break;
    case "put":
      axios.put(this.$urlAPI + url, data, this.$header).then((result) => {
        let statusCode = result.data.statusCode;
        if (statusCode === 401) {
          localStorage.clear();
        }
        callback(result)
      })
      break;
    case "delete":
      axios.delete(this.$urlAPI + url, this.$header).then((result) => {
        let statusCode = result.data.statusCode;
        if (statusCode === 401) {
          localStorage.clear();
        }
        callback(result)
      })
      break;
  }

}
new Vue({
  vuetify: new Vuetify(),
  router,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");

