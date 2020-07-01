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
import Vue from 'vue';
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
        fetch('http://78.155.219.12:3000/api/getCheckedEvents', {
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
            console.log(data)
            this.data = data.checkedEvents
        })
        .catch(err => {
            console.log(err)
        })
     },
     methods:{
        deleteEvent(events){
            this.$swal({
                icon: 'warning',
                title: 'Вы уверены что хотите удалить?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Да',
                cancelButtonText: 'Отмена'
            }).then((result) => {
                if (result.value) {
                    event.preventDefault()
                    let email = this.$store.getters.email
                    let SessionID = this.$store.getters.SessionID
                    needle.post('http://78.155.219.12:3000/api/deleteEvent', {email: email, event: events, sessionid: SessionID}, {"json": true}, function(err, res){
                        if(err) console.log(err)
                        if(res.body == '310'){
                            document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                            document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                            window.location.href = '/login'
                        }
                        Vue.swal({
                            icon: 'success',
                            text: 'Мероприятие успешно удаленно',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                        }).then(() => {
                            window.location.reload()
                        });
                    })
                }
            });
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