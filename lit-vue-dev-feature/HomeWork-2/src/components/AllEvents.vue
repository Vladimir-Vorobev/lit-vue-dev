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
                            <div class="form-check"> <input class="form-check-input" type="checkbox">
                            <label class="form-check-label" for="defaultCheck1"> <small> Собираюсь посетить </small> </label>
                        </div> <br>
                        <a href: item.link class="btn btn-primary">Перейти к мероприятию</a>
                    </div>
                </div>
            </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'AllEvents',
    data(){
        let data
        needle.get('https://makual.ru/api/getAllEvents',function(err, res){
            if(err) console.log(err)
            else{
                if(this.$route.path == '/all-events') data = res.body.allE
                else if(this.$route.path == '/it-events') data = res.body.programming
                else if(this.$route.path == '/medicine-events') data = res.body.medicine
                else data = res.body.engeniring
            }
        })
        return{
            data
        }
    },
    mounted(){
        let email = this.$store.getters.email
        setInterval(() => {
            for(let i = 0; i < this.data.length; i++){
                let box = document.querySelector('.form-check-input')
                if(box.checked){
                    if(email != ''){
                        if(confirm('Вы уверены, что хотите посетить данное мероприятие?')){
                            box.checked = false
                            let datas = this.data[i]
                            delete datas.places
                            needle.post('https://makual.ru/api/checkedEventsUpdate', {email: email, events: datas}, {"json": true}, function(err){
                                if (err) throw err

                            })
                        }
                        else{box.checked = false}
                    }
                    else{
                        this.$route.path = "/login"
                    }
                }
                
            }
        }, 500);
    },
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