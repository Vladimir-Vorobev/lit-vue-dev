<template>
    <div class="main">
        <div class="container warp">
            <h4>Выберите одно из двух, то что вам больше нравиться</h4>
            <form class="formb">
                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="first" id="1" class="custom-control-input" value="medicine">
                        <label class="custom-control-label" for="1">Лечить людей</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="first"  id="2" class="custom-control-input" value="engineering">
                        <label class="custom-control-label" for="2">Или чинить электронику</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="second" id="3" class="custom-control-input" value="it">
                        <label class="custom-control-label" for="3">Писать програмы</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="second" id="4" class="custom-control-input" value="engineering">
                        <label class="custom-control-label" for="4">Или разбираться в чертежах и что-то изготавливать по ним</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="third" id="5" class="custom-control-input" value="art">
                        <label class="custom-control-label" for="5">Рисовать картины</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="third" id="6" class="custom-control-input" value="it">
                        <label class="custom-control-label" for="6">Или сидеть за компьютером и разрабатывать что-то</label>
                    </div> 
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="fourth" id="7" class="custom-control-input" value="art">
                        <label class="custom-control-label" for="7">Лепить из глины</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="fourth" id="8" class="custom-control-input" value="engineering">
                        <label class="custom-control-label" for="8">Или паять радиосхемы</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="fifth" id="9" class="custom-control-input" value="medicine">
                        <label class="custom-control-label" for="9">Помогать раненым</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="fifth" id="10" class="custom-control-input" value="art">
                        <label class="custom-control-label" for="10">Или писать книгу о войне</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="sixth" id="11" class="custom-control-input" value="engineering">
                        <label class="custom-control-label" for="11">Изготавливать протезы</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="sixth" id="12" class="custom-control-input" value="medicine">
                        <label class="custom-control-label" for="12">Или работать хирургом</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="seventh" id="13" class="custom-control-input" value="it">
                        <label class="custom-control-label" for="13">Разрабатывать сайты</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="seventh" id="14" class="custom-control-input" value="art">
                        <label class="custom-control-label" for="14">Или создавать модную одежду</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="eighth" id="15" class="custom-control-input" value="it">
                        <label class="custom-control-label" for="15">Создавать искусственный интеллект</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="eighth" id="16" class="custom-control-input" value="engineering">
                        <label class="custom-control-label" for="16">Или проектировать и создавать роботов</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="ninth" id="17" class="custom-control-input" value="medicine">
                        <label class="custom-control-label" for="17">Быть нейрохирургом</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="ninth" id="18" class="custom-control-input" value="art">
                        <label class="custom-control-label" for="18">Или дизайнером</label>
                    </div>
                </div>

                <div class="chooseb">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="tenth" id="19" class="custom-control-input" value="medicine">
                        <label class="custom-control-label" for="19">Изучать вирусы</label>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="tenth" id="20" class="custom-control-input" value="it">
                        <label class="custom-control-label" for="20">Или обеспечивать защиту компьютерной информации</label>
                    </div>
                </div>

                <input class="btn btn-outline-primary" @click="Search()" type="submit" value="Завершить тест">
            </form>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
export default {
    name: 'RecommendedEvents',
    components: { Footer },
    methods:{
        Search(){
            event.preventDefault()
            let it = 0
            let eng = 0
            let med = 0
            let art = 0
            for(let i = 1; i <= 20; i++){
               if(document.getElementById(i).checked){
                   if(document.getElementById(i).value == 'it'){
                       it += 1
                   }
                   else if(document.getElementById(i).value == 'engineering'){
                       eng += 1
                   }
                   else if(document.getElementById(i).value == 'medicine'){
                       med += 1
                   }
                   else if(document.getElementById(i).value == 'art'){
                       art += 1
                   }
               }
            }
            if(it + eng + med + art != 10){
                //alert('Ответьте на все вопросы')
                this.$swal({
                    icon: 'error',
                    text: 'Ответьте на все вопросы'
                });
            }
            else{
                //alert('Ваши ответы: ' + ' It: ' + it + ' Инженерия: ' + eng + ' Медицина: ' + med  + ' Арт: ' + art  + ' Перейдите на страницу мероприятий и выберите, что Вам подходит!')
                this.$swal({
                    icon: 'success',
                    title: 'Результаты',
                    text: 'Ваши ответы: ' + ' It: ' + it + ' Инженерия: ' + eng + ' Медицина: ' + med  + ' Арт: ' + art  + ' Перейдите на страницу мероприятий и выберите, что Вам подходит!',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Перейти',
                    cancelButtonText: 'Отмена'
                }).then((result) => {
                    if (result.value) {
                        document.location.href = '/all-events'
                    }
                });
                //document.location.href = '/all-events'
            }
        }
    }
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

.formb{
    margin-top: 1.5em;
}
.chooseb{
    margin-bottom: 1em;
    font-size: 1.3em;
    text-align: left;
    padding: 0.2em;
    border: 1.5px solid #818181; /* Белая рамка */
    border-radius: 10px; /* Радиус скругления */
}
</style>