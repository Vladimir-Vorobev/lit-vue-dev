<template>
        <div class="main main container">
            <div class="card">
                <div class="card-body row">
                    <div class="col-md-5 col-12"> <p class="card-text" style="font-weight: bold; font-size: 1.3em">Сортировка мероприятий: </p> </div> 
                        <div class="col-md-7 col-12" v-if="this.$route.path == '/all-events'"> 
                            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                                <option value="/all-events" selected>Все</option>
                                <option value="/it-events">IT</option>
                                <option value="/engineering-events">Инженерия</option>
                                <option value="/medicine-events">Медицина</option>
                            </select>
                        </div>
                        <div class="col-md-7 col-12" v-else-if="this.$route.path == '/it-events'"> 
                            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                                <option value="/all-events">Все</option>
                                <option value="/it-events" selected>IT</option>
                                <option value="/engineering-events">Инженерия</option>
                                <option value="/medicine-events">Медицина</option>
                            </select>
                        </div>
                        <div class="col-md-7 col-12" v-else-if="this.$route.path == '/medicine-events'"> 
                            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                                <option value="/all-events">Все</option>
                                <option value="/it-events">IT</option>
                                <option value="/engineering-events">Инженерия</option>
                                <option value="/medicine-events" selected>Медицина</option>
                            </select>
                        </div>
                        <div class="col-md-7 col-12" v-else> 
                            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                                <option value="/all-events">Все</option>
                                <option value="/it-events">IT</option>
                                <option value="/engineering-events" selected>Инженерия</option>
                                <option value="/medicine-events">Медицина</option>
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
                            <p><button class="btn btn-primary"  @click="add(item)">Собираюсь посетить</button></p>
                        <a :href="item.link" class="btn btn-primary" @click="setScroll()">Перейти к мероприятию</a>
                    </div>
                </div>
            </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'AllEvents',
    data(){
        let data = []
        return{
            data,
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
        .then(datan => {
            if(this.$route.path == '/all-events') this.data = datan.allE
            else if(this.$route.path == '/it-events') this.data = datan.programming
            else if(this.$route.path == '/medicine-events') this.data = datan.medicine
            else this.data = datan.engeniring
        })
    },
    mounted(){
        setTimeout(() => {
            window.scrollTo({
                top: this.$store.getters.allEventsScroll,
                behavior: 'auto'
            });
            this.$store.commit('SET_ALL_EVENTS_SCROLL', 0)
        }, 500);
    },
    methods:{
        add(event){
            let email = this.$store.getters.email
            if(email != ''){
                delete event.places
                needle.post('https://makual.ru/api/checkedEventsUpdate', {email: email, events: event}, {"json": true}, function(err){
                    if (err) throw err
                    else{
                        alert('Мероприятие успешно добавлено')
                        let notif = document.createElement('div');
                        notif.style.top = '150px';
                        notif.style.right = '150px';
                        notif.innerHTML = 'Мероприятие успешно добавлено';
                        document.body.append(notif);
                        console.log(notif)
                        setTimeout(() => notif.remove(), 1500);
                    }
                })
            }
            else{
                this.$route.path = "/login"
            }
        },
        setScroll(){
            document.cookie = "allEventsScroll=" + window.pageYOffset
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
    min-height: 1018px;
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