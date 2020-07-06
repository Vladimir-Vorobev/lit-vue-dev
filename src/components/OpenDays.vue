<template>
    <div class="main">
        <div class="container warp">
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
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import needle from 'needle'
import Footer from './footer.vue'
export default {
    name: 'OpenDays',
    components: { Footer },
    data(){
        return{
            data: []
        }
    },
    beforeMount(){
        fetch(this.$store.state.serverIp+'/api/getAllEvents', {
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
                needle.post(this.$store.state.serverIp+'/api/checkedEventsUpdate', {email: email, events: event, sessionid: SessionID}, {"json": true}, function(res, err){
                    if (err) throw err
                    if(res.body == '310'){
                        document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                        document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                        window.location.href = '/login'
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
.warp{
    flex: 1 0 auto;
}
.footer{
    flex: 0 0 auto;
}
.main{
    display: flex;
	flex-direction: column;
    padding-top: 110px !important;
}
.main{
    background-color: #eef5ff;
    height: 100%;
    padding: 30px 0px 0px;
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