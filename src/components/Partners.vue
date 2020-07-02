<template>
    <div class="main">
        <div class="container warp">
            Если Вы являетесь директором или уполномоченным представителем учебного заведения и хотите стать нашем партнером, заполните эту форму, прикрепив подтверждающие документы из перечня
            <div class="form-group row" style="margin-top: 1em">
                <!-- <label for="exampleInputEmail1" style="text-align: left">Email адресс</label> -->
                <div class="col-12">
                    <input name="email" class="form-control" placeholder="example@gmail.com">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-12 col-md-7"> 
                    <input name="city" class="form-control city" placeholder="Город">
                </div>
                <div class="col-12 col-md-5"> 
                    <input name="school" class="form-control school" placeholder="Номер учебного заведения">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-12 col-md-6"> 
                    <select name="schoolType" class="custom-select custom-select-lg mb-3 schoolType">
                        <option selected>Тип учебного заведения</option>
                        <option value="школа">Школа</option>
                        <option value="колледж">Колледж</option>
                        <option value="университет">ВУЗ</option>
                    </select>
                </div>
            </div>
            <form enctype="multipart/form-data" method="post" name='file' id='form'>
            Файлы, подтверждающие Ваши права
                <input type="file" multiple accept="image/*"> 
            </form> 
            <div class="row"> 
                <button class="btn btn-primary btn-lg" @click="addUser()">Подать заявку</button>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import $ from 'jquery'
import Footer from './footer.vue'
export default {
    name: 'Parthners',
    components: { Footer },
    mounted(){
            
    },
    methods:{
        addUser(){
            event.preventDefault();
            var formData = new FormData($('#form')[0]);
            console.log(formData)
            $.ajax({
                url: 'http://79.143.29.112:3030/registration',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (returndata) {
                //alert(returndata);
                this.$swal(returndata);
                }
            });
        },
    },
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
</style>