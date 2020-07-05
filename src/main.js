import Vue from 'vue'
import Vuex from 'vuex';
import { APP_STORE } from '../store';
import VueRouter from 'vue-router'
import App from './App.vue'

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
Vue.use(Chartkick.use(Chart))

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);



import MainPage from './components/MainPage.vue'
import RecommendedEvents from './components/RecommendedEvents.vue'
import AllEvents from './components/AllEvents.vue'
import Registration from './components/Registration.vue'
import YourEvents from './components/YourEvents.vue'
import LogIn from './components/LogIn.vue'
import Profile from './components/Profile.vue'
import Statistics from './components/Statistics.vue'
import OpenDays from './components/OpenDays.vue'
import Partners from './components/Partners.vue'
import Universities from './components/Universities.vue'
import FullStatistics from './components/FullStatistics.vue'
import FriendStatistics from './components/FriendStatistics.vue'
import Literature from './components/Literature.vue'
import Admin from './components/Admin.vue'
import UserProfile from './components/UserProfile.vue'
import UserProfileEditor from './components/UserProfileEditor.vue'
import PageNotFound from './components/PageNotFound.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  { path: '/', component: MainPage },
  { path: '/recommended-events', component: RecommendedEvents },
  // { path: '/all-events', component: AllEvents },
  { path: '/it-events', component: AllEvents },
  { path: '/engineering-events', component: AllEvents },
  { path: '/service-events', component: AllEvents },
  { path: '/your-events', component: YourEvents },
  { path: '/registration', component: Registration },
  { path: '/login', component: LogIn },
  { path: '/profile', component: Profile },
  { path: '/friend-statistics', component: FriendStatistics },
  { path: '/school-statistics', component: Statistics },
  { path: '/full-school-statistics', component: FullStatistics },
  { path: '/literature', component: Literature },
  { path: '/open-days', component: OpenDays },
  { path: '/universities', component: Universities },
  { path: '/partners', component: Partners },
  { path: '/admin', component: Admin },
  { path: '/user-profile/:id', component: UserProfile },
  { path: '/user-profile-edit', component: UserProfileEditor },
  { path: '/404', component: PageNotFound }, { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  routes, // сокращённая запись для `routes: routes`
})

const store = new Vuex.Store(APP_STORE);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
