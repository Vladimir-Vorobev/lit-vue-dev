<template>
    <div class='main'>
        <h2>Статистика друзей</h2>
            <div class="form-group row">
              
              <div class="col-12 col-md-6"><input name="code" class="form-control name" placeholder="Код от Вашего друга"></div>
            </div>
            <div class="form-group row code">
            </div>
        <h2>Статистика Вашей школы</h2>
            <div class="form-group row school"></div>
    </div>
</template>

<script>
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
        .then(data => {
            console.log(data)
            for(let i = 0; i < data.length; i++){
                let b = i + 1
                document.querySelector('.school').innerHTML += 'Класс ' + b + '<br>'
                for(let j = 0; j < data[i].length; j++){
                    document.querySelector('.school').innerHTML += data[i][j].name + ' ' + data[i][j].surname + ' ' + data[i][j].class_number + ' ' + data[i][j].simvol + '<br>'
                    for(let m = 0; m < data[i][j].checkedEvents; m++){
                        console.log(data[i][j].checkedEvents[m])
                        document.querySelector('.school').insertAdjacentHTML(
                            'beforeEnd',
                            data[i][j].checkedEvents[m].name + '<br>' + data[i][j].checkedEvents[m].time + '<br>' + 'Тип: ' + data[i][j].checkedEvents[m].type + '</p> <a href=' + data[i][j].checkedEvents[m].link +  'class="btn btn-primary">Перейти к мероприятию</a>'  + data[i][j].checkedEvents[m].date + '</div> </div>',
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