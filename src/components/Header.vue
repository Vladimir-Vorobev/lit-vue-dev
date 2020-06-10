<template>
<div>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <router-link to="/" class="router-link">
            <a class="navbar-brand" ref="home" style="color: #f23333">Profevents</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/all-events" class="router-link">
                  <a class="nav-link" ref="allEvents" style="color: #000 !important">{{allEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recommended-events" class="router-link">
                  <a class="nav-link" ref="recommendedEvents" style="color: #000 !important">{{recommendedEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/your-events" class="router-link">
                  <a class="nav-link" ref="yourEvents" style="color: #000 !important">{{yourEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #000 !important">
                Другое
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/literature" class="dropdown-item">
                  <a ref="Literature">Литература</a>
                </router-link>
                <router-link to="/open-days" class="dropdown-item">
                  <a ref="OpenDays">Дни открытых дверей</a>
                </router-link>
                <router-link to="/universities" class="dropdown-item">
                  <a ref="Universities">Баллы в ВУЗы</a>
                </router-link>
                <router-link to="/partners" class="dropdown-item">
                  <a ref="Partners">Партнёры</a>
                </router-link>
                <router-link to="/404" class="dropdown-item">
                  <a ref="PageNotFound">Трансляция мероприятий</a>
                </router-link>
              </div>
            </li>
          </ul>
          <router-link to='/login' class="router-link login">
              <a type="button" class="btn btn-primary btn-lg" ref="login">{{loginText}}</a>
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
            loginText: 'Войти',
        }
    },
    beforeMount(){
      let email = this.$store.getters.email
        if(email != ''){
          if(this.loginText == 'Войти'){
            setTimeout(fetch('https://makual.ru/api/getInformation', {
                    method: 'get',
                    headers: {email: email},
            })
            .then(response => {
                console.log("res", response)
                return response.json()
            })
            .then(data => {
              this.loginText = data.name + ' ' + data.surname
            }),100)
          }
        }
        else{
          this.loginText = 'Войти' 
        }
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