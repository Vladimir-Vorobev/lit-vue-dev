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
                                    <a class="person" href="#" @click="showInfo(item.email)">
                                        <div class="person_box">
                                            <div class="name row">
                                                <div class="name_group col-11">{{ item.student }} </div>
                                                <div class="col-1 ar-collapse" :id='item.email'></div>
                                            </div>
                                            <div :class="item.email" style="display: none;">
                                                <div style="text-align: center;"><i class='fa fa-spinner fa-pulse fa-3x' :id='item.email' style="display: inline-block;"></i></div>
                                                <div :id='item.email + "v"' style="display: none;"></div>       
                                            </div>
                                        </div>
                                    </a>
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
                                        <div class="name_group">{{ item.teacher }}</div>
                                    </a>
                                    <div :id='item.email + "s"' style="display: none;">
                                        <div v-for="item2 in students2" :key="item2.student" :class="item2.email">
                                            <a class="name" href="#" @click="showInfo(item2.email)">
                                                <div class="name_group">{{ item2.student }} </div>
                                            </a>
                                            <div :class="item2.email + 'n'" style="display: none;">
                                                <i class='fa fa-spinner fa-pulse fa-3x' :id='item2.email' style="display: inline-block;"></i>
                                                <div :id='item2.email + "v"' style="display: none;"></div>       
                                            </div>      
                                        </div>
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
import $ from 'jquery'
export default {
    name: 'Admin',
    data(){
        return{
            show: true,
            role: '',
            students: [],
            students2: [],
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
        this.teachers = [{teacher: 'Иванова Мария', email: 'v14ru'}, {teacher: 'Иванов Иван', email: 'v15ru'}, {teacher: 'Сергеев Сергей', email: 'v16ru'}]
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
            if(this.role == 'teacher'){
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
                    if(document.getElementById(email).style.display == 'inline-block'){
                        // запрос
                        setTimeout(function(){
                            document.getElementById(email).style.display = 'none'
                            document.getElementById(email + 'v').innerHTML = 'Статистика'
                            document.getElementById(email + 'v').style.display = 'block'
                        }, 1500);
                    } 
                }
            }
            else if(this.role == 'school-admin'){
                for(let i = 0; i < this.students2.length; i++){
                    if(document.querySelector('.' + this.students2[i].email + 'n').style.display == 'block' && this.students2[i].email != email){
                        document.querySelector('.' + this.students2[i].email + 'n').style.display = 'none'
                    }
                }
                if(document.querySelector('.' + email + 'n').style.display == 'block'){
                    document.querySelector('.' + email + 'n').style.display = 'none'
                }
                else{
                    document.querySelector('.' + email + 'n').style.display = 'block'
                    if(document.getElementById(email).style.display == 'inline-block'){
                        // запрос
                        setTimeout(function(){
                            document.getElementById(email).style.display = 'none'
                            document.getElementById(email + 'v').innerHTML = 'Статистика'
                            document.getElementById(email + 'v').style.display = 'block'
                        }, 1500);
                    }
                } 
            }
            //изменение классов чтобы стрелка меняла направление
            $('#'+email).not('.ar-collapse').removeClass('ar-show');
            $('#'+email).toggleClass('ar-show');
        },
        showTeacherInfo(email){
            for(let i = 0; i < this.teachers.length; i++){
                if(document.getElementById(this.teachers[i].email + 's').style.display == 'block' && this.teachers[i].email != email){
                    document.getElementById(this.teachers[i].email + 's').style.display = 'none'
                }
            }
            if(document.getElementById(email + 's').style.display == 'block'){
                document.getElementById(email + 's').style.display = 'none'
            }
            else{
                if(document.getElementById(email + 's').style.display == 'none'){
                    // запрос
                        this.students2 = []
                        //document.getElementById(email).style.display = 'none'
                        let students = [{student: 'Петя', email: 'v11ru'}, {student: 'Вася', email: 'v12ru'}, {student: 'Дима', email: 'v13ru'}]
                        for(let i = 0; i < 3; i++){
                            this.students2.push(students[i])
                        }
                        // for(let i = 0; i < 3; i++){
                        //     document.getElementById(email + 'v').insertAdjacentHTML(
                        //         'beforeEnd',
                        //         '<a class="person" href="#" @click="showInfo(' + students[i].email + ')"><div class="person_box"><div class="name" ><div class="name_group">' + students[i].student + '</div></div><div :class="' + students[i].email + '" style="display: none;"><i class="fa fa-spinner fa-pulse fa-3x" :id="' + students[i].email + '" style="display: inline-block;"></i><div :id="' + students[i].email + "v" + '" style="display: none;""></div></div></div></a>'
                        //     );
                        // }
                        document.getElementById(email + 's').style.display = 'block'
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
        // opclp(email){
        //     // $('#'+email).not('.ar-collapse').removeClass('ar-show');
        //     // $('#'+email).toggleClass('ar-show');
        // },
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

.person{
    text-decoration: none;
    color: black;
}
.person_box:hover{
    text-decoration: none;
    color: black;
    background-color: rgba(221, 221, 221, 0.466);
}
.person_box{
    border: 1px solid black;
    margin-bottom: 0.4em;
    border-radius: 0.5em;
    padding: 1em;
    text-align: left;
    
}
.person_box a{
    text-decoration: none;
}
.name_group{
    font-size: 1.2em;
}

.ar-collapse:after{
    content: "\f078";
    font-family: fontawesome !important;
}
.ar-show:after{
    content: "\f077";
    font-family: fontawesome !important;
}

</style>