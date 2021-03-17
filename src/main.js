import Vue from "vue"
import App from "./App.vue"
import Router from './router'
import Header from './components/Header/Header.vue'
import './api'
import store from './store'
import Star from './components/Star/Star.vue'

Vue.component('Header', Header);
Vue.component('Star', Star)

Vue.config.productionTip = false; //去掉控制台打印的提示
new Vue({
    el: "#app",
    render: h => h(App), //函数返回组件标签<App>
    router: Router, //配置路由器   
    store: store
})