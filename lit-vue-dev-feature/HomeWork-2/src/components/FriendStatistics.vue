<template>
    <div class='main container'>
            <h2>Статистика</h2>
            <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                <option value="/friend-statistics" selected>Статистика друзей</option>
                <option value="/school-statistics">Обобщенная статистика школы (только для сотрудников учебных заведений)</option>
                <option value="/full-school-statistics">Полная статистика школы (только для сотрудников учебных заведений)</option>
            </select>
            <div class="form-group row">
              <div class="col-12 col-md-8"><input name="code" class="form-control name" placeholder="Код от Вашего друга"></div>
              <div class="col-12 col-md-4" style="padding: 0px 15px;"><button class="btn btn-outline-success" style="width: 100%;" @click="addFriend()">Добавить друга</button></div>
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
        fetch('https://makual.ru/api/getCodeInformation', {
            method: 'get',
            headers: {email: this.$store.getters.email},
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } .student{margin-top: 2.5em;border: 1.5px solid #818181; /* Белая рамка */border-radius: 10px; /* Радиус скругления */padding: 1.2em;}.si{font-size: 1.5em;margin-bottom: 1.5em;}.stat_school{margin-top: 1.5em;}.rate{text-align: left;font-size: 1.3em;margin-bottom: 2em;}.numr{font-size: 1.5em !important;font-weight: bold;}.colv{margin-left: 1.5em;}',
            )
            for(let i = 0; i < data.length; i++){
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<div class="student ' + data[i].name+data[i].surname+ ' "> <div class="si row"> <div class="col-12 col-md-6"><span class="ns">' + data[i].name + ' ' + data[i].surname + '</span></div> <div class="col-6 col-md-3">Класс: <span class="numc">' + data[i].class_number + '</span></div> <div class="col-6 col-md-3">Символ: <span class="simvol">' + data[i].simvol + '</span></div> </div>',
                )
                if(data[i].checkedEvents.length == 0){
                    document.querySelector('.'+data[i].name+data[i].surname+'').insertAdjacentHTML(
                        'beforeEnd',
                        'Нигде не участвует <br>'
                    )
                }
                for(let m = 0; m < data[i].checkedEvents.length; m++){
                    document.querySelector('.'+data[i].name+data[i].surname+'').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card">  <div class="card-header " style="font-weight: bold;">' + data[i].checkedEvents[m].date + '</div> <div class="card-body"> <h5 class="card-title">' + data[i].checkedEvents[m].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].checkedEvents[m].time + '</p> <p class="card-text">' + 'Тип: ' + data[i].checkedEvents[m].type + '</p> <a href=' + data[i].checkedEvents[m].link +  ' class="btn btn-primary">Перейти к мероприятию</a> </div> </div>',
                    )
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    methods:{
        addFriend(){
            event.preventDefault()
            if(document.querySelector('.name').value.trim() == '') alert('Введите номер')
            else if(document.querySelector('.name').value.trim() == '-1') alert('Введите корректный номер')
            else{
                let email = this.$store.getters.email
                needle.post('https://makual.ru/api/addFriendCode', {email: email, statNumber: document.querySelector('.name').value}, {"json": true}, function(err, res){
                if (err) console.log(err)
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