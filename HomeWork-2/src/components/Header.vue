
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
              <router-link to="/recommended-events" class="router-link">
                  <a class="nav-link" ref="recommendedEvents">{{recommendedEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/all-events" class="router-link">
                  <a class="nav-link" ref="allEvents">{{allEventsText}}</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/your-events" class="router-link">
                  <a class="nav-link" ref="yourEvents">{{yourEventsText}}</a>
              </router-link>
            </li>
          </ul>
          <router-link to="/login" class="router-link">
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
        let loginText = "Войти"
        return {
            homeText,
            recommendedEventsText,
            allEventsText,
            yourEventsText,
            loginText
        }
    },
}
</script>

<style scoped>
.router-link
{
  text-decoration: none; /* отменяем подчеркивание ссылки */
  color: #fff;
}
</style>