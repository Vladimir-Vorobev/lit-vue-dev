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
                <div class="formbox">
                    <h2>Панель администратора</h2>
                </div>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="pills-list-student-tab" data-toggle="pill" href="#pills-list-student" role="tab" aria-controls="pills-list-student" aria-selected="true">Список класса</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="pills-update-list-tab" data-toggle="pill" href="#pills-update-list" role="tab" aria-controls="pills-update-list" aria-selected="false">Обновить список</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <hr>
                    <div class="tab-pane fade show active" id="pills-list-student" role="tabpanel" aria-labelledby="pills-list-student-tab">
                        <router-link class="name" :to="'/teachers-timetable/' + item.student" v-for="item in students" :key="item.student">
                            <div class="name_group">{{ item.student }} </div>
                        </router-link>
                    </div>
                    <div class="tab-pane fade" id="pills-update-list" role="tabpanel" aria-labelledby="pills-update-list-tab">
                        Загрузите актуальный список Вашего класса в excel файле
                        <input type="file" ref="file" class="form-control-file" @change="file()">
                        <button type="submit" @click="add()" class="btn btn-primary btn-lg">Обновить</button>
                    </div>
                </div>
                <!--
                <div class="panel">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-3"><button class="btn btn-outline-primary" @click="update('classList')">Список класса</button></div>
                        <div class="col-12 col-md-3"><button class="btn btn-outline-primary" @click="update('updateList')">Обновить список</button></div>
                    </div>
                </div>
                <transition name="show">
                    <div style="margin-top: 1em" v-if="this.viewoption == 'classList'" class="list">
                        <router-link class="name" :to="'/teachers-timetable/' + item.student" v-for="item in students" :key="item.student">
                            <div class="name_group">{{ item.student }} </div>
                        </router-link> 
                    </div>
                    <div style="margin-top: 1em" v-if="this.viewoption == 'updateList'">
                        <input type="file" ref="file" class="form-control-file" @change="file()">
                    </div>
                </transition> --> 
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
            viewoption: 'classList',
            students: [],
            email: this.$store.getters.email,
            classData: [],
        }
    },
    beforeMount(){
        let students = []
        let email = this.email
        needle.post('http://78.155.219.12:3000/api/getAdminList', {email: email}, {"json": true}, function(err, res){
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
            let show = true
            needle.post('http://78.155.219.12:3000/api/adminLogin', data, {"json": true}, function(err, res){
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
            if(show) this.show = false
        },
        file(){
            let data = []
            readXlsxFile(this.$refs.file.files[0]).then((rows) => {
                for(let i = 0; i < rows.length; i++){
                    data.push({email: rows[i][0], name: rows[i][1], surname: rows[i][2]})
                }
            })
            this.classData = data
        },
        update(value){
            this.viewoption = value
        },
        add(){
            event.preventDefault()
            if(this.classData.length != 0){
                needle.post('http://78.155.219.12:3000/api/uploadTable', {data: this.classData, email: this.email}, {"json": true}, function(err, res){
                    if(err) throw err
                    if(res.body == 'OK'){
                        alert('Файл успешно добавлен')
                    }
                    else{
                        alert(res.body)
                    }
                })
            }
            else alert('Файл не выбран')
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

.show-enter-active, .auth-leave-active {
  transition: opacity .5s;
}
.show-enter, .auth-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>