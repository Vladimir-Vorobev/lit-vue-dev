<template>
    <div class="main main container" id="main"></div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'AllEvents',
    mounted(){
        needle.get('http://37.228.118.76:3000/api/getAllEvents',function(err, res){
            if (err) throw err
            else{
                let data = res.body
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                for(let i = 0; i < data.length; i++){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card"> <div class="card-body"> <h5 class="card-title">' + data[i].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].time + '</p> <p class="card-text"><i class="far fa-user"></i>' + ' ' + data[i].places + '</p> <p class="card-text">' + 'Тип: ' + data[i].type + '</p> <div class="form-check"> <input class="form-check-input" type="checkbox" focus="checkbox()" id=' + i + '> <label class="form-check-label" for="defaultCheck1"> <small> Собираюсь посетить </small> </label> </div> <br> <a href=' + data[i].link +  'class="btn btn-primary">Перейти к мероприятию</a> </div> <div class="card-footer text-muted">' + data[i].date + '</div> </div>',
                    )
                }
                let serverData = []
                document.cookie = "checkbox="
                let dataq = document.cookie.split(";")
                let name = ''
                let cookie = false
                for(let i = 0; i < dataq.length; i++){
                let value = dataq[i].toString()
                    for(let j = 0; j < value.length; j++){
                        if(dataq[i][j] == "="){
                            if(name == 'SessionID'){
                                cookie = true
                                break
                            }
                            name = ''
                        }
                        else if(dataq[i][j] != " "){
                            name += dataq[i][j]
                        }
                    }
                    name = ''
                }
                setInterval(() => {
                    for(let i = 0; i < data.length; i++){
                        let box = document.getElementById(i)
                        if(box.checked){
                            if(cookie){
                                if(serverData.indexOf(i) == -1){
                                    serverData.push(i)
                                    let serverDataq = ''
                                    for(let j = 0; j < serverData.length; j ++){
                                        serverDataq += serverData[j].toString()
                                        serverDataq += ' '
                                    }
                                    document.cookie = "checkbox=" + serverDataq
                                } 
                            }
                            else{
                                document.location.href = "/login"
                            }
                        }
                        else {
                            if(serverData.indexOf(i) != -1){
                                serverData.splice(serverData.indexOf(i), 1)
                                let serverDataq = ''
                                for(let j = 0; j < serverData.length; j ++){
                                    serverDataq += serverData[j].toString()
                                    serverDataq += ' '
                                }
                                document.cookie = "checkbox=" + serverDataq
                            }
                        }
                    }
                }, 500);

                
            }
        })
    },
    beforeDestroy(){
        //передаем данные серверу из куки checkbox
    }
}

</script>

<style scoped>
.main{
    padding-top: 110px !important;
}
.main{
    background-color: rgb(223, 223, 223);
    height: 100%;
    padding: 30px;
    min-height: 1018px;
    margin-bottom: 0px;
}
</style>