<template>
    <div class="main container">
        <div class="card" v-for="item in data" :key="item.value">
            <div class="card-header">{{item.date}}</div>
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <p class="card-text"><i class="far fa-clock"></i> {{item.time}}</p>
                <p class="card-text">Тип: {{item.type}}</p>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" @click="add(item)"><label class="form-check-label" for="defaultCheck1"> <small> Собираюсь посетить </small> </label>
                </div> <br>
                <a :href="item.link" class="btn btn-primary">Перейти к мероприятию</a>
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