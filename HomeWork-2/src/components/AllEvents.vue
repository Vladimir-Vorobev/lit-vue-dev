<template>
    <div id="main" class="main"></div>
</template>

<script>
export default {
    name: 'AllEvents',
}
let needle = require("needle");
let cheerio= require("cheerio");

let counter2 = 0;
let counter1 = 3;
let url = "http://events.mosedu.ru/";

needle.get(url,function(err,res){
    let arr = ['','','',''];
    if(err) throw(err);

    let $ = cheerio.load(res.body);
    let mainArr = [];

    while ($('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(4)').text() != ''){
        arr[0] = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(4)').text();
        let dopS = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(3)').text().slice(15);
        dopS = dopS.slice(0,dopS.length-4);
        arr[1] = dopS;
        dopS = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(2) table tbody tr td div').text();
        arr[2] = dopS.slice(0,5);
        arr[3] = dopS.slice(7,20);
        
        mainArr[counter2] = arr;

        counter1 += 1;
        counter2 += 1;
        arr = ['','','',''];
    }    
    for(let i = 0; i < mainArr.length; i++){
        for(let j = 0; j < 4; j++){
            if(j == 0){
                document.getElementById("main").innerHTML += '<b>' + 'Название мероприятия: ' + '</b>' + mainArr[i][j] + '</br>'
            }
            else if(j == 1){
                document.getElementById("main").innerHTML += '<b>' + 'Тип: ' + '</b>' + mainArr[i][j] + '</br>'
            }
            else if(j == 2){
                document.getElementById("main").innerHTML += '<b>' + 'Дата: : ' + '</b>' + mainArr[i][j] + '</br>'
            }
            else if(j == 3){
                document.getElementById("main").innerHTML += '<b>' + 'Время: ' + '</b>' + mainArr[i][j] + '</br>'
            }
            
        }
        document.getElementById("main").innerHTML += '</br>' + '</br>' + '</br>'
        
    }
})
</script>

<style scoped>
.main{
	padding-top: 260px;
    text-align: left;
    padding-left: 30px;
}
</style>