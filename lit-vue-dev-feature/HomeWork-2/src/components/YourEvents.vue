<template>
    <div class="main main container" id="main"></div>
</template>

<script>
export default {
    name: 'YourEvents',
     mounted(){
         let email = this.$store.getters.email
        fetch('https://makual.ru/api/getCheckedEvents', {
            method: 'get',
            headers: {email: email},
		})
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            document.querySelector('.main').insertAdjacentHTML(
                'beforeEnd',
                '<style> .card{ margin-top: 10px !important; } .card-body { text-align: left !important; } .card-body h5{ font-weight: bold; } </style>',
            )
            for(let i = 0; i < data.length; i++){
                document.querySelector('.main').insertAdjacentHTML(
                    'beforeEnd',
                    '<div class="card"> <div class="card-header " style="font-weight: bold;">' + data[i].date + '</div> <div class="card-body"> <div class="row"> <h5 class="card-title col-11" style="text-align: center;">' + data[i].name + '</h5> <h5><button class="btn btn-danger" @click="delete()"> <i class="fas fa-trash-alt"></i> </button></h5> </div> <p class="card-text"><i class="far fa-clock"></i>' + ' ' + data[i].time + '</p> <p class="card-text">' + 'Тип: ' + data[i].type + '</p> <a href=' + data[i].link +  ' class="btn btn-primary">Перейти к мероприятию</a> </div> </div>',
                )
            }
        })
        .catch(err => {
            alert("Возможно, Вы еще не добавили ни одного мероприятия, посмотрите страницу всех мероприятий")
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
    background-color: rgb(231, 231, 231);
    height: 100%;
    padding: 30px;
    min-height: 1018px;
    margin-bottom: 0px;
}
</style>