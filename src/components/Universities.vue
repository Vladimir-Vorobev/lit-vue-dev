<template>
    <div class="main container">
        <div class="card" v-for="item in data" :key="item.value">
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <p class="card-text">Минимальный проходной балл на бюджетную основу: {{item.min}}</p>
                <p class="card-text">Минимальный проходной балл на платную основу: {{item.max}}</p>
                <p class="card-text">Минимальная цена обучения. Тыс/год: {{item.price}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Universities',
    data(){
        let data = []
        return{
            data
        }
    },
    beforeMount(){
        fetch('https://makual.ru/api/getAllEvents', {
            method: 'get',
        })
        .then(response => {
            console.log("res", response)
            return response.json()
        })
        .then(data => {
            this.data = data.points
        })
    },
}            
</script>

<style scoped>
.main{
    padding-top: 110px !important;
}
.main{
    height: 100%;
    padding: 30px;
    min-height: 1018px;
    margin-bottom: 0px;
}
.card{ 
    margin-top: 10px !important;
}
.card-body{
    text-align: left !important;
}
.card-body h5{
    font-weight: bold;
}
</style>