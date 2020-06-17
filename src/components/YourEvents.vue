<template>
    <div class="main main container" id="main">
        <div v-if="data.length == 0"><h3>Возможно, Вы еще не добавили ни одного мероприятия, посмотрите страницу всех мероприятий</h3></div>
        <div class="card" v-for="item in data" :key="item.value">
            <div class="card-header">{{item.date}}</div>
            <div class="card-body">
                <div class="row">
                    <h5 class="card-title col-11">{{item.name}}</h5>
                    <h5><button class="btn btn-danger" @click="deleteEvent(item)"> <i class="fas fa-trash-alt"></i> </button></h5>
                </div>
                <p class="card-text"><i class="far fa-clock"></i> {{item.time}}</p>
                <p class="card-text">Тип: {{item.type}}</p>
                <a :href="item.link" class="btn btn-primary">Перейти к мероприятию</a>
            </div>
        </div>
    </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'YourEvents',
    data(){
        return{
            data: []
        }
    },
     beforeMount(){
        let email = this.$store.getters.email
        let SessionID = this.$store.getters.SessionID
        fetch('https://makual.ru/api/getCheckedEvents', {
            method: 'get',
            headers: {email: email, sessionid: SessionID},
		})
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            if(data == '310'){
                document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                window.location.href = '/login'
            }
            this.data = data
        })
        .catch(err => {
            console.log(err)
        })
     },
     methods:{
         deleteEvent(events){
            event.preventDefault()
            let email = this.$store.getters.email
            let SessionID = this.$store.getters.SessionID
            needle.post('https://makual.ru/api/deleteEvent', {email: email, event: events, sessionid: SessionID}, {"json": true}, function(err, res){
                if(err) console.log(err)
                if(res.body == '310'){
                    document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                    document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                    window.location.href = '/login'
                }
                window.location.reload()
            })
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
    min-height: 1018px;
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
.card-title{
    text-align: center;
}
</style>