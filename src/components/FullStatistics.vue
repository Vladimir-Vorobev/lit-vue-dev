<template>
    <div class='main'>
        <div class="container warp">
            <h2>Статистика</h2>
            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                <option value="/friend-statistics">Статистика друзей</option>
                <option value="/school-statistics">Обобщенная статистика школы (только для сотрудников учебных заведений)</option>
                <option value="/full-school-statistics" selected>Полная статистика школы (только для сотрудников учебных заведений)</option>
            </select>
            <div v-for="(item, index) in data" :key="item.value">
                <div v-if="director">{{index + 1}} класс</div> <br>
                <div v-if="item.length == 0">Никого не зарегистрировано</div> <br>
                <div v-for="item2 in item" :key="item2.value">
                    <div>{{item2.name}} {{item2.surname}} {{item2.class_number}} {{item2.simvol}} </div> <br>
                    <div v-if="item2.checkedEvents.length == 0">Нигде не участвует</div> <br>
                    <div v-for="item3 in item2.checkedEvents" :key="item3.value">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{item3.name}}</h5>
                                <p class="card-text"><i class="far fa-clock"></i> {{item3.time}}</p>
                                <p class="card-text">Тип: {{item3.type}}</p>
                                <a :href="item3.link" class="btn btn-primary">Перейти к мероприятию</a>
                            </div>
                            <div class="card-footer text-muted">{{item3.date}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
export default {
    name: 'FullStatistics',
    components: { Footer },
    data(){
        return{
            s: 0,
            director: false,
            data: [],
        }
    },
    beforeMount(){
        if(this.$store.getters.email == ''){
          this.$router.push("/login")
        }
        let email = this.$store.getters.email
        let SessionID = this.$store.getters.SessionID
        fetch(this.$store.state.serverIp+'/api/getOtherInformation', {
            method: 'get',
            headers: {email: email, sessionid: SessionID},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(datan => {
            if(datan == '310'){
                document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                window.location.href = '/login'
            }
            if(datan.role == 'директор'){
                this.data = datan.data
                this.director = true
            }
            else if(datan.role == 'учитель'){
                this.data = datan.data
                for (let j = 0; j < this.data.length; j ++){
                    if (this.data[j].length != 0){
                        this.data = [datan.data[j]]
                        break
                    }
                }
                console.log(this.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
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
.card-body h5{ 
    font-weight: bold;
}
</style>