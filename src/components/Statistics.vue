<template>
    <div class='main'>
        <div class="container warp">
            <h2>Статистика</h2>
            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                <option value="/friend-statistics">Статистика друзей</option>
                <option value="/school-statistics" selected>Обобщенная статистика школы (только для сотрудников учебных заведений)</option>
                <option value="/full-school-statistics">Полная статистика школы (только для сотрудников учебных заведений)</option>
            </select>
            <div v-if="director">
                <div class="rate" v-for="(item, index) in data" :key="item.value">
                    <span class="numr row">{{index + 1}} класс</span>
                    <span class="row colv">Учеников зарегистрировано: {{item.length}}</span>
                    <span class="row colv">Учеников, посетивших 0 мероприятий: {{a[index]}}</span>
                    <span class="row colv">Учеников, посетивших от 1 до 5 мероприятий: {{c[index]}}</span>
                    <span class="row colv">Учеников, посетивших от 5 до 10 мероприятий: {{d[index]}}</span>
                    <span class="row colv">Учеников, посетивших более 10 мероприятий: {{e[index]}}</span>
                </div>
            </div>
            <div class="rate" v-else>
                <span class="row colv">Учеников зарегистрировано: {{data.length}}</span>
                <span class="row colv">Учеников, посетивших 0 мероприятий: {{a[s]}}</span>
                <span class="row colv">Учеников, посетивших от 1 до 5 мероприятий: {{c[s]}}</span>
                <span class="row colv">Учеников, посетивших от 5 до 10 мероприятий: {{d[s]}}</span>
                <span class="row colv">Учеников, посетивших более 10 мероприятий: {{e[s]}}</span>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
export default {
    name: 'Statistics',
    components: { Footer },
    data(){
        return{
            data: [],
            director: false,
            s: 0,
            a: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            c: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            d: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            e: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
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
                for(let i = 0; i < this.data.length; i++){
                    for(let j = 0; j < this.data[i].length; j++){
                        if(this.data[i][j].checkedEvents.length == 0){
                            this.a[i] += 1
                        }
                        else if(this.data[i][j].checkedEvents.length > 0 && this.data[i][j].checkedEvents.length <= 5){
                            this.c[i] += 1
                        }
                        else if(this.data[i][j].checkedEvents.length > 5 && this.data[i][j].checkedEvents.length <= 10){
                            this.d[i] += 1
                        }
                        else{
                            this.e[i] += 1
                        }
                    }
                }
            }
            else if(datan.role == 'учитель'){
                this.data = datan.data
                for (let j = 0; j < this.data.length; j ++){
                    if (this.data[j].length != 0){
                        this.s = j
                        this.data = datan.data[this.s]
                        break
                    }
                }
                console.log(this.data)
                for(let i = 0; i < this.data.length; i++){
                    if(this.data[i].checkedEvents.length == 0){
                        this.a[this.s] += 1
                    }
                    else if(this.data[i].checkedEvents.length > 0 && this.data[i].checkedEvents.length <= 5){
                        this.c[this.s] += 1
                    }
                    else if(this.data[i].checkedEvents.length > 5 && this.data[i].checkedEvents.length <= 10){
                        this.d[this.s] += 1
                    }
                    else{
                        this.e[this.s] += 1
                    }
                }
                console.log(this.c)
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    },
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