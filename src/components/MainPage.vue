<template>
    <div class="main">
        <div class="container warp">
            <!-- <div class="name">ProfEvents</div>
            <div class="row">
                <p class="texta col-12 col-md-6"> <span style="font-weight: bold; color: #d61451">ProfEvents</span> - проект, помогающий в поиске профориентационных мероприятий. На этом сайте Вы сможете искать, фильтровать и участвовать в профориентационных мероприятиях из различных сфер: программирование, инженеерия, медицина и многое другое. Если Вы еще сомневаетесь, какое мероприятие Вам подходит, пройдите наш тест на профориентацию и почитайте подобранную литературу, и мы поможем с выбором. Вы никогда не пропустите нужное Вам мероприятие, ведь мы напомним Вам о нем за час. Чтобы не было скучно одному, делитесь своей статистикой посещения с друзьями, создав уникальный код, тогда всегда можно вспомнить, какие мероприятия Вы посетили. Если Вы директор школы или учитель, мы представим Вам статистику Ваших учеников. Кроме того, у нас Вы можете найти информацию о днях открытых дверей в различных учебных заведениях и посмотреть информацию о ведущих ВУЗах.</p>
                <div class="photo col-12 col-md-6"><img src="./../assets/for_main.jpg" alt="">ProfEvents - сделай шаг на встречу профессиональному будущему</div>
            </div> -->
            <div class="name">ProfEvents</div>
            <div class="description">
                <div>Поисковый сервис профориентационных мероприятий</div> <br>
                <div>Здесь вы сможете найти самые интересные и бесплатные профориентационные мероприятия.</div>
            </div>
            <div class="row for_who" >
                <div class="col-12 col-lg-4">
                    <h4 style="border-bottom: 1px solid black">Для обучающихся</h4> 
                    <ul class="list">
                        <li>Профориентационный тест, помогающий выбрать нужные мероприятия</li>
                        <li>Поиск профориентационных мероприятий по критериям</li>
                        <li>Формирование портфолио</li>
                    </ul>
                </div>
                <div class="col-12 col-lg-4">
                    <h4 style="border-bottom: 1px solid black">Для учителей</h4> 
                    <ul class="list">
                        <li>Подбор актуальных мероприятий</li>
                        <li>Учет посещения мероприятий по классам</li>
                        <li>Учет посещения ДО и Внеурочной деятельности* <small>(дополнительная функция)</small></li>
                    </ul>
                </div>
                <div class="col-12 col-lg-4">
                    <h4 style="border-bottom: 1px solid black">Для администрации</h4> 
                    <ul class="list">
                        <li>Статистика посещений профориентационных мероприятий школьниками</li>
                        <li>Доступ к полной статистике по школе посещения ДО и внеурочной деятельности* <small>(дополнительная функция)</small></li>
                    </ul>
                </div>
            </div> <hr>
            <div>
                <p>Возможность приглашать пользователей на профориентационные мероприятия</p> 
                <p>Делиться фотографиями с мероприятий</p>
                <p>Регистрация на мероприятия</p>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
export default {
    name: 'MainPage',
    components: { Footer },
}
</script>

<style scoped>
.warp{
    flex: 1 0 auto;
    padding-top: 110px !important;
    background-color: #fff;
    padding: 0px 30px;
}
.footer{
    flex: 0 0 auto;
}
.main{
    display: flex;
	flex-direction: column;
}
.main{
    height: 100%;
    padding: 0px 0px;
    min-height: 100vh;
    margin-bottom: 0px;
}
.name{
    font-size: 2em;
    font-weight: bold !important;
    margin-bottom: 1em;
}
.description{
    font-size:1.25em;  
}
.for_who{
    margin-top: 0.7em;
}
.list li{
    margin-bottom: 0.3em;
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