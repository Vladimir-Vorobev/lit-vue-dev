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
import Registration from './components/Registration.vue'
import YourEvents from './components/YourEvents.vue'
import LogIn from './components/LogIn.vue'
import Profile from './components/Profile.vue'
import Statistics from './components/Statistics.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
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

let data = document.cookie.split(";")
let name = ''
let cookie = []
let b = 0
for(let i = 0; i < data.length; i++){
  let value = data[i].toString()
  for(let j = 0; j < value.length; j++){
    if(data[i][j] == "="){
      if(name == 'SessionID'){
        b = 1
      }
      else if(name == 'email'){
        b = 2
      }
      name = ''
    }
    else if(data[i][j] != " "){
      name += data[i][j]
    }
  }
  if(b == 1){
    cookie.push({'SessionID': name})
    b = 0
  }
  else if(b == 2){
    cookie.push({'email': name})
    b = 0
  }
  name = ''
}
const router = new VueRouter({
  mode: 'history',
  routes // сокращённая запись для `routes: routes`
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
