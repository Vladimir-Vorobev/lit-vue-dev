<template>
    <div class="main container">

    </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'Universities',
    mounted(){
        needle.get('https://makual.ru/api/getAllEvents',function(err, res){
            if(err) alert("Ошибка подключения")
            else{
                let data = res.body.points
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                for(let i = 0; i < data.length; i++){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card"> <div class="card-body"> <h5 class="card-title">' + data[i].name + '</h5> <p class="card-text"> Минимальный проходной балл на бюджетную основу: '  + data[i].min + '</p> <p class="card-text"> Минимальный проходной балл на платную основу: '  + data[i].max + '</p> <p class="card-text">' + 'Минимальная цена обучения. Тыс/год: ' + data[i].price + '</p> </div>',
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
                                    needle.post('https://makual.ru/api/checkedEventsUpdate', {email: email, events: datas}, {"json": true}, function(err){
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
    padding-top: 110px !important;
}
.main{
    background-color: #fff;
    height: 100%;
    padding: 30px;
    min-height: 1018px;
    margin-bottom: 0px;
}
</style>