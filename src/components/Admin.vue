<template>
    <div class='main container'>
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
                        <button class="btn btn-primary btn-lg" @click="loginUser()">Войти в админ панель</button>
                    </div>
                </form>
            </div>
            <div v-if="!show">
                <form class="formbox">
                    <h2>Панель администратора</h2>
                </form>
                <div class="list">
                    <router-link class="name" :to="'/teachers-timetable/' + item.student" v-for="item in students" :key="item.student">
                        <div class="name_group">{{ item.student }} </div>
                    </router-link> 
                </div>
                <input type="file" ref="file" class="form-control-file" @change="file()">
            </div>
        </transition>
    </div>
</template>

<script>
import needle from 'needle'
import readXlsxFile from 'read-excel-file'
export default {
    name: 'Admin',
    data(){
        return{
            show: true,
            students: [],
        }
    },
    beforeMount(){
        let students = []
        let email = this.$store.getters.email
        needle.post('https://makual.ru/api/getAdminList', {email: email}, {"json": true}, function(err, res){
            if(err) console.log(err)
            for(let i = 0; i < res.body.length; i++){
                students.push({student: res.body[i].name + ' ' + res.body[i].surname})
            }
        })
        this.students = students
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
            let show
            needle.post('https://makual.ru/api/adminLogin', data, {"json": true}, function(err, res){
                if(err) console.log(err)
                if(res.body == 'Incorect password'){
                    alert('Пользователь не найден')
                }
                else if(res.body == "OK"){
                    show = false
                }
                else{
                    alert("Неверный email или пароль")
                }
            })
            if(!show) this.show = false
        },
        file(){
            let data = []
            readXlsxFile(this.$refs.file.files[0]).then((rows) => {
                for(let i = 0; i < rows.length; i++){
                    data.push({email: rows[i][0], name: rows[i][1], surname: rows[i][2], class: rows[i][3], simvol: rows[i][4],})
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