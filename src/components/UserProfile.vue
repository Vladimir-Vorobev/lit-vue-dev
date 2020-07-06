<template>
    <div class="main">
        <div class="container warp">
            <div class="person_info row" >
                <div class="col-12 col-md-4" style="padding: 30px 15px 15px">
                    <div class="photo pblock">
                        <div class="avatar">
                            <img src="./../assets/noavatar.jpg" alt="">
                        </div>
                        <button @click="GoToEditor()" class="btn btn-light" style="width: 100%; margin-top: 15px;">Редактировать</button>
                    </div>
                </div>
                
                <div class="col-12 col-md-8" style="padding: 30px 15px 15px">
                    <div class="pblock">
                        <div class="row">
                            <div class="col-9"><h4 style="margin-bottom: 0px;">{{person_name}}</h4></div>
                            <div class="col-3">
                                <small class="text-muted" style="vertical-align: bottom;">online</small>
                            </div>
                        </div>
                        <hr style="margin-top: 3px;">
                        <div class="info">
                            <div class="row">
                                <div class="col-6 text-muted">Дата рождения: </div>
                                <div class="col-6">{{person_date}}</div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-muted">Школа: </div>
                                <div class="col-6">{{person_school}}</div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-muted">Класс и символ: </div>
                                <div class="col-6">{{person_grade}}</div>
                            </div>
                        </div>
                        <div style="border-top: 1px solid lightgray; margin-top: 150px; margin-right: -20px; margin-left: -20px">
                            <div class="row justify-content-center container" style="padding: 0px 20px;">
                                <div class="col-4 col-md-2" style="height: 100%; padding: 15px 0px; margin: 0px 15px">
                                    <div @click="PersonFriends()" style="font-size: 22px; color: #2a5885; padding-bottom: 3px; line-height: 21px; cursor: pointer;">22</div>
                                    <div style="line-height: 15px; color: #828282;">друга</div>
                                </div>
                                <div class="col-5 col-md-3" style="height: 100%; padding: 15px 0px; margin: 0px 15px">
                                    <div @click="PersonEvents()" style="font-size: 22px; color: #2a5885; padding-bottom: 3px; line-height: 21px; cursor: pointer;">30</div>
                                    <div style="line-height: 15px; color: #828282;">мероприятий</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="person_statistic row" style="padding: 15px 15px">
                <div class="pblock">
                    <h4>Статистика:</h4>
                    сюда статистику
                </div>
            </div>
            <div class="person_events row" style="padding: 15px 15px 30px">
                <div class="pblock">
                    <h4>Ближайшие мероприятия:</h4>
                    <div class="row">
                        <div class="col-12 col-md-5">
                            <h5>Направеление:</h5> 
                        </div>
                        <div class="col-12 col-md-7">
                            <select class="custom-select custom-select-sm mb-3 events" style="width: 100%;">
                                <option value="" selected>Все</option>
                                <option value="">IT</option>
                                <option value="">Инженерия</option>
                                <option value="">Сфера услуг</option>
                            </select>
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
import Vue from 'vue';

export default {
    name: 'UserProfile',
    components: { Footer },
    data(){
      return{
        id: this.$route.params.id,
        email: this.$store.getters.email,
        SessionID: this.$store.getters.SessionID,
        person_name: ' ',
        person_date: ' ',
        person_grade: ' ',
        person_school: ' ',
      }
    },
    beforeMount(){
        if(this.email == '') window.location.pathname = "/login"
        fetch(this.$store.state.serverIp+'/api/getIdInformation', {
            method: 'POST',
            headers: {id: this.id, email: this.email, sessionid: this.SessionID},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            if(data == '310'){
                // document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                // document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                // window.location.reload()
                console.log("err 310")
            }
            this.person_name = data.name + ' ' + data.surname
            let personDate = data.age
            personDate = personDate.split('-')
            personDate = new Date(personDate[0], personDate[1]-1, personDate[2]);
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            this.person_date = personDate.toLocaleString("ru", options)
            if(data.class_number != undefined || data.simvol != undefined){
                this.person_grade = data.class_number + ' ' + data.simvol
            }
            else{
                this.person_grade = 'Не указаны'
            }
            if(data.school != undefined){
                this.person_school = data.school
            }
            else{
                this.person_school = 'Не указана'
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    methods: {
        PersonEvents(){
            //надо сделать переход на мероприятия этого человека, пока тут alert
            Vue.swal({
                icon: 'error',
                text: 'Функция временно не доступна!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
        },
        PersonFriends(){
            //надо сделать переход на список друзей этого человека, пока тут alert
            Vue.swal({
                icon: 'error',
                text: 'Функция временно не доступна!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
        },
        GoToEditor(){
            this.$router.push({ path: `/user-profile-edit` })
        }
    },
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
    padding-top: 95px !important;
}
.main{
    height: 100%;
    padding: 30px 0px 0px;
    min-height: 100vh;
    margin-bottom: 0px;
}

.pblock{
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    -webkit-box-shadow: 0px 2px 5px 1px rgba(34, 60, 80, 0.18);
    -moz-box-shadow: 0px 2px 5px 1px rgba(34, 60, 80, 0.18);
    box-shadow: 0px 2px 5px 1px rgba(34, 60, 80, 0.18);
    min-height: 300px;
    padding: 15px 20px;
}
.avatar{
    min-width: 310px;
    min-height: 310px;
    max-width: 310px;
    max-height: 310px;
}
.avatar img{
    /* object-fit: fill; fill or contain */
    /* max-width: 310px;
    max-height: 310px; */
    display: block;
    max-width: 100%;
    max-height: 100%;
    min-width: 310px;
    min-height: 310px;
}

.info{
    text-align: left;
}

</style>