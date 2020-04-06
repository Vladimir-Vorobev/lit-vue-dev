
<template>
<div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <div id="app">
        <div class="btn-container">
            <div>
                <router-link to="/" class="btn fas fa-home"></router-link>
            </div>
            <div>
                <router-link to="/chat" class="btn fas fa-comment"></router-link>
            </div>
            <div>
                <router-link to="/ourteam" class="fas fa-user btn"></router-link>
            </div>
            <div>
                <router-link to="/howtoget" class="fas fa-map-marker btn"></router-link>
            </div>
            <div>
                <router-link to="/settings" class="fas fa-cog btn"></router-link>
            </div>
        </div>
    </div>
</div>
    
</template>


<script>
import anime from 'animejs'
export default { 
    name: 'Test',
}

window.onload = function() {
    let first = document.querySelector('.fa-comment')
    let second = document.querySelector('.fa-user')
    let third = document.querySelector('.fa-map-marker')
    let fourth = document.querySelector('.fa-cog')
    let background = document.querySelector('.btn-container')
    let home = document.querySelector('.fa-home')
    let ButtonWidth = 50
    let MaxButtonWidth = 100
    if(window.matchMedia('(max-width: 360px)').matches){
        ButtonWidth = 40
        MaxButtonWidth = 80
    }
    first.onclick = function(){
        anime({
            targets: [second, third, fourth, home],
            width: ButtonWidth,
            color: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(255, 255, 255)'
        })
        anime({
            targets: first,
            width: MaxButtonWidth,
            color: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(237, 178, 5)'
        })
        anime({
            targets: background,
            backgroundColor: 'rgb(222, 155, 0)'
        })
    }
    second.onclick = function(){
        anime({
            targets: [first, third, fourth, home],
            width: ButtonWidth,
            color: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(255, 255, 255)'
        })
        anime({
            targets: second,
            width: MaxButtonWidth,
            color: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(75, 211, 137)'
        })
        anime({
            targets: background,
            backgroundColor: 'rgb(62, 175, 111)'
        })
    }
    third.onclick = function(){
        anime({
            targets: [first, second, fourth, home],
            width: ButtonWidth,
            color: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(255, 255, 255)'
        })
        anime({
            targets: third,
            width: MaxButtonWidth,
            color: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(230, 23, 83)'
        })
        anime({
            targets: background,
            backgroundColor: 'rgb(190, 0, 49)'
        })
    }
    fourth.onclick = function(){
        anime({
            targets: [first, second, third, home],
            width: ButtonWidth,
            color: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(255, 255, 255)'
        })
        anime({
            targets: fourth,
            width: MaxButtonWidth,
            color: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(179, 45, 210)'
        })
        anime({
            targets: background,
            backgroundColor: 'rgb(142, 0, 172)'
        })
    }
    home.onclick = function(){
        anime({
            targets: [first, second, third, fourth],
            width: ButtonWidth,
            color: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(255, 255, 255)'
        })
        anime({
            targets: home,
            width: MaxButtonWidth,
            color: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(21, 0, 255)'
        })
        anime({
            targets: background,
            backgroundColor: 'rgb(6, 30, 205)'
        })
    }
}


</script>

<style scoped>
.btn-container {
display: flex;
background-color: black;
padding-top: 100px;
padding-bottom: 100px;
justify-content: center;
}

.btn {
display: inline-block;
cursor: pointer;
width: 50px;
height: 50px;
margin: 5px;
font-size: 25px;
color: gray;
/* круглые кнопки белого цвета */
border-radius: 25px;
background-color: white;

text-align: center;
line-height: 50px;

text-decoration: none; /* отменяем подчеркивание ссылки */


/* для мобильной версии убирается подсветка синим при нажатии Это как??? */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
 }
@media screen and (max-width: 360px) {
    .btn-container {
        padding-top: 60px;
        padding-bottom: 60px;
    }
    .btn {
        width: 40px;
        height: 40px;
        margin: 5px;
        font-size: 20px;
        color: gray;
        /* круглые кнопки белого цвета */
        border-radius: 20px;
        line-height: 40px;
    }
}

</style>