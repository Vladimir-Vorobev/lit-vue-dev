<template>
    <div class="main container">
        <div class="card" v-for="item in data" :key="item.value">
            <div class="card-header">{{item.date}}</div>
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <p class="card-text"><i class="far fa-clock"></i> {{item.time}}</p>
                <p class="card-text">Тип: {{item.type}}</p>
                <p><button class="btn btn-primary"  @click="add(item)">Собираюсь посетить</button></p>
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
        let data = []
        return{
            data
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
            this.$store.commit('SET_OPEN_DAYS_SCROLL', 0)
        }, 200);
    },
    methods:{
        add(event){
            let email = this.$store.getters.email
            if(email != ''){
                delete event.places
                needle.post('https://makual.ru/api/checkedEventsUpdate', {email: email, events: event}, {"json": true}, function(err){
                    if (err) throw err
                })
            }
            else{
                this.$route.path = "/login"
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
    background-color: rgb(231, 231, 231);
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