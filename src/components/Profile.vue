<template>
    <div class="main">
      <div class="container warp">
        <form class="formbox">
            <div class="row" style="margin-bottom: 1em;">
              <h2 class="col-11">Редактировать профиль</h2>
              <div class="col-1"><button class='btn btn-danger' @keyup.enter="notexit()" @click="exit()"><i class="fas fa-sign-out-alt"></i></button></div>
            </div>
            <div class="row" v-if="role">
              <div class="col-9 col-md-3">
                <router-link to="/admin" class="btn btn-secondary btn-lg">Административная панель</router-link>
              </div>
            </div> <br>
            <div class="form-group row">
              <div class="col-12 col-md-6"><input name="name" class="form-control name" placeholder="Имя"></div>
              <div class="col-12 col-md-6"><input name="surname"  class="form-control surname" placeholder="Фамилия"></div>
            </div>
            <div class="form-group row">
              <div class="col-12"> 
                <input class="form-control email" name="email" placeholder="example@gmail.com">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12">
                <input type="date" class="form-control age" name="age" min="1900-01-01">
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
              <div class="col-12 col-md-7"> 
                <input name="city" class="form-control city" placeholder="Город">
              </div>
              <div class="col-12 col-md-5"> 
                <input name="school" class="form-control school" placeholder="Номер учебного заведения">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 col-md-6"> 
                <select name="schoolType" class="custom-select custom-select-lg mb-3 schoolType">
                  <option selected>Тип учебного заведения</option>
                  <option value="школа">Школа</option>
                  <option value="колледж">Колледж</option>
                  <option value="университет">ВУЗ</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 col-md-6"><input name="class_number" class="form-control class_number" placeholder="Номер класса"></div>
              <div class="col-12 col-md-6"><input name="simvol" class="form-control simvol" placeholder="Символ класса"></div>
            </div>
            <div class="form-group row"> 
                <button class="btn btn-primary btn-lg" @click="updateUser()">Сохранить</button>
            </div>
        </form>
        <div class='row' style="text-align: left;">
          <h5 class="col-12">Уникальный номер: <span class="statNumber"></span> </h5>
        </div>
        <div class="row num">
            <div class="col-12 col-md-8"><span>Этот номер необходим, если Вы хотите делиться своей статистикой с другими пользователями, например, с родителями или друзьями. Внимание: предоставляйте этот номер только тем, кому Вы доверяете</span> <br> <router-link to="/friend-statistics">Посмотреть статистику знакомых</router-link></div>
            <div class="number"></div>
            <div class="col-12 col-md-4"><button class="btn btn-info btn-lg" @click="addNumber()">Создать уникальный номер</button></div>
        </div>
      </div>
      <div class="footer"><Footer></Footer></div>
    </div>
</template>

<script>
import needle from 'needle'
import Footer from './footer.vue'
export default {
    name: 'Profile',
    components: { Footer },
    data(){
      return{
        email: this.$store.getters.email,
        SessionID: this.$store.getters.SessionID,
        role: false,
      }
    },
    beforeMount(){
      if(this.email == '') window.location.pathname = "/login"
      fetch('http://78.155.219.12:3000/api/getInformation', {
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
          if(data.statNumber != undefined){
            var span = document.querySelector(".statNumber");
            if ('textContent' in span) {
              span.textContent = data.statNumber;
            } else {
              span.innerText = data.statNumber;
            }
          }
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
            needle.post('http://78.155.219.12:3000/api/updateInformation', {email: this.email, sessionid: this.SessionID, update: dataq}, {"json": true}, function(err){
                if (err) console.log(err)
                window.location.reload()
            })
        }
      },
      addNumber(){
        event.preventDefault()
        let statNumber = {statNumber: Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000}
        needle.post('http://78.155.219.12:3000/api/updateInformation', {email: this.email, update: statNumber, sessionid: this.SessionID}, {"json": true}, function(err){
          if(err) console.log(err)
          window.location.reload()
        })
      },
      exit(){
        document.cookie = "email=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
        document.cookie = "SessionID=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
        window.location.reload()
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

.link{
  color: #4f4f50;
  text-decoration: none;
}
.link:hover{
  color: #EF5B65;
  text-decoration: none;
}
.num{
  margin-top: 50px;;
}
</style>