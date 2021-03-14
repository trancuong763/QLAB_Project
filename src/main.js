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
import '../src/assets/css/style.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CKEditor);
Vue.use(PaperDashboard);
Vue.use(Vuetify);

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});


// <<<<<<< HEAD

// // Vue.prototype.$urlAPI = 'http://7c947e51393c.ngrok.io/api/'

Vue.prototype.$urlAPI = 'http://192.168.1.90:3000/api/'
// =======
// Vue.prototype.$urlAPI = 'http://c2baeee09c98.ngrok.io/api/'
// >>>>>>> fe46e70bc43d51135adb7b254b77f53579427a13


Vue.prototype.$config = {
  headers: {
    "api-token": localStorage.getItem("token"),
  },
};

Vue.prototype.CallAPI = function (method, url, data, callResponse) {
  switch (method) {
    case "post":
      axios.post(this.$urlAPI + url, data, this.$config).then((response) => {
        if (response.data.statusCode === 401) {
          sessionStorage.clear();
          location.reload();
        }
        callResponse(response)
      })
      break;
    case "get":
      axios.get(this.$urlAPI + url, this.$config)
        .then((response) => {
          if (response.data.statusCode === 401) {
            sessionStorage.clear();
            location.reload();
          }
          callResponse(response)
        })
      break;
    case "put":
      axios.put(this.$urlAPI + url, data, this.$config).then((response) => {
        if (response.data.statusCode === 401) {
          sessionStorage.clear();
          location.reload();
        }
        callResponse(response)
      })
      break;
    case "delete":
      axios.delete(this.$urlAPI + url, this.$config).then((response) => {
        if (response.data.statusCode === 401) {
          sessionStorage.clear();
          location.reload();
        }
        callResponse(response)
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

