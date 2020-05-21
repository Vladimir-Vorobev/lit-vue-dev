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
  { path: '/all-events/programming', component: AllEventsProgramming },
  { path: '/all-events/engineering', component: AllEventsEngineering },
  { path: '/all-events/medicine', component: AllEventsMedicine },
  { path: '/your-events', component: YourEvents },
  { path: '/registration', component: Registration },
  { path: '/login', component: LogIn },
  { path: '/profile', component: Profile },
  { path: '/statistics', component: Statistics },
  { path: '/literature', component: Literature },
  { path: '/404', component: PageNotFound }, { path: '*', redirect: '/404' },
  { path: '/login', redirect: to => {
      const { hash} = to
      if(hash) console.log('')
      let dataq = document.cookie.split(";")
      let name = ''
      let cookie = true
      for(let i = 0; i < dataq.length; i++){
      let value = dataq[i].toString()
          for(let j = 0; j < value.length; j++){
              if(dataq[i][j] == "="){
                  if(name == 'SessionID'){
                      cookie = true
                      break
                  }
                  name = ''
              }
              else if(dataq[i][j] != " "){
                  name += dataq[i][j]
              }
          }
          name = ''
      }
      if(cookie){
        alert('Done')
        return '/profile'
      }
      else{
        alert('login')
        return '/login'
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes // сокращённая запись для `routes: routes`
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
