import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import VueCycle from './components/VueCycle.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: MainPage },
  { path: '/vuecycle', component: VueCycle }
]

const router = new VueRouter({
  mode: 'history',
  routes // сокращённая запись для `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
