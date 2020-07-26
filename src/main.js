// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import autoLoad from './components/global/autoLoad'
import Element from 'element-ui'
import cookies from 'vue-cookie'
// import mavoneditor from 'mavon-editor'
Vue.prototype.$cookies = cookies
    // Vue.prototype.$router = router
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/reset.css'
import '@/style/global.css'
import qs from "qs"
Vue.use(Element)
    // Vue.use(mavoneditor)
Vue.config.productionTip = false
autoLoad.startLoad()
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})