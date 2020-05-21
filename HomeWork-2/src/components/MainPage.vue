<template>
    <div class="main container">
        <div class="name">ProfEvents</div>
        <div class="row">
            <p class="texta col-12 col-md-6"> <span style="font-weight: bold;">ProfEvents</span> - проект, помогающий в поиске профориентационных мероприятий. На этом сайте Вы сможете искать, фильтровать и участвовать в профориентационных мероприятиях из различных сфер: программирование, инженеерия, медицина и многое другое. Если Вы еще сомневаетесь, какое мероприятие Вам подходит, пройдите наш тест на профориентацию и почитайте подобранную литературу, и мы поможем с выбором. Вы никогда не пропустите нужное Вам мероприятие, ведь мы напомним Вам о нем за час. Чтобы не было скучно одному, делитесь своей статистикой посещения с друзьями, создав уникальный код, тогда всегда можно вспомнить, какие мероприятия Вы посетили. Если Вы директор школы или учитель, мы представим Вам статистику Ваших учеников.</p>
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
    background-color: #fff;
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