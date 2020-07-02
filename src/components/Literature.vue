<template>
    <div class="main">
        <div class="container warp">
            <div class="name">Литература по психологии:</div>
            <div class="books">
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>Как завоёвывать друзей и оказывать влияние на людей. <span class="author">(Дейл Карнеги)</span></div>
                </div>
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>Как перестать беспокоиться и начать жить <span class="author">(Дейл Карнеги)</span></div>
                </div>
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>Ты можешь больше, чем ты думаешь <span class="author">(Томас Армстронг)</span></div>
                </div>
            </div>
            <div class="name">Литература по профориентации:</div>
            <div class="books">
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>Ступени карьеры. Азбука профориентации <span class="author">(И. Л. Соломин, М. А. Бендюков)</span></div>
                </div>
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>Тренинг "Профориентация для старшеклассников" <span class="author">(М. Ф. Шевченко)</span></div>
                </div>
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>100 популярных профессий. Психология успешной карьеры для старшеклассников и студентов <span class="author">(Андрей Грецов, Т. Бедарева)</span></div>
                </div>
            </div>
            <div class="name">Литература для саморазвития для подростков:</div>
            <div class="books">
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>Твой первый миллион. Как его заработать и не потерять <span class="author">(Джеймс Маккена, Джанин Глайста, Мэтт Фонтейн)</span></div>
                </div>
                <div class="book"> 
                    <div class="book_name"><span class="marker">– </span>Чего ты по-настоящему хочешь? Как ставить цели и достигать их <span class="author">(Беверли Бэтчел)</span></div>
                </div>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
export default {
    name: 'Literature',
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
    padding: 0px;
    min-height: 100vh;
    margin-bottom: 0px;
}

.name{
    font-size: 1.7em;
    font-weight: bold !important;
    margin-bottom: 1em;
    text-align: left;
}
.author{
    font-size: 0.9em;
    text-align: left;
    font-style:italic;  
}
.books{
    text-align: left;
    font-size: 1.2em;
    margin-left: 1em;
    margin-bottom: 2.5em;
}
.book{
    margin-bottom: 0.5em;
}
.marker{
    font-weight: 1000;
}
</style>