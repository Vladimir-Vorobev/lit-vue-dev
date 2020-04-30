<template>
    <div class="main">
        <form>
            <p>Какие темы Вас интересуют?</p>
            <p><input id="one" type="radio" value="IT-технологии"> IT-технологии</p>
            <p><input id="two" type="radio" name="a" value="Моделирование"> Моделирование</p>
            <p><input id="three" type="radio" name="a" value="Программирование"> Программирование</p>
            <input @onclick="Search()" type="submit" value="Искать">
        </form>
        <div id="main"></div>
        <div id="main1"></div>
        <div id="main2"></div>
    </div>
</template>

<script>

export default {
    name: 'RecommendedEvents',
    methods:{
        Search(){
            let box1 = document.getElementById('#one')
            if(box1.checked){
                document.getElementById('#main').innerHTML = 'ffff'
            }
            else{
                document.getElementById('#main').innerHTML = ''
            }
            
    }
}
}            
</script>

<style scoped>
.main{
    padding-top: 260px;
}
</style>