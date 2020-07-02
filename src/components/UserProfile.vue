<template>
    <div class="main">
        <div class="container warp">
            <div class="person_info row">
                <div class="photo col-12 col-md-4 pblock">
                    <div class="avatar">
                        <img src="./../assets/test.jpeg" alt="">
                    </div>
                    <button class="btn btn-light" style="width: 100%; margin-top: 15px">Редактировать</button>
                </div>
                <div class="col-12 col-md-7 pblock" style="padding-bottom: 0px">
                    <div class="row">
                        <div class="col-10"><h4 style="margin-bottom: 0px;">Иванов Иван</h4></div>
                        <div class="col-2">
                            <small class="text-muted" style="vertical-align: bottom;">online</small>
                        </div>
                    </div>
                    <hr style="margin-top: 3px;">
                    <div class="info">
                        <div class="row">
                            <div class="col-6 text-muted">Дата рождения: </div>
                            <div class="col-6">1 января 2004</div>
                        </div>
                    </div>
                    <div style="border-top: 1px solid lightgray; margin-top: 150px; margin-right: -20px; margin-left: -20px">
                        <div class="row container" style="padding: 0px 20px;">
                            <div class="col-6" style="height: 100%; padding: 15px 0px;">
                                <div style="font-size: 22px; color: #2a5885; padding-bottom: 3px; line-height: 21px; cursor: pointer;">22</div>
                                <div style="line-height: 15px; color: #828282;">друга</div>
                            </div>
                            <div class="col-6" style="height: 100%; padding: 15px 0px;">
                                <div style="font-size: 22px; color: #2a5885; padding-bottom: 3px; line-height: 21px; cursor: pointer;">30</div>
                                <div style="line-height: 15px; color: #828282;">мероприятий</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"><Footer></Footer></div> 
    </div>
</template>

<script>
import Footer from './footer.vue'
export default {
    name: 'UserProfile',
    components: { Footer },
}
</script>

<style scoped>
.warp{
    flex: 1 0 auto;
}
.footer{
    flex: 0 0 auto;
}
.main{
    display: flex;
	flex-direction: column;
    padding-top: 95px !important;
}
.main{
    height: 100%;
    padding: 30px 0px 0px;
    min-height: 100vh;
    margin-bottom: 0px;
}

.pblock{
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    margin: 0.2em;
    border-radius: 4px;
    -webkit-box-shadow: 0px 2px 5px 1px rgba(34, 60, 80, 0.18);
    -moz-box-shadow: 0px 2px 5px 1px rgba(34, 60, 80, 0.18);
    box-shadow: 0px 2px 5px 1px rgba(34, 60, 80, 0.18);
    min-height: 300px;
    padding: 15px 20px;
}

.avatar{
    height: 100%;
    height: 100%;
}

.avatar img{
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
}

</style>