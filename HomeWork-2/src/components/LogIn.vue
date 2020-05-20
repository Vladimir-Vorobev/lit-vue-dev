<template>
    <div class="main container">
        <form class="formbox">
            <h2>Войти</h2>
            <div class="form-group row">
              <label for="exampleInputEmail1">Email адресс</label>
              <input name="email" class="form-control" placeholder="example@gmail.com">
            </div>
            <div class="form-group row">
              <label for="exampleInputPassword1">Пароль</label>
              <input type="password" class="form-control" name="password" placeholder="Пароль">
            </div>
            <div class="form-group row"> 
              <button class="btn btn-primary btn-lg" @click="loginUser()">Войти</button>
            </div>
        </form>
        <p><router-link to="/registration" class="link">Еще нет аккаунта? Зарегистрируйтесь</router-link></p>
    </div>
</template>

<script>
import needle from "needle"

export default {
    name: 'Login',
    methods: {
      loginUser(){
        event.preventDefault()
        let form = document.forms[0]
        let email = form.elements.email.value
        let password = form.elements.password.value
        let crypto = require('crypto')
        let data = {
          email: email,
          password: crypto.createHash('md5').update(password).digest("hex"), 
        }
        needle.post('http://37.228.118.76:3000/api/login', data, {"json": true}, function(err, res, body){
            if(body != 'Incorect password' && !err){
              document.cookie = "SessionID=" + res.body
              console.log(res.body)
              document.cookie = "email=" + email
              let data = document.cookie.split(";")
              let name = ''
              let cookie = []
              let b = 0
              for(let i = 0; i < data.length; i++){
                let value = data[i].toString()
                for(let j = 0; j < value.length; j++){
                  if(data[i][j] == "="){
                    if(name == 'SessionID'){
                      b = 1
                    }
                    else if(name == 'email'){
                      b = 2
                    }
                    name = ''
                  }
                  else if(data[i][j] != " "){
                    name += data[i][j]
                  }
                }
                if(b == 1){
                  cookie.push({'SessionID': name})
                  b = 0
                }
                else if(b == 2){
                  cookie.push({'email': name})
                  b = 0
                }
                name = ''
              }
              fetch('http://37.228.118.76:3000/api/getI')
                .then(response => {
                  return response.json()
                })
                .then(data => {
                  
                  console.log(data)
                })
                .catch(err => {
                  console.log(err)
                })
              document.location.href = "/profile"
            }
            else{
              alert("Неверный email или пароль")
            }
          })
      },
    }
  }


</script>

<style scoped>
.main{
    padding-top: 210px !important;
}
.main{
    background-color: #fff;
    height: 100%;
    padding: 30px;
    min-height: 100vh;
    margin-bottom: 0px;
}
.main p{
  color: #4f4f50;
  text-align: left !important;
  font-size: 0.86em;
  margin-left: -10px;
}
.link{
  color: #4f4f50;
  text-decoration: none;
}
.link:hover{
  color: #EF5B65;
  text-decoration: none;
}
</style>