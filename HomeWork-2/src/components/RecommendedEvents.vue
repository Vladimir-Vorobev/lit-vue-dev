<template>
    <div class="main container">
        <h4>Выберите одно из двух, то что вам больше нравиться</h4>
        <form class="formb">
            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="f" id="1" class="custom-control-input" value="medicine">
                    <label class="custom-control-label" for="1">Лечить людей</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="f"  id="2" class="custom-control-input" value="engineering">
                    <label class="custom-control-label" for="2">Или чинить электронику</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="2" id="3" class="custom-control-input" value="it">
                    <label class="custom-control-label" for="3">Писать програмы</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="2" id="4" class="custom-control-input" value="engineering">
                    <label class="custom-control-label" for="4">Или Разбираться в чертежах и что-то изготавливать по ним</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="3" id="5" class="custom-control-input" value="art">
                    <label class="custom-control-label" for="5">Рисовать картины</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="3" id="6" class="custom-control-input" value="it">
                    <label class="custom-control-label" for="6">Или сидеть за компьютером и разрабатывать что-то</label>
                </div> 
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="4" id="7" class="custom-control-input" value="art">
                    <label class="custom-control-label" for="7">Лепить из глины</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="4" id="8" class="custom-control-input" value="engineering">
                    <label class="custom-control-label" for="8">Или паять радиосхемы</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="5" id="9" class="custom-control-input" value="medicine">
                    <label class="custom-control-label" for="9">Помогать раненым</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="5" id="10" class="custom-control-input" value="art">
                    <label class="custom-control-label" for="10">Или писать книгу о войне</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="6" id="11" class="custom-control-input" value="engineering">
                    <label class="custom-control-label" for="11">Изготавливать протезы</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="6" id="12" class="custom-control-input" value="medicine">
                    <label class="custom-control-label" for="12">Или рабоать хирургом</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="7" id="13" class="custom-control-input" value="it">
                    <label class="custom-control-label" for="13">Разрабатывать сайты</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="7" id="14" class="custom-control-input" value="art">
                    <label class="custom-control-label" for="14">Или создавать модную одежду</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="8" id="15" class="custom-control-input" value="it">
                    <label class="custom-control-label" for="15">Создавать искусственный интеллект</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="8" id="16" class="custom-control-input" value="engineering">
                    <label class="custom-control-label" for="16">Или проектировать и создавать роботов</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="9" id="17" class="custom-control-input" value="medicine">
                    <label class="custom-control-label" for="17">Быть нейрохирургом</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="9" id="18" class="custom-control-input" value="art">
                    <label class="custom-control-label" for="18">Или дизайнером</label>
                </div>
            </div>

            <div class="chooseb">
                <div class="custom-control custom-radio">
                    <input type="radio" name="10" id="19" class="custom-control-input" value="medicine">
                    <label class="custom-control-label" for="19">Изучать вирусы</label>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" name="10" id="20" class="custom-control-input" value="it">
                    <label class="custom-control-label" for="20">Или обеспечивать защиту информации в компьютере</label>
                </div>
            </div>

            <input class="btn btn-outline-primary" @onclick="Search()" type="submit" value="Завершить тест">
        </form>
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
    padding-top: 110px !important;
}
.main{
    background-color: #fff;
    height: 100%;
    padding: 30px;
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