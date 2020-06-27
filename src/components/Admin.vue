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
                    <li class="nav-item" role="presentation" v-if="role == 'teacher'">
                        <a class="nav-link active" id="pills-list-student-tab" data-toggle="pill" href="#pills-list-student" role="tab" aria-controls="pills-list-student" aria-selected="true">Список класса</a>
                    </li>
                    <li class="nav-item" role="presentation" v-if="role == 'school-admin'">
                        <a class="nav-link active" id="pills-list-teacher-tab" data-toggle="pill" href="#pills-list-teacher" role="tab" aria-controls="pills-list-teacher" aria-selected="true">Список учителей</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="pills-update-list-tab" data-toggle="pill" href="#pills-update-list" role="tab" aria-controls="pills-update-list" aria-selected="false">Обновить список</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <hr>
                    <div v-if="role == 'teacher'">
                        <div class="tab-pane fade show active" id="pills-list-student" role="tabpanel" aria-labelledby="pills-list-student-tab" v-for="item in students" :key="item.student">
                            <a class="name" href="#" @click="showInfo(item.email)">
                                <div class="name_group">{{ item.student }} </div>
                            </a>
                            <div :class="item.email" style="display: none;">
                                <i class='fa fa-spinner fa-pulse fa-3x' :id='item.email' style="display: block;"></i>
                                <div :id='item.email + "v"' style="display: none;"></div>       
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-update-list" role="tabpanel" aria-labelledby="pills-update-list-tab">
                            Загрузите актуальный список Вашего класса в excel файле
                            <input type="file" ref="file" class="form-control-file" @change="file()">
                            <button type="submit" @click="add()" class="btn btn-primary btn-lg">Обновить</button>
                        </div>
                    </div>

                    <div v-if="role == 'school-admin'">
                        <div class="tab-pane fade show active" id="pills-list-teacher" role="tabpanel" aria-labelledby="pills-list-teacher-tab" v-for="item in students" :key="item.student">
                            <!-- <a class="name" href="#" @click="showInfo(item.email)">
                                <div class="name_group">{{ item.student }} </div>
                            </a>
                            <div :class="item.email" style="display: none;">
                                <i class='fa fa-spinner fa-pulse fa-3x' :id='item.email' style="display: block;"></i>
                                <div :id='item.email + "v"' style="display: none;"></div>       
                            </div> -->
                        </div>
                        <div class="tab-pane fade" id="pills-update-list" role="tabpanel" aria-labelledby="pills-update-list-tab">
                            Загрузите актуальный список Ваших учителей в excel файле
                            <input type="file" ref="file" class="form-control-file" @change="file()">
                            <button type="submit" @click="add()" class="btn btn-primary btn-lg">Обновить</button>
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
        this.students = [{student: 'Иванова Мария', email: 'v11ru'}, {student: 'Иванов Иван', email: 'v12ru'}, {student: 'Сергеев Сергей', email: 'v13ru'}]
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
            this.role = 'teacher'
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