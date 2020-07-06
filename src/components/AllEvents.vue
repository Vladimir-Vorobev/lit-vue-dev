<template>
    <div class="main">
        <div class="container warp">
            <div class="card">
                <div class="card-body row">
                    <div class="col-md-5 col-12"> <p class="card-text" style="font-weight: bold; font-size: 1.3em">Сортировка мероприятий: </p> </div> 
                        <!-- <div class="col-md-7 col-12" v-if="this.$route.path == '/all-events'"> 
                            <select class="custom-select custom-select-sm mb-3 events " onchange="location.href=this.value">
                                <option value="/all-events">Все</option>
                                <option value="/it-events" selected>IT</option>
                                <option value="/engineering-events">Инженерия</option>
                                <option value="/service-events">Сфера услуг</option>
                            </select>
                        </div> -->
                        <div class="col-md-7 col-12" v-if="this.$route.path == '/it-events'"> 
                            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                                <!-- <option value="/all-events">Все</option> -->
                                <option value="/it-events" selected>IT</option>
                                <option value="/engineering-events">Инженерия</option>
                                <option value="/service-events">Сфера услуг</option>
                            </select>
                        </div>
                        <div class="col-md-7 col-12" v-else-if="this.$route.path == '/service-events'"> 
                            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                                <!-- <option value="/all-events">Все</option> -->
                                <option value="/it-events">IT</option>
                                <option value="/engineering-events">Инженерия</option>
                                <option value="/service-events" selected>Сфера услуг</option>
                            </select>
                        </div>
                        <div class="col-md-7 col-12" v-else> 
                            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                                <!-- <option value="/all-events">Все</option> -->
                                <option value="/it-events">IT</option>
                                <option value="/engineering-events" selected>Инженерия</option>
                                <option value="/service-events">Сфера услуг</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card" v-for="item in data" :key="item.value">
                    <div class="card-header">{{item.date}}</div>
                    <div class="card-body">
                        <h5 class="card-title">{{item.name}}</h5>
                        <p class="card-text"><i class="far fa-clock"></i> {{item.time}}</p>
                        <p class="card-text"><i class="far fa-user"></i> {{item.places}}</p>
                        <p class="card-text">Тип: {{item.type}}</p>
                        <p><button class="btn btn-outline-info"  @click="add(item)">Собираюсь посетить</button></p>
                        <a :href="item.link" class="btn btn-primary" @click="setScroll()">Перейти к мероприятию</a>
                    </div>
                </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import needle from 'needle'
import Vue from 'vue';
import Footer from './footer.vue'
export default {
    name: 'AllEvents',
    components: { Footer },
    data(){
        return{
            data: [],
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
        .then(datan => {
            if(this.$route.path == '/it-events') this.data = datan.programming
            else if(this.$route.path == '/service-events') this.data = datan.service
            else this.data = datan.engeniring
        })
    },
    mounted(){
        setTimeout(() => {
            window.scrollTo({
                top: this.$store.getters.allEventsScroll,
                behavior: 'auto'
            });
        }, 500);
        this.$store.commit('SET_ALL_EVENTS_SCROLL', 0)
    },
    methods:{
        add(event){
            let email = this.$store.getters.email
            let SessionID = this.$store.getters.SessionID
            if(email != ''){
                delete event.places
                if(this.$route.path == '/it-events') event.mainType = 'programming'
                else if(this.$route.path == '/service-events') event.mainType = 'service'
                else event.mainType = 'engeniring'
                console.log(event)
                needle.post(this.$store.state.serverIp+'/api/checkedEventsUpdate', {email: email, events: event, sessionid: SessionID}, {"json": true}, function(err, res){
                    if (err) throw err
                    if(res.body == '310'){
                        document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                        document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                        window.location.href = '/login'
                    }
                    else{
                        //alert('Мероприятие успешно добавлено')
                        Vue.swal({
                            icon: 'success',
                            text: 'Мероприятие успешно добавлено',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                        });
                    }
                })
            }
            else{
                this.$swal({
                    icon: 'error',
                    title: 'Вы не авторизованы!',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Авторизоваться',
                    cancelButtonText: 'Отмена'
                }).then((result) => {
                    if (result.value) {
                        window.location.pathname = "/login"
                    }
                });
                //window.location.pathname = "/login"
            }
        },
        setScroll(){
            document.cookie = "allEventsScroll=" + window.pageYOffset
        },
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
.card-body h5{
    font-weight: bold;
}
.card-header{
    font-weight: bold;
}
</style>