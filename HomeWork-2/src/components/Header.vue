
<template>
<div>
    <div id="app">
        <div ref="background" class="btn-container">
            <div>
                <router-link ref="home" to="/" class="btn">{{homeText}}</router-link>
            </div>
            <div>
                <router-link ref="recommendedEvents" to="/recommended-events" class="btn">{{recommendedEventsText}}</router-link>
            </div>
            <div>
                <router-link ref="allEvents" to="/all-events" class="btn">{{allEventsText}}</router-link>
            </div>
            <div>
                <router-link ref="yourEvents" to="/your-events" class="btn">{{yourEventsText}}</router-link>
            </div>
            <div>
                <router-link ref="registration" to="/registration" class="btn">{{registrationText}}</router-link>
            </div>
        </div>
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
        let registrationText = "Войти"
        return {
            homeText,
            recommendedEventsText,
            allEventsText,
            yourEventsText,
            registrationText
        }
    },
    
}
</script>

<style scoped>
.btn-container {
display: flex;
position: fixed; 
top: 0;
width: 100%;
background-color: black;
padding-top: 100px;
padding-bottom: 100px;
justify-content: center;
}

.btn {
display: inline;
cursor: pointer;
color: white;
text-align: center;
line-height: 50px;
height: 50px;
width: 100px;
margin: 10px;
border-radius: 50px;
background-color: black;

text-decoration: none; /* отменяем подчеркивание ссылки */
 }
</style>