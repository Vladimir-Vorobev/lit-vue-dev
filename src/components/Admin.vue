<template>
    <div class='main'>
        <transition name="auth">
            <div v-if="show">
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
                        <button class="btn btn-primary btn-lg" @click="loginUser()">Админестрировать</button>
                    </div>
                </form>
                <p><router-link to="/registration" class="link">Еще нет аккаунта? Зарегистрируйтесь</router-link></p>
            </div>
            <div v-if="!show">
                <form class="formbox">
                    <h2>Админ-панель</h2>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'Admin',
    data(){
        return{
            show: true
        }
    },
    methods:{
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
            needle.post('https://makual.ru/api/login', data, {"json": true}, function(err, res, body){
                if(err) console.log(err)
                if(res.body != 'Incorect password' && res.body != 'Correct password'){
                alert('Пользователь не найден')
                }
                else if(body != 'Incorect password'){
                this.show = false
                }
                else{
                alert("Неверный email или пароль")
                }
            })
        },
    },
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
    min-height: 1018px;
    margin-bottom: 0px;
}

.auth-enter-active, .auth-leave-active {
  transition: opacity .5s;
}
.auth-enter, .auth-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>