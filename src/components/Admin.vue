<template>
    <div class='main'>
        <div class="container warp">
            <transition-group name="auth">
                <div v-if="show" key="div">
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
                <div v-if="!show" key="div">
                    <ul key="ul" class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-if="role == 'teacher'">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" @click="showList()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="true">Список класса</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" @click="showTop()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="false">Рейтинг класса</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" @click="showAdd()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="false">Обновить список</a>
                        </li>
                    </ul>
                    <ul key="ul" class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-if="role == 'school-admin'">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" @click="showList()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="true">Список учителей</a>
                        </li><li class="nav-item" role="presentation">
                            <a class="nav-link" @click="showTop()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="false">Рейтинг школы</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" @click="showAdd()" id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="false">Обновить список</a>
                        </li>
                    </ul>
                    <div key="div" class="tab-content" id="pills-tabContent">
                        <hr>
                        <div v-if="role == 'teacher'">
                            <div v-if="ShowList">
                                <transition-group name="main">
                                    <div class="tab-pane fade show active" id="pills-list-student" v-for="item in students" :key="item.person">
                                        <a class="person" href="#" @click="showInfo(item.email)">
                                            <div class="person_box">
                                                <div class="name row">
                                                    <div class="name_group col-10">{{ item.person }} </div>
                                                    <div class="col-1 ar-collapse" :id='item.email'></div>
                                                    <div class="col-1" ><button class="btn btn-danger" @click="deleteStudent(item.email, item.name, item.surname)"><i class="fas fa-trash-alt"></i></button></div>
                                                </div>
                                                <div :id="item.email + 'n'" style="display: none;">
                                                    <div style="text-align: center;"><i class='fa fa-spinner fa-pulse fa-3x' :id='item.email + "x"' style="display: inline-block;"></i></div>
                                                    <form :id="'form' + item.email">
                                                        <input class="radio" :name="'donaught' + item.email" type="radio" value="donaught" checked @click="changeInfo(item.email, 'donaught')"> Кругова диаграмма
                                                        <input class="radio" :name="'bar' + item.email" type="radio" value="bar" @click="changeInfo(item.email, 'bar')"> Столбчатая диаграмма
                                                        <input class="radio" :name="'full' + item.email" type="radio" value="full" @click="changeInfo(item.email)"> Полная статистика
                                                    </form>
                                                    <div class="chart-container" :id="'chartDiv' + item.email" style="display: none;"><canvas :id="'chart' + item.email"></canvas></div>
                                                    <div class="chart-container" :id="'chartDiv2' + item.email" style="display: none;"><canvas :id="'chart2' + item.email"></canvas></div>
                                                    <div :id="'chartDiv3' + item.email" style="display: none;">
                                                        <div v-if="data[item.email] != undefined && studentEvents[data.lastIndexOf(item.email)][0].length == 0"><h3>Нет мероприятий</h3></div>
                                                        <div class="card" v-for="item3 in studentEvents[data.lastIndexOf(item.email)][0]" :key="item3.value">
                                                            <div class="card-header">{{item3.date}}</div>
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <h5 class="card-title col-11">{{item3.name}}</h5>
                                                                    <h5><button class="btn btn-danger" @click="deleteStudent(item.email, item.name, item.surname)"> <i class="fas fa-trash-alt"></i> </button></h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </transition-group>
                            </div>
                            <div v-if="ShowTop">
                                <transition-group name="main">
                                    <p key="p">Рейтинг тут</p>
                                </transition-group>
                            </div>
                            <div v-if="ShowAdd">
                                <transition-group name="main">
                                    <form key='form' id='formList' style="text-align: left; font-size: 1.2em">
                                        <!-- <input key="input" class="radio" name='list' type="radio" checked @click="changeAddInfo('list')"> <p key="p">Добавить список учеников</p> -->
                                        <!-- <input key="input" class="radio" name='one' type="radio" @click="changeAddInfo('one')"> <p key="p">Добавить ученика</p> -->
                                        <div class="form-check row">
                                            <div class="col-12">
                                                <input key="input" name='list' class="form-check-input radio" type="radio" @click="changeAddInfo('list')" id="exampleRadios1" value="option1" checked>
                                                <label key="p" class="form-check-label" for="exampleRadios1">
                                                    Добавить список учеников
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-check row">
                                            <div class="col-12">
                                                <input  key="input" name='one' class="form-check-input radio" @click="changeAddInfo('one')" type="radio" id="exampleRadios2" value="option2">
                                                <label key="p" class="form-check-label" for="exampleRadios2">
                                                    Добавить ученика
                                                </label>
                                            </div>
                                        </div>
                                    </form> <br key='br'>
                                    <div key="div" v-if="ShowAddList" style="text-align: left">
                                        <p key="p" style="font-size:1.3em; text-align: center"> Загрузите актуальный список Вашего класса в excel файле </p>
                                        <p><input type="file" ref="file" class="form-control-file" @change="file()" key="input"></p>
                                        <p><button type="submit" @click="add()" class="btn btn-primary btn-lg" key="button">Обновить список</button></p>
                                    </div>
                                    <form key="form" id='formOne' v-if="ShowAddOne" style="text-align: left">
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1">Имя</span>
                                                    </div>
                                                    <input type="text" key="input" name="name" class="form-control name" aria-describedby="basic-addon1">
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon2">Фамилия</span>
                                                    </div>
                                                    <input type="text" key="input" name="surname" class="form-control surname" aria-describedby="basic-addon2">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon4">email</span>
                                                    </div>
                                                    <input class="form-control email" key="input" name="email" placeholder="example@gmail.com" aria-describedby="basic-addon4">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <p key="p">Email </p><input key="input" name="email">
                                        <p key="p">Имя </p><input key="input" name="name">
                                        <p key="p">Фамилия </p><input key="input" name="surname" style="margin-bottom: 0.7em"> -->
                                        <p><button type="submit" @click="add('one')" class="btn btn-primary btn-lg" key="button">Добавить ученика</button></p>
                                    </form>
                                </transition-group>
                            </div>
                        </div>
                
                        <div v-if="role == 'school-admin'">
                            <div v-if="ShowList">
                                <transition-group name="main">
                                    <div class="tab-pane fade show active" id="pills-list-student" v-for="item in teachers" :key="item.person">
                                        <a class="person" href="#">
                                            <div class="person_box" v-on:click="showTeacherInfo(item.email)">
                                                <div class="name row">
                                                    <div class="name_group col-11">{{ item.person }}</div>
                                                    <div class="col-1 ar-collapse" :id='item.email'></div>
                                                </div>
                                                <div :id='item.email + "s"' style="display: none;">
                                                    <div class="tab-pane fade show active" id="pills-list-student" v-for="item2 in students" :key="item2.person">
                                                        <a class="person" href="#" @click="showInfo(item2.email)">
                                                            <div class="person_box a">
                                                                <div class="name row">
                                                                    <div class="name_group col-10 a">{{ item2.person }} </div>
                                                                    <div class="col-1 ar-collapse a" :id='item2.email'></div>
                                                                </div>
                                                                <div :id="item2.email + 'n'" style="display: none;">
                                                                    <div style="text-align: center;"><i class='fa fa-spinner fa-pulse fa-3x' :id='item2.email + "x"' style="display: inline-block;"></i></div>
                                                                    <form :id="'form' + item.email">
                                                                        <input class="radio" :name="'donaught' + item2.email" type="radio" value="donaught" checked @click="changeInfo(item2.email, 'donaught')"> Кругова диаграмма
                                                                        <input class="radio" :name="'bar' + item2.email" type="radio" value="bar" @click="changeInfo(item2.email, 'bar')"> Столбчатая диаграмма
                                                                        <input class="radio" :name="'full' + item2.email" type="radio" value="full" @click="changeInfo(item2.email)"> Полная статистика
                                                                    </form>
                                                                    <div class="chart-container" :id="'chartDiv' + item2.email" style="display: none;"><canvas :id="'chart' + item2.email"></canvas></div>
                                                                    <div class="chart-container" :id="'chartDiv2' + item2.email" style="display: none;"><canvas :id="'chart2' + item2.email"></canvas></div>
                                                                    <div :id="'chartDiv3' + item.email" style="display: none;">
                                                                        <div v-if="data[item2.email] != undefined && studentEvents[data.lastIndexOf(item2.email)][0].length == 0"><h3>Нет мероприятий</h3></div>
                                                                        <div class="card" v-for="item3 in studentEvents[data.lastIndexOf(item2.email)][0]" :key="item3.value">
                                                                            <div class="card-header">{{item3.date}}</div>
                                                                            <div class="card-body">
                                                                                <div class="row">
                                                                                    <h5 class="card-title col-11">{{item3.name}}</h5>
                                                                                    <h5><button class="btn btn-danger" @click="deleteStudent(item.email, item.name, item.surname)"> <i class="fas fa-trash-alt"></i> </button></h5>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <!-- <div v-for="item2 in students2" :key="item2.student" :class="item2.email">
                                                        <a class="person" href="#" @click="showInfo(item2.email)">
                                                            <div class="person_box a">
                                                                <div class="name row">
                                                                    <div class="name_group col-11 a">{{ item2.student }} </div>
                                                                    <div class="col-1 ar-collapse a" :id='item2.email'></div>
                                                                </div>
                                                                <div :id="item2.email + 'n'" style="display: none;">
                                                                    <i class='fa fa-spinner fa-pulse fa-3x' :id='item2.email + "x"' style="display: inline-block;"></i>
                                                                    <div class="chart-container"><canvas :id="'chart' + item2.email" style="display: none;"></canvas></div>      
                                                                </div>
                                                            </div>
                                                        </a>    
                                                    </div> -->
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </transition-group>
                            </div>
                            <div v-if="ShowTop">
                                <transition-group name="main">
                                    <p key="p">Рейтинг тут</p>
                                </transition-group>
                            </div>
                            <div v-if="ShowAdd">
                               <transition-group name="main">
                                    <form key='form' id='formList' style="text-align: left; font-size: 1.2em">
                                        <!-- <input key="input" class="radio" name='list' type="radio" checked @click="changeAddInfo('list')"> <p key="p">Добавить список учеников</p> -->
                                        <!-- <input key="input" class="radio" name='one' type="radio" @click="changeAddInfo('one')"> <p key="p">Добавить ученика</p> -->
                                        <div class="form-check row">
                                            <div class="col-12">
                                                <input key="input" name='list' class="form-check-input radio" type="radio" @click="changeAddInfo('list')" id="exampleRadios1" value="option1" checked>
                                                <label key="p" class="form-check-label" for="exampleRadios1">
                                                    Добавить список учителей
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-check row">
                                            <div class="col-12">
                                                <input  key="input" name='one' class="form-check-input radio" @click="changeAddInfo('one')" type="radio" id="exampleRadios2" value="option2">
                                                <label key="p" class="form-check-label" for="exampleRadios2">
                                                    Добавить учителя
                                                </label>
                                            </div>
                                        </div>
                                    </form> <br key='br'>
                                    <div key="div" v-if="ShowAddList" style="text-align: left">
                                        <p key="p" style="font-size:1.3em; text-align: center"> Загрузите актуальный список Ваших учителей в excel файле </p>
                                        <p><input type="file" ref="file" class="form-control-file" @change="file()" key="input"></p>
                                        <p><button type="submit" @click="add()" class="btn btn-primary btn-lg" key="button">Обновить список</button></p>
                                    </div>
                                    <form key="form" id='formOne' v-if="ShowAddOne" style="text-align: left">
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1">Имя</span>
                                                    </div>
                                                    <input type="text" key="input" name="name" class="form-control name" aria-describedby="basic-addon1">
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon2">Фамилия</span>
                                                    </div>
                                                    <input type="text" key="input" name="surname" class="form-control surname" aria-describedby="basic-addon2">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon4">email</span>
                                                    </div>
                                                    <input class="form-control email" key="input" name="email" placeholder="example@gmail.com" aria-describedby="basic-addon4">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <p key="p">Email </p><input key="input" name="email">
                                        <p key="p">Имя </p><input key="input" name="name">
                                        <p key="p">Фамилия </p><input key="input" name="surname" style="margin-bottom: 0.7em"> -->
                                        <p><button type="submit" @click="add('one')" class="btn btn-primary btn-lg" key="button">Добавить учителя</button></p>
                                    </form>
                                </transition-group>
                            </div>
                        </div> 
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import needle from 'needle'
import readXlsxFile from 'read-excel-file'
import Chart from 'chart.js'
import Footer from './footer.vue'
import Vue from 'vue'
export default {
    name: 'Admin',
    components: { Footer },
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
            ShowTop: false,
            ShowAdd: false,
            ShowAddList: true,
            ShowAddOne: false,
            data: [],
            studentEvents: [],
        }
    },
    methods:{
        loginUser(){
            event.preventDefault()
            let form = document.forms[0]
            let email = form.elements.email.value
            let password = form.elements.password.value
            let crypto = require('crypto')
            fetch('http://78.155.219.12:3000/api/adminLogin', {
                method: 'POST',
                headers: {email: email, password: crypto.createHash('md5').update(password).digest("hex")},
            })
            .then(response => {
                console.log("res", response)
                return response.json()
            })
            .then(data => {
                if(data == 'Incorect password'){
                    //alert('Пользователь не найден')
                    this.$swal({
                        icon: 'error',
                        text: 'Пользователь не найден'
                    });
                }
                else if(data == "teacher" || data == 'school-admin'){
                    this.show = false
                    this.role = data
                }
                else{
                    //alert("Неверный email или пароль")
                    this.$swal({
                        icon: 'error',
                        text: 'Неверный email или пароль или у Вас нет доступа к административной панели'
                    });
                }
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            this.getAdminList()
            // this.students = [{person: 'Иванова Мария', email: 'v11ru'}, {person: 'Иванов Иван', email: 'v12ru'}, {person: 'Сергеев Сергей', email: 'v13ru'}]
            // this.teachers = [{person: 'Иванова Мария', email: 'v14ru'}, {person: 'Иванов Иван', email: 'v15ru'}, {person: 'Сергеев Сергей', email: 'v16ru'}]
        },
        getAdminList(){
            let people = []
            fetch('http://78.155.219.12:3000/api/getAdminList', {
                method: 'POST',
                headers: {email: this.email},
            })
            .then(response => {
                console.log("res", response)
                return response.json()
            })
            .then(data => {
                console.log(data)
                if(this.role == 'teacher'){
                    for(let i = 0; i < data.length; i++){
                        people.push({person: data[i].name + ' ' + data[i].surname, email: data[i].email})
                        this.data.push(data[i].email)
                        this.studentEvents.push([])
                    }
                    this.students = people
                }
                else if(this.role == 'school-admin'){
                    for(let i = 0; i < data.length; i++){
                        people.push({person: data[i].name + ' ' + data[i].surname, email: data[i].email})
                        this.data.push(data[i].email)
                        //this.studentEvents.push([])
                    }
                    this.teachers = people
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        showInfo(email){
            if(this.role == 'teacher'){
                console.log(event.target.className)
                if(event.target.className != 'chartjs-render-monitor' && event.target.className != 'radio'){
                    for(let i = 0; i < this.students.length; i++){
                        if(document.getElementById(this.students[i].email + 'n').style.display == 'block' && this.students[i].email != email){
                            document.getElementById(this.students[i].email + 'n').style.display = 'none'
                            document.getElementById(this.students[i].email).classList.remove('ar-show');
                        }
                    }
                    if(document.getElementById(email + 'n').style.display == 'block'){
                        document.getElementById(email + 'n').style.display = 'none'
                        document.getElementById(email).classList.remove('ar-show');
                    }
                    else{
                        document.getElementById(email + 'n').style.display = 'block'
                        document.getElementById(email).classList.add('ar-show');
                        if(document.getElementById(email + "x").style.display == 'inline-block'){
                            let SessionID = this.$store.getters.SessionID
                            let teacherEmail = this.$store.getters.email
                            fetch('http://78.155.219.12:3000/api/getCheckedEvents', {
                                method: 'get',
                                headers: {email: teacherEmail, studEmail: email, sessionid: SessionID},
                            })
                            .then(response => {
                                console.log("res", response)
                                return response.json()
                            })
                            .then(datan => {
                                let statistics = datan.stat
                                console.log(this.data)
                                console.log(this.data.lastIndexOf(email))
                                this.studentEvents[this.data.lastIndexOf(email)].push(datan.checkedEvents)
                                console.log(this.studentEvents)
                                console.log(this.studentEvents[this.data.lastIndexOf(email)][0])
                                let ctx = document.getElementById('chart' + email)
                                let ctx2 = document.getElementById('chart2' + email)
                                let myChart = new Chart(ctx, {
                                    type: 'doughnut',
                                    data: {
                                        labels: ['Сфера услуг', 'IT', 'Творчество и Дизайн', 'Строительство', 'Инжинерные технологии', 'Транспорт и логистика'],
                                        datasets: [{
                                            label: '# of Votes',
                                            data: [statistics.service, statistics.programming, 0, 0,  statistics.engeniring, 0],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(255, 159, 64, 0.5)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)'
                                            ],
                                            borderWidth: 1,
                                            hoverBorderWidth: 5,
                                        }]
                                    },
                                    options: {
                                        legend: {
                                            position: 'bottom',
                                        }
                                    }
                                });
                                let myChart2 = new Chart(ctx2, {
                                    type: 'bar',
                                    data: {
                                        labels: ['Сфера услуг', 'IT', 'Творчество и Дизайн', 'Строительство', 'Инжинерные технологии', 'Транспорт и логистика'],
                                        datasets: [{
                                            label: '# of Votes',
                                            data: [statistics.service, statistics.programming, 0, 0,  statistics.engeniring, 0],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(255, 159, 64, 0.5)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)'
                                            ],
                                            borderWidth: 1,
                                            hoverBorderWidth: 5,
                                        }]
                                    },
                                    options: {
                                        legend: {
                                            position: 'bottom',
                                        }
                                    }
                                });
                                console.log(myChart, myChart2)
                                document.getElementById(email + "x").style.display = 'none'
                                document.getElementById('chartDiv' + email).style.display = 'block'
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        } 
                    }
                }
            }
            else if(this.role == 'school-admin'){
                for(let i = 0; i < this.students2.length; i++){
                    if(document.getElementById('.' + this.students2[i].email + 'n').style.display == 'block' && this.students2[i].email != email){
                        document.getElementById('.' + this.students2[i].email + 'n').style.display = 'none'
                        document.getElementById(this.students2[i].email).classList.remove('ar-show');
                    }
                }
                if(document.getElementById('.' + email + 'n').style.display == 'block'){
                    document.getElementById('.' + email + 'n').style.display = 'none'
                    document.getElementById(email).classList.remove('ar-show');
                }
                else{
                    document.getElementById('.' + email + 'n').style.display = 'block'
                    document.getElementById(email).classList.add('ar-show');
                    if(document.getElementById(email + "x").style.display == 'inline-block'){
                        // запрос
                        setTimeout(function(){
                            var ctx = document.getElementById('chart' + email)
                            let myChart = new Chart(ctx, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Сфера услуг', 'IT', 'Творчество и Дизайн', 'Строительство', 'Инжинерные технологии', 'Транспорт и логистика'],
                                    datasets: [{
                                        label: '# of Votes',
                                        data: [3, 7, 2, 1, 3, 1],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.5)',
                                            'rgba(54, 162, 235, 0.5)',
                                            'rgba(255, 206, 86, 0.5)',
                                            'rgba(75, 192, 192, 0.5)',
                                            'rgba(153, 102, 255, 0.5)',
                                            'rgba(255, 159, 64, 0.5)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1,
                                        howerBorderWidrh: 5,
                                    }]
                                },
                                options: {
                                    legend: {
                                        position: 'bottom',
                                    }
                                }
                            });
                            console.log(myChart)
                            document.getElementById(email + "x").style.display = 'none'
                            document.getElementById('chart' + email).style.display = 'block'
                            document.getElementById(email + "x").style.display = 'none'
                            document.getElementById('chart' + email).style.display = 'block'
                        }, 1500);
                    }
                } 
            }
        },
        showTeacherInfo(email){
            if(event.target.className == 'person_box' || event.target.className == 'name row' || event.target.className == 'name_group col-11'|| event.target.className == 'col-1 ar-collapse' || event.target.className == 'col-1 ar-collapse ar-show'){
                for(let i = 0; i < this.teachers.length; i++){
                    if(document.getElementById(this.teachers[i].email + 's').style.display == 'block' && this.teachers[i].email != email){
                        document.getElementById(this.teachers[i].email + 's').style.display = 'none'
                        document.getElementById(this.teachers[i].email).classList.remove('ar-show');
                    }
                }
                if(document.getElementById(email + 's').style.display == 'block'){
                    document.getElementById(email + 's').style.display = 'none'
                    document.getElementById(email).classList.remove('ar-show');
                }
                else{
                    document.getElementById(email).classList.add('ar-show');
                    if(document.getElementById(email + 's').style.display == 'none'){
                        // запрос
                            this.students = []
                            //document.getElementById(email).style.display = 'none'
                            let students = [{student: 'Петя', email: 'v11ru'}, {student: 'Вася', email: 'v12ru'}, {student: 'Дима', email: 'v13ru'}]
                            for(let i = 0; i < 3; i++){
                                this.students.push(students[i])
                            }
                            document.getElementById(email + 's').style.display = 'block'
                    } 
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
        add(value){
            event.preventDefault()
            if(value == 'one'){
                let form = document.getElementById('formOne')
                if(form['email'].value == ''){
                    this.$swal({
                        icon: 'error',
                        text: 'Введите email'
                    });
                }
                else if(form['name'].value == ''){
                    this.$swal({
                        icon: 'error',
                        text: 'Введите имя'
                    });
                }
                else if(form['surname'].value == ''){
                    this.$swal({
                        icon: 'error',
                        text: 'Введите фамилию'
                    });
                }
                else{
                    send([{email: form['email'].value, name: form['name'].value, surname: form['surname'].value}], this.email, 'uploadOne')
                }
            }
            else{
                if(this.classData.length != 0){
                    send(this.classData, this.email, 'uploadTable')
                }
                else this.$swal('Файл не выбран');   //alert('Файл не выбран')
            }
            function send(data, email, url){
                needle.post('http://78.155.219.12:3000/api/' + url, {data: data, email: email, type: 'update'}, {"json": true}, function(err, res){
                    if(err) throw err
                    if(res.body == 'OK'){
                        //alert('Файл успешно добавлен')
                        Vue.swal({
                            icon: 'success',
                            text: 'Файл успешно добавлен'
                        });
                    }
                    else{
                        //alert(res.body)
                        Vue.swal(res.body);
                    }
                })
            }
        },
        showList(){
            event.preventDefault()
            this.ShowList = true
            this.ShowAdd = false
            this.ShowTop = false
        },
        showTop(){
            event.preventDefault()
            this.ShowTop = true
            this.ShowList = false
            this.ShowAdd = false
        },
        showAdd(){
            event.preventDefault()
            this.ShowAdd = true
            this.ShowList = false
            this.ShowTop = false
        },
        changeInfo(email, chart){
            let form = document.getElementById('form' + email)
            if(chart == 'donaught'){
                form['bar' + email].checked = false
                form['full' + email].checked = false
                document.getElementById('chartDiv' + email).style.display = 'block'
                document.getElementById('chartDiv2' + email).style.display = 'none'
                document.getElementById('chartDiv3' + email).style.display = 'none'
            }
            else if(chart == 'bar'){
                form['donaught' + email].checked = false
                form['full' + email].checked = false
                document.getElementById('chartDiv' + email).style.display = 'none'
                document.getElementById('chartDiv2' + email).style.display = 'block'
                document.getElementById('chartDiv3' + email).style.display = 'none'
            }
            else{
                form['donaught' + email].checked = false
                form['bar' + email].checked = false
                document.getElementById('chartDiv' + email).style.display = 'none'
                document.getElementById('chartDiv2' + email).style.display = 'none'
                document.getElementById('chartDiv3' + email).style.display = 'block'
            }
        },
        changeAddInfo(value){
            let form = document.getElementById('formList')
            if(value == 'list'){
                form['one'].checked = false
                this.ShowAddList = true
                this.ShowAddOne = false
            }
            else{
                form['list'].checked = false
                this.ShowAddList = false
                this.ShowAddOne = true
            }
        },
        deleteStudent(email, name, surname){
            event.preventDefault()
            let data = {
                email: email,
                name: name,
                surname: surname,
            }
            this.$swal({
                icon: 'warning',
                title: 'Вы уверены что хотите удалить?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Да',
                cancelButtonText: 'Отмена'
            }).then((result) => {
                 if (result.value) {
                     needle.post('http://78.155.219.12:3000/api/uploadOne', {data: data, email: email, type: 'delete'}, {"json": true}, function(err, res){
                        if(err) throw err
                        if(res.body == 'OK'){
                            //alert('Файл успешно добавлен')
                            Vue.swal({
                                icon: 'success',
                                text: 'Ученик успешно удален'
                            });
                            window.location.reload
                        }
                        else{
                            //alert(res.body)
                            Vue.swal(res.body);
                        }
                    })
                }
            }).then((result) => {
                 if (result.value) {
                     this.getAdminList()
                 }
            })
        },
    },
}
</script>

<style scoped>
.warp{
    flex: 1 0 auto;
    padding-top: 110px !important;
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
    background-color: rgba(228, 228, 228, 0.466);
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
.chart-container {
  position: relative;
  height: 500px;
  width: 1000px;
}
</style>