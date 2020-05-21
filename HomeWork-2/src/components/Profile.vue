<template>
    <div class="main container">
        <form class="formbox">
            <h2>Профиль</h2>
            <div class="form-group row">
              <div class="col-12 col-md-6"><input name="name" class="form-control" placeholder="Имя"></div>
              <div class="col-12 col-md-6"><input name="surname"  class="form-control" placeholder="Фамилия"></div>
            </div>
            <div class="form-group row">
              <div class="col-12"> 
                <input class="form-control" name="email" placeholder="example@gmail.com">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12"> 
                <input name="age" class="form-control" placeholder="Возраст">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12"> 
                <input type="password" class="form-control" name="password" placeholder="Новый пароль">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12"> 
                <input name="password2" class="form-control" placeholder="Повторите пароль">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 col-md-7"> 
                <input name="city" class="form-control" placeholder="Город">
              </div>
              <div class="col-12 col-md-5"> 
                <input name="school" class="form-control" placeholder="Номер учебного заведения">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 col-md-6"> 
                <select name="schoolType" class="custom-select custom-select-lg mb-3">
                  <option selected>Тип учебного заведения</option>
                  <option value="school">Школа</option>
                  <option value="college">Колледж</option>
                  <option value="university">ВУЗ</option>
                </select>
              </div>
              <div class="col-12 col-md-6"> 
                <select name="role" class="custom-select custom-select-lg mb-3">
                  <option selected>Роль в учебном заведении</option>
                  <option value="student">Ученик</option>
                  <option value="teacher">Учитель</option>
                  <option value="director">Директор</option>
              </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 col-md-6"><input name="class_number" class="form-control" placeholder="Номер класса"></div>
              <div class="col-12 col-md-6"><input name="simvol" class="form-control" placeholder="Символ класса"></div>
            </div>
            <div class="form-group row">
              <div class="col-12 col-md-6"> 
                <label for="exampleInputEmail1"><h3>Добавить портфолио</h3></label>
              </div>
              <div class="col-12 col-md-6"> 
                <input type="file" name="portfolio" class="form-control-file" multiple accept="image/*">
              </div>
            </div>
            <div class="form-group row"> 
                <button class="btn btn-primary btn-lg" @click="updateUser()">Сохранить</button>
              </div>
        </form>
        <div class="row num">
            <div class="col-12 col-md-8"><span>Этот номер необходим, если Вы хотите делиться своей статистикой с другими пользователями, например, с родителями или друзьями. Внимание: предоставляйте этот номер только тем, кому Вы доверяете</span> <br> <router-link to="/statistics">Посмотреть статистику знакомых</router-link></div>
            <div class="number"></div>
            <div class="col-12 col-md-4"><button class="btn btn-info btn-lg" @click="addNumber()">Создать уникальный номер</button></div>
        </div>
    </div>
</template>
<script>
import needle from "needle"
export default {
    name: 'Profile',
    methods: {
      mounted(){
        let datah = document.cookie.split(";")
        let name = ''
        let email
        let b = 0
        for(let i = 0; i < datah.length; i++){
            let value = datah[i].toString()
            for(let j = 0; j < value.length; j++){
                if(datah[i][j] == "="){
                    if(name == 'email'){
                        b = 1
                    }
                    name = ''
                }
                else if(datah[i][j] != " "){
                    name += datah[i][j]
                }
            }
            if(b == 1){
                email = name
                b = 0
            }
            name = ''
        }
        fetch('http://37.228.118.76:3000/api/getCheckedEvents', {
            method: 'get',
            headers: {email: email},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            document.querySelector('.main').insertAdjacentHTML(
                'beforeEnd',
                '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
            )
            if(data.city == undefined) data.city = '-'
            if(data.school == undefined) data.school = '-'
            if(data.schoolType == undefined) data.schoolType = '-'
            if(data.role == undefined) data.role = '-'
            if(data.class_number == undefined) data.class_number = '-'
            if(data.simvol == undefined) data.simvol = '-'
            if(data.portfolio == undefined) data.portfolio = '-'
            if(data.statNumber == undefined) data.statNumber = '-'
            for(let i = 0; i < data.length; i++){
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<div class="card"> <div class="card-body"> <h5 class="card-title">' + data[i].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].time + '</p> <p class="card-text">' + 'Тип: ' + data[i].type + '</p> <a href=' + data[i].link +  'class="btn btn-primary">Перейти к мероприятию</a> </div> <div class="card-footer text-muted">' + data[i].date + '</div> </div>',
                )
            }
        })
        .catch(err => {
            console.log(err)
        })
      },
      updateUser(){
        event.preventDefault()
        let re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        let form = document.forms[0]
        let name = form.elements.name.value
        let surname = form.elements.surname.value
        let email = form.elements.email.value.replace(/\s/g, '')
        let age = form.elements.age.value
        let password = form.elements.password.value
        let password2 = form.elements.password2.value
        let city = form.elements.city.value
        let school = form.elements.school.value
        let schoolType = form.elements.schoolType.value
        let role = form.elements.role.value
        let class_number = form.elements.class_number.value
        let simvol = form.elements.simvol.value
        let portfolio = form.elements.portfolio.value
        if(password != password2){
          alert("Пароли не совпадают")
        }
        else if(re.test(email) == false && email.trim() != ''){
          alert("Введен некорректный email")
        }
        else if(password.length < 5 && password.trim() != ''){
          alert("Пароль слишком короткий")
        }
        else if(password.length > 15){
          alert("Пароль слишком длинный")
        }
        else{
            let crypto = require('crypto')
            let data = {}
            if(name.trim() != '') data.name = name
            if(surname.trim() != '') data.surname = surname
            if(email.trim() != '') data.email = email
            if(age.trim() != '') data.age = age
            if(password.trim() != '') data.password = crypto.createHash('md5').update(password).digest("hex")
            if(city.trim() != '') data.city = city
            if(school.trim() != '') data.school = school
            if(schoolType.trim() != '' && schoolType != "Тип учебного заведения") data.schoolType = schoolType
            if(role.trim() != '' && role != "Роль в учебном заведении") data.role = role
            if(class_number.trim() != '') data.class_number = class_number
            if(simvol.trim() != '') data.simvol = simvol
            if(portfolio != '') data.portfolio = portfolio
            console.log(data)
            let datah = document.cookie.split(";")
            let nameс = ''
            let emails
            let b = 0
            for(let i = 0; i < datah.length; i++){
                let value = datah[i].toString()
                for(let j = 0; j < value.length; j++){
                    if(datah[i][j] == "="){
                        if(name == 'email'){
                            b = 1
                        }
                        nameс = ''
                    }
                    else if(datah[i][j] != " "){
                        nameс += datah[i][j]
                    }
                }
                if(b == 1){
                    emails = nameс
                    b = 0
                }
                nameс = ''
            }
            fetch('http://37.228.118.76:3000/api/getCheckedEvents', {
                method: 'get',
                headers: {email: emails},
            })
            .then(response => {
                console.log("res", response)
                return response.json()
            })
            .then(data => {
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                for(let i = 0; i < data.length; i++){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card"> <div class="card-body"> <h5 class="card-title">' + data[i].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].time + '</p> <p class="card-text">' + 'Тип: ' + data[i].type + '</p> <a href=' + data[i].link +  'class="btn btn-primary">Перейти к мероприятию</a> </div> <div class="card-footer text-muted">' + data[i].date + '</div> </div>',
                    )
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
      },
      addNumber(){
          let statNumber = Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000
          let datah = document.cookie.split(";")
          let name = ''
          let email
          let b = 0
          for(let i = 0; i < datah.length; i++){
              let value = datah[i].toString()
              for(let j = 0; j < value.length; j++){
                  if(datah[i][j] == "="){
                      if(name == 'email'){
                          b = 1
                      }
                      name = ''
                  }
                  else if(datah[i][j] != " "){
                      name += datah[i][j]
                  }
              }
              if(b == 1){
                  email = name
                  b = 0
              }
              name = ''
          }
          needle.post('http://37.228.118.76:3000/api/checkedEventsUpdate', {email: email, statNumber: statNumber}, {"json": true}, function(err){
            if (err) throw err
          })
      }
    }
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
    min-height: 100vh;
    margin-bottom: 0px;
}
.main p{
  position: absolute; bottom: 0;
  color: #4f4f50;
}

.link{
  color: #4f4f50;
  text-decoration: none;
}
.link:hover{
  color: #EF5B65;
  text-decoration: none;
}
.num{
  margin-top: 50px;;
}
</style>