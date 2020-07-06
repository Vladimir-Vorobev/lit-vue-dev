<template>
    <div class="main">
        <div class="container warp">
            <div class="row">
                <div class="col-1">
                    <button class='btn btn-light' @click="backInProfile()"><i class="fas fa-arrow-left"></i></button>
                </div>
                <div class="col-11">
                    <h3>Редактирование профиля:</h3>
                </div>
            </div>
            <form style="margin-top: 30px;">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Имя</span>
                            </div>
                            <input type="text" name="name" class="form-control name" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon2">Фамилия</span>
                            </div>
                            <input type="text" name="surname" class="form-control surname" aria-describedby="basic-addon2">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <input type="date" class="form-control age" name="age" min="1900-01-01">
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon3">Город</span>
                            </div>
                            <input name="city" class="form-control city" placeholder="Город" aria-describedby="basic-addon3">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon4">@</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Ник пользователя" aria-label="Короткое имя" aria-describedby="basic-addon4">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon5">Школа</span>
                            </div>
                            <input type="text" class="form-control school" name="school" aria-describedby="basic-addon5">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon6">Класс</span>
                            </div>
                            <input type="text" name="class_number" class="form-control class_number" aria-describedby="basic-addon6">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon7">Символ</span>
                            </div>
                            <input type="text" name="simvol" class="form-control simvol" aria-describedby="basic-addon7">
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12"> 
                        <select name="schoolType" class="custom-select custom-select-lg mb-3 schoolType">
                        <option selected>Тип учебного заведения</option>
                        <option value="школа">Школа</option>
                        <option value="колледж">Колледж</option>
                        <option value="университет">ВУЗ</option>
                        </select>
                    </div>
                </div>
                <h4>Данные для входа:</h4>
                <div class="form-group row">
                <div class="col-12"> 
                    <input class="form-control email" name="email" placeholder="example@gmail.com">
                </div>
                </div>
                <div class="form-group row">
                <div class="col-12"> 
                    <input type="password" class="form-control pass" name="password" placeholder="Новый пароль">
                </div>
                </div>
                <div class="form-group row">
                <div class="col-12"> 
                    <input name="password2" class="form-control returnpass" placeholder="Повторите пароль">
                </div>
                </div>
                <div class="form-group row"> 
                    <button class="btn btn-primary btn-lg" @click="updateUser()">Сохранить</button>
                </div>
            </form>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
// import Vue from 'vue';
import needle from 'needle'
export default {
    name: 'UserProfileEditor',
    components: { Footer },
    data(){
      return{
        email: this.$store.getters.email,
        SessionID: this.$store.getters.SessionID,
        userId: 0,
      }
    },
    beforeMount(){
        if(this.email == '') window.location.pathname = "/login"
        fetch(this.$store.state.serverIp+'/api/getInformation', {
            method: 'POST',
            headers: {email: this.email, sessionid: this.SessionID},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            if(data == '310'){
                document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
                window.location.reload()
            }
            if(data.city != undefined){
                document.querySelector(".city").value = data.city;
            }
            if(data.school != undefined){
                document.querySelector(".school").value = data.school;
            }
            if(data.schoolType != undefined){
                document.querySelector(".schoolType").value = data.schoolType;
            }
            // if(data.role != 'user' && data.role != 'student') {
            //   this.role = true
            // }
            if(data.class_number != undefined){
                document.querySelector(".class_number").value = data.class_number;
            }
            if(data.simvol != undefined){
                document.querySelector(".simvol").value = data.simvol;
            }
            // if(data.statNumber != undefined){
            //     var span = document.querySelector(".statNumber");
            //     if ('textContent' in span) {
            //     span.textContent = data.statNumber;
            //     } else {
            //     span.innerText = data.statNumber;
            //     }
            // }
            this.userId = data._id
            document.querySelector(".name").value = data.name;
            document.querySelector(".surname").value = data.surname;
            document.querySelector(".email").value = data.email;
            document.querySelector(".age").value = data.age;
        })
        .catch(err => {
            console.log(err)
        })
        },
    methods: {
        updateUser(){
            event.preventDefault()
            let re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
            let form = document.forms[0]
            let name = form.elements.name.value
            let surname = form.elements.surname.value
            let email = form.elements.email.value.replace(/\s/g, '')
            let age = form.elements.age.value
            let password = form.elements.password.value
            let password2 = form.elements.password2.value
            let city = form.elements.city.value
            let school = form.elements.school.value
            let schoolType = form.elements.schoolType.value
            let class_number = form.elements.class_number.value
            let simvol = form.elements.simvol.value
            if(password != password2){
            //alert("Пароли не совпадают")
            this.$swal({
                icon: 'error',
                text: 'Пароли не совпадают'
            });
            }
            else if(re.test(email) == false && email.trim() != ''){
            //alert("Введен некорректный email")
            this.$swal({
                icon: 'error',
                text: 'Введен некорректный email'
            })
            }
            else if(password.length < 5 && password.trim() != ''){
            //alert("Пароль слишком короткий")
            this.$swal({
                icon: 'error',
                text: 'Пароль слишком короткий'
            })
            }
            else if(password.length > 15){
            //alert("Пароль слишком длинный")
            this.$swal({
                icon: 'error',
                text: 'Пароль слишком длинный'
            })
            }
            else{
                let crypto = require('crypto')
                let dataq = {}
                if(name.trim() != '') dataq.name = name
                if(surname.trim() != '') dataq.surname = surname
                if(email.trim() != '') dataq.email = email
                if(age.trim() != '') dataq.age = age
                if(password.trim() != '') dataq.password = crypto.createHash('md5').update(password).digest("hex")
                if(city.trim() != '') dataq.city = city
                if(school.trim() != '') dataq.school = school
                if(schoolType.trim() != '' && schoolType != "Тип учебного заведения") dataq.schoolType = schoolType
                if(class_number.trim() != '') dataq.class_number = class_number
                if(simvol.trim() != '') dataq.simvol = simvol
                needle.post(this.$store.state.serverIp+'/api/updateInformation', {email: this.email, sessionid: this.SessionID, update: dataq}, {"json": true}, function(err){
                    if (err) console.log(err)
                    window.location.reload()
                })
            }
        },
        backInProfile(){
            //надо сделать переход назад к профилю пользователя, пока тут alert
            // Vue.swal({
            //     icon: 'error',
            //     text: 'Функция временно не доступна!',
            //     showConfirmButton: false,
            //     timer: 1500,
            //     timerProgressBar: true,
            // });
            let userId = this.userId
            this.$router.push({ path: `/user-profile/${userId}` })
        },
    }
}
</script>

<style scoped>
.warp{
    flex: 1 0 auto;
    padding-top: 150px !important;
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


</style>