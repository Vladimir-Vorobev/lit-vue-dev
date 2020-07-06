<template>
    <div class='main'>
        <div class="container warp">
            <h2>Статистика</h2>
            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                <option value="/friend-statistics" selected>Статистика друзей</option>
                <option value="/school-statistics">Обобщенная статистика школы (только для сотрудников учебных заведений)</option>
                <option value="/full-school-statistics">Полная статистика школы (только для сотрудников учебных заведений)</option>
            </select>
            <div class="form-group row">
                <div class="col-12 col-md-8"><input name="code" class="form-control name" placeholder="Код от Вашего друга"></div>
                <div class="col-12 col-md-4" style="padding: 0px 15px;"><button class="btn btn-outline-success" style="width: 100%;" @click="addFriend()">Добавить друга</button></div>
            </div>
            <div class="form-group row code"></div>
            <div class="student" v-for="item in data" :key="item.value">
                <div class="si row">
                    <div class="col-12 col-md-6"><span class="ns">{{item.name}} {{item.surname}}</span></div>
                    <div class="col-6 col-md-3">Класс: <span class="numc">{{item.class_number}}</span></div>
                    <div class="col-6 col-md-3">Символ: <span class="simvol">{{item.simvol}}</span></div>
                </div>
                <div v-if="item.checkedEvents.length == 0">Нигде не участвует <br></div>
                <div class="card" v-else v-for="item2 in item.checkedEvents" :key="item2.value">
                    <div class="card-header">{{item2.date}}</div>
                    <div class="card-body">
                        <h5 class="card-title">{{item2.name}}</h5>
                        <p class="card-text"><i class="far fa-clock"></i> {{item2.time}}</p>
                        <p class="card-text">Тип: {{item2.type}}</p>
                        <a :href="item2.link" class="btn btn-primary">Перейти к мероприятию</a>
                    </div>
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
    name: 'Statistics',
    components: { Footer },
    data(){
        return{
            data: []
        }
    },
    beforeMount(){
        if(this.$store.getters.email == ''){
          this.$router.push("/login")
        }
        let email = this.$store.getters.email
        let SessionID = this.$store.getters.SessionID
        fetch(this.$store.state.serverIp+'/api/getCodeInformation', {
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
        addFriend(){
            event.preventDefault()
            let SessionID = this.$store.getters.SessionID
            if(document.querySelector('.name').value.trim() == ''){
                this.$swal({
                    icon: 'warning',
                    text: 'Введите номер'
                }); //alert('Введите номер')
            }
            else if(document.querySelector('.name').value.trim() == '-1'){
                this.$swal({
                    icon: 'error',
                    text: 'Введите корректный номер'
                });//alert('Введите корректный номер')
            } 
            else{
                let email = this.$store.getters.email
                needle.post(this.$store.state.serverIp+'/api/addFriendCode', {email: email, sessionid: SessionID, statNumber: document.querySelector('.name').value}, {"json": true}, function(err, res){
                if (err) console.log(err)
                if(res.body == '310'){
                    document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                    document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                    window.location.href = '/login'
                }
                else{
                    let data = res.body
                    if(data == 'Code not found'){
                        //alert('Пользователь не найден')
                        this.$swal({
                            icon: 'error',
                            text: 'Пользователь не найден'
                        });
                    }
                    else{
                        //alert('Пользователь успешно добавлен')
                        this.$swal({
                            icon: 'success',
                            text: 'Пользователь успешно добавлен'
                        });
                        document.location.reload()
                    }
                }
                })
            }
        }
    }
}
</script>

<style scoped>
.warp{
    flex: 1 0 auto;
    padding-top: 110px !important;
    background-color: #fff;
    padding: 0px 30px;
}
.footer{
    flex: 0 0 auto;
}
.main{
    display: flex;
	flex-direction: column;
}
.main{
    height: 100%;
    padding: 0px;
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
.student{
    margin-top: 2.5em;border: 1.5px solid #818181;
    /* Белая рамка */
    border-radius: 10px;
    /* Радиус скругления */
    padding: 1.2em;
}
.si{
    font-size: 1.5em;margin-bottom: 1.5em;
}
.stat_school{
    margin-top: 1.5em;
}
.rate{
    text-align: left;
    font-size: 1.3em;
    margin-bottom: 2em;
}
.numr{
    font-size: 1.5em !important;
    font-weight: bold;
}
.colv{
    margin-left: 1.5em;
}
</style>