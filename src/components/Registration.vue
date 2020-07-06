<template>
    <div class="main">
      <div class="container warp">
        <form class="formbox">
            <h2>Регистрация</h2>
            <div class="form-group row">
              <label for="exampleInputEmail1">Имя</label>
              <input name="name" class="form-control" placeholder="Иван">
            </div>
            <div class="form-group row">
              <label for="exampleInputEmail1">Фамилия</label>
              <input name="surname" class="form-control" placeholder="Иванов">
            </div>
            <div class="form-group row">
              <label for="exampleInputEmail1">Email адресс</label>
              <input name="email" class="form-control" placeholder="example@gmail.com">
            </div>
            <div class="form-group row">
              <label for="exampleInputEmail1">Дата рождения</label>
              <input type="date" class="form-control" name="age" min="1900-01-01">
            </div>
            <div class="form-group row">
              <label for="exampleInputPassword1">Пароль {{passwordText}}</label>
              <input type="password" class="form-control" name="password" placeholder="1234567">
            </div>
            <div class="form-group row">
              <label for="exampleInputPassword1">Повторите пароль</label>
              <input type="password" class="form-control" name="password2" placeholder="1234567">
            </div>
            <div class="form-group row code" style="visibility: hidden;">
              <label for="exampleInputPassword1">Введите код подтверждения из Вашей почты</label>
              <input type="password" class="form-control" name="code" placeholder="1234567">
            </div>
            <div class="row"> 
              <button class="btn btn-primary btn-lg" @click="addUser()">Зарегистрироваться</button>
            </div>
        </form>
      </div>
      <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import needle from "needle"
import Vue from 'vue'
import Footer from './footer.vue'
export default {
    name: 'Registration',
    components: { Footer },
    data(){
      return{
        passwordText: ""
      }
    },
    methods: {
      addUser(){
        event.preventDefault()
        let re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        let form = document.forms[0]
        let namet = form.elements.name.value
        let surname = form.elements.surname.value
        let email = form.elements.email.value.replace(/\s/g, '')
        let age = form.elements.age.value
        let password = form.elements.password.value
        let password2 = form.elements.password2.value
        let code = form.elements.code.value
        if(namet.trim() == ''){
          //alert("Введите имя")
          this.$swal({
              icon: 'warning',
              text: 'Введите имя'
          });
        }
        else if(surname.trim() == ''){
          //alert("Введите фамилию")
          this.$swal({
              icon: 'warning',
              text: 'Введите фамилию'
          });
        }
        else if(email.trim() == ''){
          //alert("Введите email")
          this.$swal({
              icon: 'warning',
              text: 'Введите email'
          });
        }
        else if(age.trim() == ''){
          //alert("Введите дату рождения")
          this.$swal({
              icon: 'warning',
              text: 'Введите дату рождения'
          });
        }
        else if(password.trim() == ''){
          //alert("Введите пароль")
          this.$swal({
              icon: 'warning',
              text: 'Введите пароль'
          });
        }
        else if(password != password2){
          //alert("Пароли не совпадают")
          this.$swal({
              icon: 'error',
              text: 'Пароли не совпадают'
          });
        }
        else if(re.test(email) == false){
          //alert("Введен некорректный email")
          this.$swal({
              icon: 'error',
              text: 'Введен некорректный email'
          });
        }
        else if(password.length < 5){
          //alert("Пароль слишком короткий")
          this.$swal({
              icon: 'error',
              text: 'Пароль слишком короткий'
          });
        }
        else if(password.length > 15){
          //alert("Пароль слишком длинный")
          this.$swal({
              icon: 'error',
              text: 'Пароль слишком длинный'
          });
        }
        else{
          let data = document.cookie.split(";")
          let name = ''
          let b = 0
          for(let i = 0; i < data.length; i++){
            let value = data[i].toString()
            for(let j = 0; j < value.length; j++){
              if(data[i][j] == "="){
                if(name == '_relx'){
                  b = 1
                }
                name = ''
              }
              else if(data[i][j] != " "){
                name += data[i][j]
              }
            }
            if(b == 1){
              this.codeCheck = name
              break
            }
            name = ''
          }
          if(document.querySelector('.code').style.visibility == 'hidden'){
            document.querySelector('.code').style.visibility = 'visible'
            needle.post(this.$store.state.serverIp+'/api/mailCheck', {email: email}, {"json": true}, function(err, res){
              if (err) throw err
              alert(res.body)
              document.cookie = "_relx=" + res.body
            })
          }
          else if(code == this.codeCheck){
            let crypto = require('crypto')
            let data = {
              name: namet,
              surname: surname,
              email: email,
              age: age,
              password: crypto.createHash('md5').update(password).digest("hex"),
            }
            needle.post(this.$store.state.serverIp+'/api/registration', data, {"json": true}, function(err, res, body){
              if(body == "Reg succsesful"){
                Vue.swal({
                    icon: 'success',
                    title: 'Вы успешно зарегистрированы!',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    document.location.href = "/login"
                });
                //document.location.href = "/login"
              }
              else if(body == "Reg Fail"){
                //alert('Пользователь с таким email существует')
                Vue.swal({
                    icon: 'error',
                    text: 'Пользователь с таким email существует'
                });
              }
              else{
                //alert("Регистрация не удалась. Возможно, у Вас проблема с интернетом, или на нашем сервере ведутся технические работы")
                Vue.swal({
                    icon: 'error',
                    text: 'Регистрация не удалась. Возможно, у Вас проблема с интернетом, или на нашем сервере ведутся технические работы'
                });
              }
            })
          }
          else{
            //alert('Проверьте Вашу почту, на нее был выслан код подтверждения')
            Vue.swal({
                    icon: 'info',
                    text: 'Проверьте Вашу почту, на нее был выслан код подтверждения'
                });
          }
        }
      },
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
</style>