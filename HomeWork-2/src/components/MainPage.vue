<template>
    <div class="main container">
        <div class="name">ProfEvents</div>
        <div class="row">
            <p class="texta col-12 col-md-6"> <span style="font-weight: bold;">ProfEvents</span> - проект, помогающий в выборе и поиске профориентационных мероприятий. С помощью данного сайта вы можете посмотреть список мероприятий и отфильтровать их для более удобного просмотра. Также вы сможете поделиться своей статистикой с друзьями, создав уникальный код. Когда участвуешь в большом количестве мероприятий, не всегда удается быстро вспомнить, где и когда вы были. Наш сайт поможет решить эту проблему - он создаёт ваше “портфолио”.</p>
            <div class="photo col-12 col-md-6"><img src="./../assets/for_main.jpg" alt="">ProfEvents - сделай шаг на встречу профессиональному будущему</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainPage',
}
</script>

<style scoped>
.main{
    padding-top: 210px !important;
}
.main{
    background-color: rgb(231, 231, 231);
    height: 100%;
    padding: 30px;
    min-height: 100vh;
    margin-bottom: 0px;
}
.name{
    font-size: 2em;
    font-weight: bold !important;
    margin-bottom: 1em;
}
.texta{
    font-size:1.25em;
    text-align: left;   
}
.photo{
  width: 100%;
  height: 100%;
}
.photo img{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>