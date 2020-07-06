<template>
  <div class="main">
    <div class="container warp">
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
    <div class="footer"><Footer></Footer></div> 
  </div>
</template>

<script>
import needle from "needle"
import Footer from './footer.vue'
export default {
    name: 'Login',
    components: { Footer },
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
        needle.post(this.$store.state.serverIp+'/api/login', data, {"json": true}, function(err, res){
            if(err){console.log(err)} 
            if(res.body == 'Incorect password'){
              //alert('Неверный email или пароль')
              this.$swal({
                  icon: 'error',
                  text: 'Неверный email или пароль'
              });
            }
            else if(res.body == 'User undefined'){
              //alert('Пользователь не найден')
              this.$swal({
                  icon: 'error',
                  text: 'Пользователь не найден'
              });
            }
            else if(res.body.length == 128){
              document.cookie = "email=" + email + "; expires=" + new Date(Date.now() + 864000e3).toUTCString()
              document.cookie = "SessionID=" + res.body + "; expires=" + new Date(Date.now() + 864000e3).toUTCString()
              document.location.href = "/profile"
            }
          })
      },
    }
  }


</script>

<style scoped>
.warp{
    flex: 1 0 auto;
    padding-top: 210px !important;
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