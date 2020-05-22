<template>
    <div class="main"></div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'OpenDays',
    mounted(){
        needle.get('http://37.228.118.76:3000/api/getAllEvents',function(err, res){
            if(err) alert("Ошибка подключения")
            else{
                let data = res.body.open
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                for(let i = 0; i < data.length; i++){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card"> <div class="card-header " style="font-weight: bold;">' + data[i].date + '</div>  <div class="card-body"> <h5 class="card-title">' + data[i].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].time + '</p> <p class="card-text">' + 'Тип: ' + data[i].type + '</p> <div class="form-check"> <input class="form-check-input" type="checkbox" focus="checkbox()" id=' + i + '> <label class="form-check-label" for="defaultCheck1"> <small> Собираюсь посетить </small> </label> </div> <br> <a href=' + data[i].link +  'class="btn btn-primary">Перейти к мероприятию</a> </div> </div>',
                    )
                }
                let dataq = document.cookie.split(";")
                let name = ''
                let b = 0
                let email = ''
                let cookie = false
                for(let i = 0; i < dataq.length; i++){
                let value = dataq[i].toString()
                    for(let j = 0; j < value.length; j++){
                        if(dataq[i][j] == "="){
                            if(name == 'email'){
                                cookie = true
                                b = 1
                            }
                            name = ''
                        }
                        else if(dataq[i][j] != " "){
                            name += dataq[i][j]
                        }
                    }
                    if(b == 1){
                        email = name
                    }
                    name = ''
                }
                setInterval(() => {
                    for(let i = 0; i < data.length; i++){
                        let box = document.getElementById(i)
                        if(box.checked){
                            if(cookie){
                                if(confirm('Вы уверены, что хотите посетить данное мероприятие?')){
                                    box.checked = false
                                    let datas = data[i]
                                    delete datas.places
                                    needle.post('http://37.228.118.76:3000/api/checkedEventsUpdate', {email: email, events: datas}, {"json": true}, function(err){
                                        if (err) throw err

                                    })
                                }
                            }
                            else{
                                document.location.href = "/login"
                            }
                        }
                        
                    }
                }, 500);
            }
        })
    },
}            
</script>

<style scoped>
.main{
    padding-top: 80px;
}
</style>