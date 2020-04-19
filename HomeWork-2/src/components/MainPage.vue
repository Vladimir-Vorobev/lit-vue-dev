<template>
    <div class='main'></div>
</template>

<script>
export default {
    name: 'MainPage',
    data(){
        let loadingStatus = ''
        let hoverCount = 0
        let actualText = ''
        return {
            loadingStatus,
            hoverCount,
            actualText
        }
    }
}
</script>

<style scoped>
.main{
display: inline-block;
cursor: pointer;
width: 50px;
height: 50px;
margin: 5px;
font-size: 25px;
color: gray;
border-radius: 25px;
background-color: white;

text-align: center;
line-height: 50px;

text-decoration: none; /* отменяем подчеркивание ссылки */


/* для мобильной версии убирается подсветка синим при нажатии Это как??? */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>