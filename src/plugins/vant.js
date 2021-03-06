import Vue from "vue";
import {
  Button,
  NavBar,
  Form,
  Field,
  Switch,
  Cell,
  Image,
  Dialog,
  Icon
} from "vant";

Vue.use(Button);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Switch);
Vue.use(Cell);
Vue.use(Image);
Vue.use(Dialog);
Vue.use(Icon);
Vue.prototype.$dialog = Dialog;
