import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);
var isAuthenticated = false;
if (localStorage.getItem('token')) isAuthenticated = true;
else isAuthenticated = false;
// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: "active"
});
// router.beforeEach((to, from, next) => {
//   if (to.name != 'Đăng nhập' && !isAuthenticated) next({ name: 'Đăng nhập' })
//   next()
// })
export default router;
