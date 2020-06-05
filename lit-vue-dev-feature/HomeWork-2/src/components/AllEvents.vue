<template>
        <div class="main main container">
            <div class="card">
                <div class="card-body row">
                    <div class="col-md-5 col-12"> <p class="card-text" style="font-weight: bold; font-size: 1.3em">Сортировка мероприятий: </p> </div> 
                        <div class="col-md-7 col-12"> 
                        <select class="custom-select custom-select-sm mb-3 events" onchange="location.href=this.value">
                            <option value="/all-events" selected>Все</option>
                            <option value="/it-events">IT</option>
                            <option value="/engineering-events">Инженерия</option>
                            <option value="/medicine-events">Медицина</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import needle from 'needle'
export default {
    name: 'AllEvents',
    mounted(){
        let cookie = this.$store.getters.cookie
        let email = this.$store.getters.email
        needle.get('https://makual.ru/api/getAllEvents',function(err, res){
            if(err) console.log(err)
            else{
                let data = res.body.allE
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                for(let i = 0; i < data.length; i++){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card"> <div class="card-header " style="font-weight: bold;">' + data[i].date + '</div>  <div class="card-body"> <h5 class="card-title">' + data[i].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].time + '</p> <p class="card-text"><i class="far fa-user"></i>' + ' ' + data[i].places + '</p> <p class="card-text">' + 'Тип: ' + data[i].type + '</p> <div class="form-check"> <input class="form-check-input" type="checkbox" focus="checkbox()" id=' + i + '> <label class="form-check-label" for="defaultCheck1"> <small> Собираюсь посетить </small> </label> </div> <br> <a href=' + data[i].link +  ' class="btn btn-primary">Перейти к мероприятию</a> </div> </div>',
                    )
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
                                    needle.post('https://makual.ru/api/checkedEventsUpdate', {email: email}, {"json": true}, function(err){
                                        if (err) throw err

                                    })
                                }
                                else{box.checked = false}
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
    background-color: rgb(231, 231, 231);
    height: 100%;
    padding: 30px;
    min-height: 1018px;
    margin-bottom: 0px;
}
</style>