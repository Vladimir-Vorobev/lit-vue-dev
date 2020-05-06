
<template>
<div>
    <div id="app">
        <div ref="background" class="btn-container">
            <div>
                <router-link to="/" class="router-link">
                    <div @mouseenter="ButtonEnter1()" @mouseleave="ButtonLeave1()" class="btn button1" ref="home">{{homeText}}</div>
                </router-link>
            </div>
            <div>
                <router-link to="/recommended-events" class="router-link">
                    <div @mouseenter="ButtonEnter2()" @mouseleave="ButtonLeave2()" class="btn button2" ref="recommendedEvents">{{recommendedEventsText}}</div>
                </router-link>
            </div>
            <div>
                <router-link to="/all-events" class="router-link">
                    <div @mouseenter="ButtonEnter3()" @mouseleave="ButtonLeave3()" class="btn button3" ref="allEvents">{{allEventsText}}</div>
                </router-link>
            </div>
            <div>
                <router-link to="/your-events" class="router-link">
                    <div @mouseenter="ButtonEnter4()" @mouseleave="ButtonLeave4()" class="btn button" ref="yourEvents">{{yourEventsText}}</div>
                </router-link>
            </div>
            <div>
                <router-link to="/registration" class="router-link">
                    <div @mouseenter="ButtonEnter5()" @mouseleave="ButtonLeave5()" class="btn button" ref="registration">{{registrationText}}</div>
                </router-link>
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
    methods:{
        ButtonEnter1(){
            this.$refs.home.style.borderBottomColor = "white"
        },
        ButtonLeave1(){
            this.$refs.home.style.borderBottomColor = "black"
        },
        ButtonEnter2(){
            this.$refs.recommendedEvents.style.borderBottomColor = "white"
        },
        ButtonLeave2(){
            this.$refs.recommendedEvents.style.borderBottomColor = "black"
        },
        ButtonEnter3(){
            this.$refs.allEvents.style.borderBottomColor = "white"
        },
        ButtonLeave3(){
            this.$refs.allEvents.style.borderBottomColor = "black"
        },
        ButtonEnter4(){
            this.$refs.yourEvents.style.borderBottomColor = "white"
        },
        ButtonLeave4(){
            this.$refs.yourEvents.style.borderBottomColor = "black"
        },
        ButtonEnter5(){
            this.$refs.registration.style.borderBottomColor = "white"
        },
        ButtonLeave5(){
            this.$refs.registration.style.borderBottomColor = "black"
        },
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
height: auto;
width: auto;
margin: 10px;
padding-bottom: 10px;
border: 10px;
border-width: 1px;
border-style: solid;
border-color: black;
 }

 .router-link{
text-decoration: none; /* отменяем подчеркивание ссылки */
 }
</style>