import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import * as VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import MainPage from './components/MainPage.vue'
import RecommendedEvents from './components/RecommendedEvents.vue'
import AllEvents from './components/AllEvents.vue'
import Registration from './components/Registration.vue'
import YourEvents from './components/YourEvents.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueFire)

const routes = [
  { path: '/', component: MainPage },
  { path: '/recommended-events', component: RecommendedEvents },
  { path: '/all-events', component: AllEvents },
  { path: '/your-events', component: YourEvents },
  { path: '/registration', component: Registration }
]

const router = new VueRouter({
  mode: 'history',
  routes // сокращённая запись для `routes: routes`
})

var firebaseConfig = {
  apiKey: "AIzaSyAVwPiz1_SAcOZ82JuFQutmEFtlSnUd7fs",
  authDomain: "hackaton2020-61440.firebaseapp.com",
  databaseURL: "https://hackaton2020-61440.firebaseio.com",
  projectId: "hackaton2020-61440",
  storageBucket: "hackaton2020-61440.appspot.com",
  messagingSenderId: "639961435797",
  appId: "1:639961435797:web:a87222ceb6045bd0e5959c",
  measurementId: "G-0W0CH8EE5Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var needle = require("needle");
var cheerio= require("cheerio");

var url = "http://events.mosedu.ru/";

needle.get(url,function(err,res){
  if(err) throw(err);

  var $ = cheerio.load(res.body);
  let string = $('.event-block-blocks').text()
  let data = string.split(' ')
  console.log($(data).text());
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
