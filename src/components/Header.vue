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
              <router-link to="/it-events" class="router-link">
                  <a class="nav-link" ref="allEvents" style="color: #000 !important">Все мероприятия</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recommended-events" class="router-link">
                  <a class="nav-link" ref="recommendedEvents" style="color: #000 !important">Рекомендуемые мероприятия</a>
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/your-events" class="router-link">
                  <a class="nav-link" ref="yourEvents" style="color: #000 !important">Ваши мероприятия</a>
              </router-link>
            </li> -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #000 !important">
                Полезное
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
          <router-link to='/login' class="router-link login" style="display:block">
              <a type="button" class="btn btn-primary btn-lg" ref="login">{{loginText}}</a>
          </router-link>
          <div class="dropdown person_menu" style="display:none">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{loginText}}
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a @click="person_profile()" class="dropdown-item" href="">Моя страница</a>
              <router-link to="/your-events" class="router-link">
                  <a class="dropdown-item" ref="yourEvents" style="color: #16181b !important">Мои мероприятия</a>
              </router-link>
              <router-link to="#" class="router-link">
                  <a class="dropdown-item" ref="" style="color: #16181b !important">Портфолио</a>
              </router-link>
              <div v-if="role != 'user' && role != 'student'">
                <router-link to="/admin" class="router-link">
                  <a class="dropdown-item" ref="Admin" style="color: #16181b !important">Админ панель</a>
                </router-link>
              </div>
              <div class="dropdown-divider"></div>
              <button @click="exit()" class="dropdown-item exit" href="#">Выйти</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
</div>

</template>


<script>
export default {
    name: 'Header',
    data(){
        return {
            loginText: 'Войти',
            userId: 0,
            role: '',
        }
    },
    beforeMount(){
      let email = this.$store.getters.email
      let SessionID = this.$store.getters.SessionID
      if(email != ''){
        fetch(this.$store.state.serverIp+'/api/getInformation', {
          method: 'POST',
          headers: {email: email, sessionid: SessionID},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            if(data == '310'){
              //alert('header')
              document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
              document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
              window.location.reload()
            }
            this.loginText = data.name + ' ' + data.surname
            this.userId = data._id
            this.role = data.role
            document.querySelector('.login').style.display = 'none'
            document.querySelector('.person_menu').style.display = 'block'
        })
        .catch(err => {
            console.log(err)
        })
      }
    },

    methods: {
      exit(){
        document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
        document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
        // this.$router.push({ path: `/login` })
        window.location.reload()
        document.location.href = "/login"
      },
      person_profile(){
        let userId = this.userId
        this.$router.push({ path: `/user-profile/${userId}` })
        //this.$router.push({ path: `/profile` })
      }
    }

}
</script>

<style scoped>
.router-link {
  text-decoration: none; /* отменяем подчеркивание ссылки */
  color: #fff;
}
.exit{
  color: red;
}
.exit:focus {
  background: #f1f2f3;
}
</style>