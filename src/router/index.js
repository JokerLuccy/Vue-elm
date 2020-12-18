import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@views/Home");
const City = () => import("@views/City");
const Login = () => import("@views/Login");
const ResetPwd = () => import("@views/Login/resetPwd");
const Profile = () => import("@views/Profile");
const push = VueRouter.prototype.push;
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => {});
};
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => {});
};
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/city/:id",
      component: City
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/forget",
      component: ResetPwd
    },
    {
      path: "/profile",
      component: Profile
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
export default router;
