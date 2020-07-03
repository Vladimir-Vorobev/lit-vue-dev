<template>
    <div class="main">
        <div class="container warp">
            <div class="row">
                <div class="col-1">
                    <button class='btn btn-light' @click="backinprofile()"><i class="fas fa-arrow-left"></i></button>
                </div>
                <div class="col-11">
                    <h3>Редактирование профиля:</h3>
                </div>
            </div>
            <div class="row" style="margin-top: 30px;">
                <div class="col-12 col-md-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Имя</span>
                        </div>
                        <input type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon2">Фамилия</span>
                        </div>
                        <input type="text" class="form-control" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
            <div class="row" style="margin-bottom: 20px">
                <div class="col-12">
                    <input type="date" class="form-control age" name="age" min="1900-01-01">
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">@</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Короткое имя" aria-label="Короткое имя" aria-describedby="basic-addon3">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">Школа</span>
                        </div>
                        <input type="text" class="form-control" aria-describedby="basic-addon3">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Класс</span>
                        </div>
                        <input type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon2">Символ</span>
                        </div>
                        <input type="text" class="form-control" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
import Vue from 'vue';
export default {
    name: 'UserProfileEditor',
    components: { Footer },

    methods: {
        backinprofile(){
            //надо сделать переход назад к профилю пользователя, пока тут alert
            Vue.swal({
                icon: 'error',
                text: 'Функция временно не доступна!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
        },
    }
}
</script>

<style scoped>
.warp{
    flex: 1 0 auto;
    padding-top: 150px !important;
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


</style>