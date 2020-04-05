import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Chat from './components/Chat.vue'
import OurTeam from './components/OurTeam.vue'
import HowToGet from './components/HowToGet.vue'
import Settings from './components/Settings.vue'
import MainPage from './components/MainPage.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: MainPage },
  { path: '/chat', component: Chat },
  { path: '/ourteam', component: OurTeam },
  { path: '/howtoget', component: HowToGet },
  { path: '/settings', component: Settings },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
  el: '#app',
  data: {
    buttons: [
      {icon: 'comment', bgColor: '#DE9B00', color: '#EDB205'},
      {icon: 'user', bgColor: '#3EAF6F', color: '#4BD389'},
      {icon: 'map-marker', bgColor: '#BE0031', color: '#E61753'},
      {icon: 'cog', bgColor: '#8E00AC', color: '#B32DD2'}
    ],
    selectedBgColor: '#DE9B00',
    selectedId: 0
  },
}).$mount('#app')
