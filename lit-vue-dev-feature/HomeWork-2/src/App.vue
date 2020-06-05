<template>
 <div id="app" style="height: 100% !important;">
    <page-header></page-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PageHeader from './components/Header.vue'
export default {
  name: 'App',
  components: { PageHeader  },
  computed: { ...mapGetters(['email']) },
  beforeMount(){
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
        name = ''
    }
    console.log(this.$store.getters.email)
  }
}
</script>

<style>
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
  background-color: rgb(231, 231, 231);
}
body {
  margin: 0px;
}
</style>