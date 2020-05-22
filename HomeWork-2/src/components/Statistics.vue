<template>
    <div class='main'>
        <h2>Статистика друзей</h2>
            <div class="form-group row">
              
              <div class="col-12 col-md-6"><input name="code" class="form-control name" placeholder="Код от Вашего друга"></div>
              <button @click="addFriend()">Добавить друга</button>
            </div>
            <div class="form-group row code">
            </div>
    </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'Statistics',
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
        fetch('http://37.228.118.76:3000/api/getCodeInformation', {
            method: 'get',
            headers: {email: email},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            console.log(data.le)
             document.querySelector('.main').insertAdjacentHTML(
                'beforeEnd',
                '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
            )
            for(let i = 0; i < data.length; i++){
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    data[i].name + ' ' + data[i].surname + ' ' + data[i].class_number + ' ' + data[i].simvol + '<br>'
                )
                if(data[i].checkedEvents.length == 0){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        'Нигде не участвует <br>'
                    )
                }
                for(let m = 0; m < data[i].checkedEvents.length; m++){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card"> <div class="card-body"> <h5 class="card-title">' + data[i].checkedEvents[m].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].checkedEvents[m].time + '</p> <p class="card-text">' + 'Тип: ' + data[i].checkedEvents[m].type + '</p> <a href=' + data[i].checkedEvents[m].link +  'class="btn btn-primary">Перейти к мероприятию</a> </div> <div class="card-footer text-muted">' + data[i].checkedEvents[m].date + '</div> </div>',
                    )
                }
            }
        })
        .catch(err => {
            alert("Ошибка подключения")
            console.log(err)
        })
        fetch('http://37.228.118.76:3000/api/getOtherInformation', {
        method: 'get',
        headers: {email: email},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(datan => {
            if(datan.role == 'директор'){
                let data = datan.data
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<h2>Статистика Вашей школы</h2> <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value"><option value="/statistics" selected>Обобщенная статистика</option> <option value="/full-statistics">Полная статистика</option> </select>',
                )
                for(let i = 0; i < data.length; i++){
                    let b = i + 1
                    document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Класс ' + b + '<br>'
                    )
                    document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Учеников зарегистрировано: ' + data[i].length + '<br>'
                    )
                    let a = 0
                    let c = 0
                    let d = 0
                    let e = 0
                    for(let j = 0; j < data[i].length; j++){
                        if(data[i][j].checkedEvents.length == 0){
                            a += 1
                        }
                        else if(data[i][j].checkedEvents.length > 0 && data[i][j].checkedEvents.length <= 5){
                            c += 1
                        }
                        else if(data[i][j].checkedEvents.length > 5 && data[i][j].checkedEvents.length <= 10){
                            d += 1
                        }
                        else{
                            e += 1
                        }
                    }
                    document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Учеников, посетивших 0 мероприятий: ' + a + '<br>'
                    )
                    document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Учеников, посетивших от 1 до 5 мероприятий: ' + c + '<br>'
                    )
                    document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Учеников, посетивших от 5 до 10 мероприятий: ' + d + '<br>'
                    )
                    document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Учеников, посетивших более 10 мероприятий: ' + e + '<br>'
                    )

                }
            }
            
        })
        .catch(err => {
            alert("Ошибка подключения")
            console.log(err)
        })
    },
    methods:{
        addFriend(){
            event.preventDefault()
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
            if(document.querySelector('.name').value.trim() == '') alert('Введите номер')
            else if(document.querySelector('.name').value.trim() == '-1') alert('Введите корректный номер')
            else{
                needle.post('http://37.228.118.76:3000/api/addFriendCode', {email: email, statNumber: document.querySelector('.name').value}, {"json": true}, function(err, res){
                if (err) alert('Ошибка подключения')
                else{
                    let data = res.body
                    if(data == 'Code not found'){
                        alert('Пользователь не найден')
                    }
                    else{
                        alert('Пользователь успешно добавлен')
                        document.location.reload()
                    }
                }
                })
            }
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
</style>