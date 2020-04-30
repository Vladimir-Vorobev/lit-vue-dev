<template>
    <div class="main">{{data}}</div>
</template>

<script>
import needle from "needle";
import cheerio from "cheerio";
export default {
    name: 'AllEvents',
    data(){
        var url = "http://events.mosedu.ru/";
        let data
        let Info = function(){
            needle.get(url,function(err,res){
                if(err) throw(err);

                var $ = cheerio.load(res.body);

                data = $(".event-block-blocks").text().split(/\s* \s* \s*/)
            });
            console.log(data)
            return{
                data
            }
        }
        
        console.log(Info())
        return{
           data
        }
    }
}
</script>

<style scoped>
.main{
	padding-top: 260px;
}
</style>