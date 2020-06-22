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
    beforeMount(){
      if(this.$store.getters.email != '' && this.$store.getters.SessionID != ''){
        this.$router.push("/profile")
      }
    },
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
        needle.post('http://78.155.219.12:3000/api/login', data, {"json": true}, function(err, res){
            if(err) console.log(err)
            if(res.body == 'Incorect password'){
              alert('Пользователь не найден')
            }
            else if(res.body.length == 128){
              document.cookie = "email=" + email + "; expires=" + new Date(Date.now() + 864000e3).toUTCString()
              document.cookie = "SessionID=" + res.body + "; expires=" + new Date(Date.now() + 864000e3).toUTCString()
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