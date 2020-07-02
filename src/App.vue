<template>
 <div id="app" style="height: 100% !important;">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <page-header></page-header>
    <router-view></router-view>
    <div class="scrollup"><i class="fa fa-chevron-up"></i></div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PageHeader from './components/Header.vue'
// import Footer from './components/footer.vue'
import $ from "jquery"
export default {
  name: 'App',
  components: { PageHeader },
  computed: { ...mapGetters(['email', 'allEventsScroll', 'openDaysScroll']) },
  beforeCreate(){
    let dataq = document.cookie.split(";")
    let name = ''
    let b = 0
    for(let i = 0; i < dataq.length; i++){
    let value = dataq[i].toString()
        for(let j = 0; j < value.length; j++){
            if(dataq[i][j] == "="){
                if(name == 'email'){
                    b = 1
                }
                else if(name == 'allEventsScroll'){
                    b = 2
                }
                else if(name == 'openDaysScroll'){
                    b = 3
                }
                else if(name == 'SessionID'){
                    b = 4
                }
                name = ''
            }
            else if(dataq[i][j] != " "){
                name += dataq[i][j]
            }
        }
        if(b == 1){
            this.$store.commit('GET_USER_EMAIL', name)
            b = 0
        }
        else if(b == 2){
            this.$store.commit('SET_ALL_EVENTS_SCROLL', name)
            b = 0
        }
        else if(b == 3){
            this.$store.commit('SET_OPEN_DAYS_SCROLL', name)
            b = 0
        }
        else if(b == 4){
            this.$store.commit('GET_USER_SESSIONID', name)
            b = 0
        }
        name = ''
    }
  },
  mounted(){
    $(function() {
        $('.scrollup').click(function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
    })
    $(window).scroll(function() {
        if ($(this).scrollTop()>200) {
            $('.scrollup').fadeIn();
        }
        else {
            $('.scrollup').fadeOut();
        }
    });

  },
}
</script>

<style>

::-webkit-scrollbar { 
    width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 5px;
  /* box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset; */
  box-shadow: inset 0 0 6px rgba(0,0,0,0.2)
}

::-webkit-scrollbar-thumb {
  background: #a5a2a2;
  border-radius: 5px;
}

html{
    scrollbar-color: #a5a2a2 transparentf; 
    scrollbar-width: thin;
    scrollbar-face-color: #a5a2a2 ;
    scrollbar-track-color: transparent;
}


body {
    width:100% !important; 
    height:100% !important; 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100% !important;
  padding: 0px;
  margin: 0px;
  /*background-color: rgb(231, 231, 231);*/
  background-color: #eef5ff;
}
body {
  margin: 0px;
}
@media (max-width: 992px) {  
    .scrollup{
        font-size: 20px; /* размер шрифта (иконки) */
        right: 15px; /* расстояние от правого края */
    }
}
@media (min-width: 993px) {  
    .scrollup{
        font-size: 50px; /* размер шрифта (иконки) */
        right: 60px; /* расстояние от правого края */
    }
}
.scrollup {
  position: fixed; /* фиксированная позиция */
  color: #fff; /* цвет текста */
  background-color: #286090; /* цвет заднего фона */
  bottom: 0px; /* расстояние от нижнего края */
  padding: 4px 10px; /* отступы до содержимого блока */
  border-top-left-radius: 4px; /* скругление верхнего левого угла */
  border-top-right-radius: 4px; /* скругление верхнего правого угла */
  cursor: pointer; /* форма курсора */
  display: none; /* не отображать элемент */
  text-align: center; /*выравнивание содержимого элемента по центру */
}
.scrollup:hover {
  background-color: #000; /* цвет заднего фона при наведении */
}
</style>