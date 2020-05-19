<template>
    <div class="main main container">
    </div>
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
                console.log(data)
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
                )
                for(let i = 0; i < data.length; i++){
                    document.querySelector('.main').insertAdjacentHTML(
                        'beforeEnd',
                        '<div class="card"> <div class="card-body"> <h5 class="card-title">' + data[i].name + '</h5> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].time + '</p> <p class="card-text"><i class="far fa-user"></i>' + ' ' + data[i].places + '</p> <p class="card-text">' + 'Тип: ' + data[i].type + '</p> <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id=' + i + '> <label class="form-check-label" for="defaultCheck1"> <small> Собираюсь посетить </small> </label> </div> <br> <a href="' + data[i].link + '" class="btn btn-primary">Перейти к мероприятию</a> </div> <div class="card-footer text-muted">' + data[i].date + '</div> </div>',
                    )
                }
            }
        })
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