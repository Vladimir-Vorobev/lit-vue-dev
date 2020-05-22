<template>
    <div class='main'>
        <h2>Статистика Вашей школы</h2>
            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                <option value="/statistics">Обобщенная статистика</option>
                <option value="/full-statistics" selected>Полная статистика</option>
            </select>
    </div>
</template>

<script>
export default {
    name: 'FullStatistics',
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
            let data = datan.data
            document.querySelector('.main').insertAdjacentHTML(
                'beforeEnd',
                '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
            )
            for(let i = 0; i < data.length; i++){
                let b = i + 1
                document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        'Класс ' + b + '<br>'
                )
                if(data[i].length == 0){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        'Никого не зарегистрировано <br>'
                    )
                }
                for(let j = 0; j < data[i].length; j++){
                    console.log(data[i][j].checkedEvents)
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        data[i][j].name + ' ' + data[i][j].surname + ' ' + data[i][j].class_number + ' ' + data[i][j].simvol + '<br>'
                    )
                    if(data[i][j].checkedEvents.length == 0){
                        document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            'Нигде не участвует <br>'
                        )
                    }
                    for(let m = 0; m < data[i][j].checkedEvents.length; m++){
                        console.log(data[i][j].checkedEvents[m])
                        document.querySelector('.main').insertAdjacentHTML(
                            'beforeEnd',
                            '<div class="card"> <div class="card-body"> <h5 class="card-title">' + data[i][j].checkedEvents[m].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i][j].checkedEvents[m].time + '</p> <p class="card-text">' + 'Тип: ' + data[i][j].checkedEvents[m].type + '</p> <a href=' + data[i][j].checkedEvents[m].link +  'class="btn btn-primary">Перейти к мероприятию</a> </div> <div class="card-footer text-muted">' + data[i][j].checkedEvents[m].date + '</div> </div>',
                        )
                    }
                }
            }
        })
        .catch(err => {
            alert("Ошибка подключения")
            console.log(err)
        })
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