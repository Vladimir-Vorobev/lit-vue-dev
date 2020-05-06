import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import * as VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import needle from 'needle'
import cheerio from 'cheerio'

import MainPage from './components/MainPage.vue'
import RecommendedEvents from './components/RecommendedEvents.vue'
import AllEvents from './components/AllEvents.vue'
import Registration from './components/Registration.vue'
import YourEvents from './components/YourEvents.vue'
import VueCycle from './components/VueCycle.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueFire)

const routes = [
  { path: '/', component: MainPage },
  { path: '/recommended-events', component: RecommendedEvents },
  { path: '/all-events', component: AllEvents },
  { path: '/your-events', component: YourEvents },
  { path: '/registration', component: Registration },
  { path: '/1', component: VueCycle},
]

const router = new VueRouter({
  mode: 'history',
  routes // сокращённая запись для `routes: routes`
})

let firebaseConfig = {
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


let counter2 = 0;
let counter1 = 3;
let url = "http://events.mosedu.ru/";
let divArr = []

needle.get(url,function(err,res){
    let arr = ['','','',''];
    if(err) throw(err);

    let $ = cheerio.load(res.body);
    let mainArr = [];

    while ($('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(4)').text() != ''){
        arr[0] = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(4)').text();
        let dopS = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(3)').text().slice(15);
        dopS = dopS.slice(0,dopS.length-4);
        arr[1] = dopS;
        dopS = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(2) table tbody tr td div').text();
        arr[2] = dopS.slice(0,5);
        arr[3] = dopS.slice(7,20);
        
        mainArr[counter2] = arr;

        counter1 += 1;
        counter2 += 1;
        arr = ['','','',''];
    }
    for(let i = 0; i < mainArr.length; i+=4){
        let newDiv = document.createElement('div')
        newDiv.innerHTML += '<b>' + 'Название мероприятия: ' + '</b>' + mainArr[i][0] + '</br>'
        newDiv.innerHTML += '<b>' + 'Тип: ' + '</b>' + mainArr[i][1] + '</br>'
        newDiv.innerHTML += '<b>' + 'Дата: ' + '</b>' + mainArr[i][2] + '</br>'
        newDiv.innerHTML += '<b>' + 'Время: ' + '</b>' + mainArr[i][3] + '</br>'
        newDiv.innerHTML += '</br>' + '</br>' + '</br>'
        newDiv.classList.add('info')
        newDiv.style.textAlign = 'left'
        newDiv.style.paddingLeft = '30px'
        divArr.push(newDiv)
    }
    
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
