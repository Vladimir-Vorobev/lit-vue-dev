
<template>
<div>
    <div id="app">
    <!--Вот здесь-->
        <div ref="background" class="btn-container">
            <div>
                <router-link ref="home" v-on:click.native="ButtonChange()" to="/" class="btn fas fa-home"></router-link>
            </div>
            <div>
                <router-link ref="first" v-on:click.native="ButtonChange()" to="/vuecycle" class="fas fa-cog btn"></router-link>
            </div>
        </div>
    </div>
</div>
    
</template>


<script>
import anime from 'animejs'

export default { 
    name: 'Header',
    methods:{
        ButtonChange() {
            console.log(this.$refs.background)
            console.log(this.$refs.first)
            let ButtonWidth = 50
            let MaxButtonWidth = 100
            let WindowLocation = window.location.pathname

            if(window.matchMedia('(max-width: 400px)').matches){
                ButtonWidth = 40
                MaxButtonWidth = 80
            }
            else if(window.matchMedia('(min-width: 800px)').matches){
                ButtonWidth = 70
                MaxButtonWidth = 140
            }
            if(WindowLocation == '/vuecycle'){
                anime({
                    targets: this.$refs.first,
                    width: MaxButtonWidth,
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgb(237, 178, 5)'
                })
                anime({
                    targets: this.$refs.home,
                    width: ButtonWidth,
                    color: 'rgb(128, 128, 128)',
                    backgroundColor: 'rgb(255, 255, 255)'
                })
                anime({
                    targets: this.$refs.background,
                    backgroundColor: 'rgb(222, 155, 0)'
                })
            }
            else{
                anime({
                    targets: this.$refs.home,
                    width: MaxButtonWidth,
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgb(21, 0, 255)'
                })
                anime({
                    targets: this.$refs.first,
                    width: ButtonWidth,
                    color: 'rgb(128, 128, 128)',
                    backgroundColor: 'rgb(255, 255, 255)'
                })
                anime({
                    targets: this.$refs.background,
                    backgroundColor: 'rgb(6, 30, 205)'
                })
            }
        }
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
border-radius: 25px;
background-color: white;

text-align: center;
line-height: 50px;

text-decoration: none; /* отменяем подчеркивание ссылки */


/* для мобильной версии убирается подсветка синим при нажатии Это как??? */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
 }
@media screen and (max-width: 400px) {
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
        border-radius: 20px;
        line-height: 40px;
    }
}

@media screen and (min-width: 800px) {
    .btn-container {
        padding-top: 130px;
        padding-bottom: 130px;
    }
    .btn {
        width: 70px;
        height: 70px;
        margin: 5px;
        font-size: 35px;
        color: gray;
        border-radius: 35px;
        line-height: 70px;
    }
}


</style>