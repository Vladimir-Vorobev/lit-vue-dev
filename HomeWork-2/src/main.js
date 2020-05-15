import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

import MainPage from './components/MainPage.vue'
import RecommendedEvents from './components/RecommendedEvents.vue'
import AllEvents from './components/AllEvents.vue'
import Registration from './components/Registration.vue'
import YourEvents from './components/YourEvents.vue'
import LogIn from './components/LogIn.vue'
import Profile from './components/Profile.vue'
import Statistics from './components/Statistics.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(firebase)
Vue.use(Vuex)

const routes = [
  { path: '/', component: MainPage },
  { path: '/recommended-events', component: RecommendedEvents },
  { path: '/all-events', component: AllEvents },
  { path: '/your-events', component: YourEvents },
  { path: '/registration', component: Registration },
  { path: '/login', component: LogIn },
  { path: '/profile', component: Profile },
  { path: '/statistics', component: Statistics },
]

const router = new VueRouter({
  mode: 'history',
  routes // сокращённая запись для `routes: routes`
})

let firebaseConfig = {
  apiKey: "AIzaSyCbytih2cZ9ypxujgKCeCj_4IwjqBURzmY",
  authDomain: "hackaton-bab84.firebaseapp.com",
  databaseURL: "https://hackaton-bab84.firebaseio.com",
  projectId: "hackaton-bab84",
  storageBucket: "hackaton-bab84.appspot.com",
  messagingSenderId: "140185280116",
  appId: "1:140185280116:web:a84616824af912fbecbb21",
  measurementId: "G-P785PP6WCC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
