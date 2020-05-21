<template>
<div>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <router-link to="/" class="router-link">
            <a class="navbar-brand" ref="home">Главная</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/all-events" class="router-link">
                  <a class="nav-link" ref="allEvents">{{allEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recommended-events" class="router-link">
                  <a class="nav-link" ref="recommendedEvents">{{recommendedEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/your-events" class="router-link">
                  <a class="nav-link" ref="yourEvents">{{yourEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Другое
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/literature" class="dropdown-item">
                  <a ref="Literature">Литература</a>
                </router-link>
                <router-link to="/404" class="dropdown-item">
                  <a ref="PageNotFound">Трансляция мероприятий</a>
                </router-link>
                <router-link to="/404" class="dropdown-item">
                  <a ref="PageNotFound">Партнёры</a>
                </router-link>
                <router-link to="/404" class="dropdown-item">
                  <a ref="PageNotFound">Дни открытых дверей</a>
                </router-link>
                <router-link to="/404" class="dropdown-item">
                  <a ref="PageNotFound">Баллы в ВУЗы</a>
                </router-link>
              </div>
            </li>
          </ul>
          <router-link to='/login' class="router-link login">
              <a type="button" class="btn btn-success btn-lg " ref="login">{{loginText}}</a>
          </router-link>
        </div>
      </nav>
    </div>
</div>

</template>


<script>

export default {
    name: 'Header',
    data(){
        let homeText = "Главная"
        let recommendedEventsText = "Рекомендуемые мероприятия"
        let allEventsText = "Все мероприятия"
        let yourEventsText = "Ваши мероприятия"
        return {
            homeText,
            recommendedEventsText,
            allEventsText,
            yourEventsText,
            loginText: 'Войти'
        }
    },
    mounted(){
      setInterval(() => {
        let dataq = document.cookie.split(";")
        let name = ''
        let cookie = false
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
        if(cookie && window.location.pathname.toString() == '/login'){
          this.$router.push("/profile")
        }
        if(cookie){
          this.loginText = 'Профиль' 
        }
      }, 200);
    }

}
</script>

<style scoped>
.router-link
{
  text-decoration: none; /* отменяем подчеркивание ссылки */
  color: #fff;
}
</style>