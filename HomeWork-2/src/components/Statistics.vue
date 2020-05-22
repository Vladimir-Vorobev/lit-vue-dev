<template>
    <div class='main'>
            <h2>Статистика</h2>
            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                <option value="/friend-statistics">Статистика друзей</option>
                <option value="/school-statistics" selected>Обобщенная статистика школы (только для сотрудников учебных заведений)</option>
                <option value="/full-school-statistics">Полная статистика школы (только для сотрудников учебных заведений)</option>
            </select>
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
                console.log(data)
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                let a = 0
                let c = 0
                let d = 0
                let e = 0
                for(let i = 0; i < data.length; i++){
                    let b = i + 1
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
                            '<div class="rate"><span class="numr row">Класс: ' + b + '</span> <span class="row colv">Учеников зарегистрировано: ' + data[i].length + '</span><span class="row colv">Учеников, посетивших 0 мероприятий: ' + a + '</span><span class="row colv">Учеников, посетивших от 1 до 5 мероприятий: ' + c +'</span><span class="row colv">Учеников, посетивших от 5 до 10 мероприятий: ' + d + '</span><span class="row colv">Учеников, посетивших более 10 мероприятий: ' + e + '</span></div>',
                    )
                }
            }
            else if(datan.role == 'учитель'){
                let data = datan.data
                let s = 0
                for (let j = 0; j < data.length; j ++){
                    if (data[j].length != 0){
                        s = j
                        break
                    }
                }
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<h2>Статистика Вашей школы</h2> <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value"><option value="/statistics" selected>Обобщенная статистика</option> <option value="/full-statistics">Полная статистика</option> </select>',
                )
                let a = 0
                let c = 0
                let d = 0
                let e = 0
                for(let i = 0; i < data[s].length; i++){
                    document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Учеников зарегистрировано: ' + data[s].length + '<br>'
                    )
                    if(data[s][i].checkedEvents.length == 0){
                        a += 1
                    }
                    else if(data[s][i].checkedEvents.length > 0 && data[s][i].checkedEvents.length <= 5){
                        c += 1
                    }
                    else if(data[s][i].checkedEvents.length > 5 && data[s][i].checkedEvents.length <= 10){
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