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
            needle.post('https://makual.ru/api/mailCheck', {email: email}, {"json": true}, function(err, res){
              if (err) throw err
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
            needle.post('https://makual.ru/api/registration', data, {"json": true}, function(err, res, body){
              if(body == "Reg succsesful"){
                document.location.href = "/login"
              }
              else if(body == "Reg Fail"){
                alert('Пользователь с таким email существует')
              }
              else{
                alert("Регистрация не удалась. Возможно, у Вас проблема с интернетом, или на нашем сервере ведутся технические работы")
              }
            })
          }
          else{
            alert('Проверьте Вашу почту, на нее был выслан код подтверждения')
          }
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
    background-color: #fff;
    height: 100%;
    padding: 30px;
    min-height: 100vh;
    margin-bottom: 0px;
}
</style>