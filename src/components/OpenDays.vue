<template>
    <div class="main container">
        <div class="card" v-for="item in data" :key="item.value">
            <div class="card-header">{{item.date}}</div>
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <p class="card-text"><i class="far fa-clock"></i> {{item.time}}</p>
                <p class="card-text">Тип: {{item.type}}</p>
                <p><button class="btn btn-info"  @click="add(item)">Собираюсь посетить</button></p>
                <a :href="item.link" class="btn btn-primary" @click="setScroll()">Перейти к мероприятию</a>
            </div>
        </div>
    </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'OpenDays',
    data(){
        return{
            data: []
        }
    },
    beforeMount(){
        fetch('https://makual.ru/api/getAllEvents', {
            method: 'get',
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            this.data = data.open
        })
    },
    mounted(){
        setTimeout(() => {
            window.scrollTo({
                top: this.$store.getters.openDaysScroll,
                behavior: 'auto'
            });
        }, 500);
        this.$store.commit('SET_OPEN_DAYS_SCROLL', 0)
    },
    methods:{
        add(event){
            let email = this.$store.getters.email
            let SessionID = this.$store.getters.SessionID
            if(email != ''){
                delete event.places
                needle.post('https://makual.ru/api/checkedEventsUpdate', {email: email, events: event, sessionid: SessionID}, {"json": true}, function(res, err){
                    if (err) throw err
                    if(res.body == '310'){
                        document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                        document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                        window.location.reload()
                    }
                })
            }
            else{
                window.location.pathname = "/login"
            }
        },
        setScroll(){
            document.cookie = "openDaysScroll=" + window.pageYOffset
        }
    }
}            
</script>

<style scoped>
.main{
    padding-top: 110px !important;
}
.main{
    background-color: #eef5ff;
    height: 100%;
    padding: 30px;
    min-height: 100vh;
    margin-bottom: 0px;
}
.card{ 
    margin-top: 10px !important;
}
.card-body{ 
    text-align: left !important;
}
.card-header{
    font-weight: bold;
}
.card-body h5{ 
    font-weight: bold;
}
</style>