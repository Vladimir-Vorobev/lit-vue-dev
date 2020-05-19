<template>
    <div class="main container">
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
              <input type="password" class="form-control" name="password" placeholder="1234567" @input="checkPassword()">
            </div>
            <div class="form-group row">
              <label for="exampleInputPassword1">Повторите пароль</label>
              <input type="password" class="form-control" name="password2" placeholder="1234567">
            </div>
            <div class="row"> 
              <button class="btn btn-primary btn-lg" @click="addUser()">Зарегистрироваться</button>
            </div>
        </form>
    </div>
</template>

<script>
import needle from "needle"
export default {
    name: 'Registration',
    data(){
      return{
        passwordText: ""
      }
    },
    methods: {
      checkPassword(){
        let form = document.forms[0]
        let password = form.elements.password
        let s_letters = "qwertyuiopasdfghjklzxcvbnm"
        let b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"
        let digits = "0123456789"
        let specials = "!@#$%^&*()_-+=|/.,:;[]{}"
        password.oninput = function() {
          let is_s = false
          let is_b = false
          let is_d = false
          let is_sp = false
          let rating = 0
          for (let i = 0; i < password.value.length; i++) {
            if (!is_s && s_letters.indexOf(password.value[i]) != -1) is_s = true;
            else if (!is_b && b_letters.indexOf(password.value[i]) != -1) is_b = true;
            else if (!is_d && digits.indexOf(password.value[i]) != -1) is_d = true;
            else if (!is_sp && specials.indexOf(password.value[i]) != -1) is_sp = true;
          }
          if(is_s) rating++
          if(is_b) rating++
          if(is_d) rating++
          if(is_sp) rating++
          if (password.value.length < 6 && rating < 3) this.passwordText = " простой"
          else if (password.value.length < 6 && rating >= 3) this.passwordText = " средний"
          else if (password.value.length >= 8 && rating >= 2) this.passwordText = " сложный"
          else if (password.value.length >= 9 && rating >= 3) this.passwordText = " средний"
          else if (password.value.length >= 8 && rating >= 3) this.passwordText = " сложный"
          else if (password.value.length >= 6 && rating == 1) this.passwordText = " простой"
          else if (password.value.length >= 6 && rating > 1 && rating < 4) this.passwordText = " средний"
          else if (password.value.length >= 6 && rating == 4) this.passwordText = " сложный"
          console.log(this.passwordText)
        };
      },
      addUser(){
        event.preventDefault()
        let re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        let form = document.forms[0]
        let name = form.elements.name.value
        let surname = form.elements.surname.value
        let email = form.elements.email.value.replace(/\s/g, '')
        let age = form.elements.age.value
        let password = form.elements.password.value
        let password2 = form.elements.password2.value
        if(name.trim() == ''){
          alert("Введите имя")
        }
        else if(surname.trim() == ''){
          alert("Введите фамилию")
        }
        else if(email.trim() == ''){
          alert("Введите email")
        }
        else if(age.trim() == ''){
          alert("введите дату рождения")
        }
        else if(password.trim() == ''){
          alert("Введите пароль")
        }
        else if(password != password2){
          alert("Пароли не совпадают")
        }
        else if(re.test(email) == false){
          alert("Введен некорректный email")
        }
        else if(password.length < 5){
          alert("Пароль слишком короткий")
        }
        else if(password.length > 15){
          alert("Пароль слишком длинный")
        }
        else{
          let crypto = require('crypto')
          let data = {
            name: name,
            surname: surname,
            email: email,
            age: age,
            password: crypto.createHash('md5').update(password).digest("hex"),
          }
          needle.post('http://37.228.118.76:3000/api/registration', data, {"json": true}, function(err, res, body){
            if(body == "Reg succsesful"){
              alert("Регистрация успешна")
            }
            else{
              alert("Регистрация не удалась")
            }
          })
        }
      },
    }
  }


</script>

<style scoped>
.main{
    padding-top: 110px !important;
}
.main{
    background-color: rgb(223, 223, 223);
    height: 100%;
    padding: 30px;
    min-height: 100vh;
    margin-bottom: 0px;
}
</style>