import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.css'
import './style/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.clone = function (o) {
  if (!o) return ''
  return JSON.parse(JSON.stringify(o))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
