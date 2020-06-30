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
                                <div class="tab-pane fade show active" id="pills-list-student" v-for="item in students" :key="item.person">
                                    <a class="person" href="#" @click="showInfo(item.email)">
                                        <div class="person_box">
                                            <div class="name row">
                                                <div class="name_group col-11">{{ item.person }} </div>
                                                <div class="col-1 ar-collapse" :id='item.email'></div>
                                            </div>
                                            <div :id="item.email + 'n'" style="display: none;">
                                                <div style="text-align: center;"><i class='fa fa-spinner fa-pulse fa-3x' :id='item.email + "x"' style="display: inline-block;"></i></div>
                                                <div width="50" height="50"><canvas width="50" height="50" :id="'chart' + item.email" style="display: none;"></canvas></div>
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
                                <div class="tab-pane fade show active" id="pills-list-student" v-for="item in teachers" :key="item.person">
                                    <a class="person" href="#">
                                        <div class="person_box" v-on:click="showTeacherInfo(item.email)">
                                            <div class="name row">
                                                <div class="name_group col-11">{{ item.person }}</div>
                                                <div class="col-1 ar-collapse" :id='item.email'></div>
                                            </div>
                                            <div :id='item.email + "s"' style="display: none;">
                                                <div v-for="item2 in students2" :key="item2.student" :class="item2.email">
                                                    <a class="person" href="#" @click="showInfo(item2.email)">
                                                        <div class="person_box a">
                                                            <div class="name row">
                                                                <div class="name_group col-11 a">{{ item2.student }} </div>
                                                                <div class="col-1 ar-collapse a" :id='item2.email'></div>
                                                            </div>
                                                            <div :id="item2.email + 'n'" style="display: none;">
                                                                <i class='fa fa-spinner fa-pulse fa-3x' :id='item2.email + "x"' style="display: inline-block;"></i>
                                                                <div width="50" height="50"><canvas width="50" height="50" :id="'chart' + item2.email" style="display: none;"></canvas></div>      
                                                            </div>
                                                        </div>
                                                    </a>    
                                                </div>
                                            </div>
                                        </div>
                                    </a>

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
import Chart from 'chart.js'
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
                    alert('Пользователь не найден')
                }
                else if(data == "teacher" || data == 'school-admin'){
                    this.show = false
                    this.role = data
                }
                else{
                    alert("Неверный email или пароль")
                }
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            let students = []
            fetch('http://78.155.219.12:3000/api/getAdminList', {
                method: 'POST',
                headers: {email: email},
            })
            .then(response => {
                console.log("res", response)
                return response.json()
            })
            .then(data => {
                for(let i = 0; i < data.length; i++){
                    students.push({person: data[i].name + ' ' + data[i].surname, email: data[i].email})
                }
                if(this.role == 'teacher') this.students = students
                else if(this.role == 'school-admin') this.teachers = students
            })
            .catch(err => {
                console.log(err)
            })
            // this.students = [{person: 'Иванова Мария', email: 'v11ru'}, {person: 'Иванов Иван', email: 'v12ru'}, {person: 'Сергеев Сергей', email: 'v13ru'}]
            // this.teachers = [{person: 'Иванова Мария', email: 'v14ru'}, {person: 'Иванов Иван', email: 'v15ru'}, {person: 'Сергеев Сергей', email: 'v16ru'}]
        },
        showInfo(email){
            if(this.role == 'teacher'){
                console.log(event.target)
                if(event.target.className != 'chartjs-render-monitor'){
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
                            console.log(SessionID)
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
                                console.log(statistics)
                                var ctx = document.getElementById('chart' + email)
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
                            })
                            .catch(err => {
                                console.log(err)
                            })
                            setTimeout(function(){
                                
                            }, 1500);
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
                            this.students2 = []
                            //document.getElementById(email).style.display = 'none'
                            let students = [{student: 'Петя', email: 'v11ru'}, {student: 'Вася', email: 'v12ru'}, {student: 'Дима', email: 'v13ru'}]
                            for(let i = 0; i < 3; i++){
                                this.students2.push(students[i])
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

</style>