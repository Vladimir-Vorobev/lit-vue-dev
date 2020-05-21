import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'

//import firebase from 'firebase/app'
//import 'firebase/firestore'
//import 'firebase/auth'
//import 'firebase/database'

import MainPage from './components/MainPage.vue'
import RecommendedEvents from './components/RecommendedEvents.vue'
import AllEvents from './components/AllEvents.vue'
import AllEventsProgramming from './components/AllEventsProgramming.vue'
import AllEventsEngineering from './components/AllEventsEngineering.vue'
import AllEventsMedicine from './components/AllEventsMedicine.vue'
import Registration from './components/Registration.vue'
import YourEvents from './components/YourEvents.vue'
import LogIn from './components/LogIn.vue'
import Profile from './components/Profile.vue'
import Statistics from './components/Statistics.vue'
import Literature from './components/Literature.vue'
import PageNotFound from './components/PageNotFound.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  { path: '/', component: MainPage },
  { path: '/recommended-events', component: RecommendedEvents },
  { path: '/all-events', component: AllEvents },
  { path: '/it-events', component: AllEventsProgramming },
  { path: '/engineering-events', component: AllEventsEngineering },
  { path: '/medicine-events', component: AllEventsMedicine },
  { path: '/your-events', component: YourEvents },
  { path: '/registration', component: Registration },
  { path: '/login', component: LogIn },
  { path: '/profile', component: Profile },
  { path: '/statistics', component: Statistics },
  { path: '/literature', component: Literature },
  { path: '/404', component: PageNotFound }, { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  routes // сокращённая запись для `routes: routes`
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
