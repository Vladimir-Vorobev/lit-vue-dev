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
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-if="role == 'teacher'">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" @click="showList()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="true">Список класса</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" @click="showAdd()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="false">Обновить список</a>
                    </li>
                </ul>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-if="role == 'school-admin'">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" @click="showList()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="true">Список учителей</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" @click="showAdd()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="false">Обновить список</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <hr>
                    <div v-if="role == 'teacher'">
                        <div v-if="ShowList">
                            <transition-group name="main">
                                <div class="tab-pane fade show active" id="pills-list-student" v-for="item in students" :key="item.student">
                                    <a class="name" href="#" @click="showInfo(item.email)">
                                        <div class="name_group">{{ item.student }} </div>
                                    </a>
                                    <div :class="item.email" style="display: none;">
                                        <i class='fa fa-spinner fa-pulse fa-3x' :id='item.email' style="display: block;"></i>
                                        <div :id='item.email + "v"' style="display: none;"></div>       
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                        <div v-if="ShowAdd">
                            <transition-group name="main">
                                <p key="p">Загрузите актуальный список Вашего класса в excel файле</p>
                                <input type="file" ref="file" class="form-control-file" @change="file()" key="input">
                                <button type="submit" @click="add()" class="btn btn-primary btn-lg" key="button">Обновить</button>
                            </transition-group>
                        </div>
                    </div>

                    
                    <div v-if="role == 'school-admin'">
                        <div v-if="ShowList">
                            <transition-group name="main">
                                <div class="tab-pane fade show active" id="pills-list-student" v-for="item in teachers" :key="item.teacher">
                                    <a class="name" href="#" @click="showTeacherInfo(item.email)">
                                        <div class="name_group">{{ item.teacher }} </div>
                                    </a>
                                    <div :class="item.email" style="display: none;">
                                        <i class='fa fa-spinner fa-pulse fa-3x' :id='item.email' style="display: block;"></i>
                                        <div :id='item.email + "v"' style="display: none;"></div>       
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                        <div v-if="ShowAdd">
                            <transition-group name="main">
                                <p key="p">Загрузите актуальный список Ваших учителей в excel файле</p>
                                <input type="file" ref="file" class="form-control-file" @change="file()" key="input">
                                <button type="submit" @click="add()" class="btn btn-primary btn-lg" key="button">Обновить</button>
                            </transition-group>
                        </div>
                    </div> 
                </div>
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
            role: '',
            students: [],
            teachers: [],
            email: this.$store.getters.email,
            classData: [],
            ShowList: true,
            ShowAdd: false,
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
        this.students = [{student: 'Иванова Мария', email: 'v11ru'}, {student: 'Иванов Иван', email: 'v12ru'}, {student: 'Сергеев Сергей', email: 'v13ru'}]
        this.teachers = [{teacher: 'Иванова Мария', email: 'v11ru'}, {teacher: 'Иванов Иван', email: 'v12ru'}, {teacher: 'Сергеев Сергей', email: 'v13ru'}]
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
            async function get(){
                await needle.post('http://78.155.219.12:3000/api/adminLogin', data, {"json": true}, function(err, res){
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
            }
            get()
            if(show) this.show = false
            this.role = 'school-admin'
        },
        showInfo(email){
            for(let i = 0; i < this.students.length; i++){
                if(document.querySelector('.' + this.students[i].email).style.display == 'block' && this.students[i].email != email){
                    document.querySelector('.' + this.students[i].email).style.display = 'none'
                }
            }
            if(document.querySelector('.' + email).style.display == 'block'){
                document.querySelector('.' + email).style.display = 'none'
            }
            else{
                document.querySelector('.' + email).style.display = 'block'
                if(document.getElementById(email).style.display == 'block'){
                    // запрос
                    setTimeout(function(){
                        document.getElementById(email).style.display = 'none'
                        document.getElementById(email + 'v').innerHTML = 'Статистика'
                        document.getElementById(email + 'v').style.display = 'block'
                    }, 1500);
                } 
            }
        },
        showTeacherInfo(email){
            for(let i = 0; i < this.students.length; i++){
                if(document.querySelector('.' + this.students[i].email).style.display == 'block' && this.students[i].email != email){
                    document.querySelector('.' + this.students[i].email).style.display = 'none'
                }
            }
            if(document.querySelector('.' + email).style.display == 'block'){
                document.querySelector('.' + email).style.display = 'none'
            }
            else{
                document.querySelector('.' + email).style.display = 'block'
                if(document.getElementById(email).style.display == 'block'){
                    // запрос
                    setTimeout(function(){
                        document.getElementById(email).style.display = 'none'
                        let students = ['Ваня', 'Петя', 'Даша']
                        for(let i = 0; i < 3; i++){
                            document.getElementById(email + 'v').innerHTML += students[i] + '<br>'
                        }
                        document.getElementById(email + 'v').style.display = 'block'
                    }, 1500);
                } 
            }
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
        showList(){
            event.preventDefault()
            this.ShowList = true
            this.ShowAdd = false
        },
        showAdd(){
            event.preventDefault()
            this.ShowAdd = true
            this.ShowList = false
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
.nav-pills{
    cursor: pointer;
}
.main-enter-active{
  transition: opacity .5s;
}
.main-leave-active{
    transition: opacity;
}
.main-enter, .main-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.show-enter-active, .auth-leave-active {
  transition: opacity .5s;
}
.show-enter, .auth-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>