<template>
    <div id="main" class="main"></div>
</template>

<script>
import needle from 'needle'
import cheerio from 'cheerio'
export default {
    name: 'AllEvents',
    mounted(){
        let counter2 = 0;
        let counter1 = 3;
        let url = "http://events.mosedu.ru/";
        let mainDiv = document.querySelector('.main');

        // найти ширину экрана, поделить на желаемую ширину блока вывода, прописать для main grid-template-columns

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
                let newDiv = document.createElement('div')
                newDiv.innerHTML += '<b>' + 'Дата: ' + '</b>' + mainArr[i][2] + '</br>'
                newDiv.innerHTML += '<b>' + 'Время: ' + '</b>' + mainArr[i][3] + '</br>'
                newDiv.innerHTML += '<b>' + 'Название мероприятия: ' + '</b>' + mainArr[i][0] + '</br>'
                newDiv.innerHTML += '<b>' + 'Тип: ' + '</b>' + mainArr[i][1] + '</br>'
                newDiv.innerHTML += '</br>' + '</br>' + '</br>'
                newDiv.classList.add('info')
                newDiv.style.textAlign = 'left'
                newDiv.style.padding = '10px'
                newDiv.style.margin = '5px'
                newDiv.style.borderStyle = 'solid'
                newDiv.style.borderRadius = '10px'
                newDiv.style.borderColor = 'black'
                newDiv.style.cursor = 'pointer'
                mainDiv.appendChild(newDiv)
            }
        })
    }
}

</script>

<style scoped>
.main{
    display: grid;
    grid-template-columns: auto auto auto;
	padding: 260px 30px 0px 30px;
}
.info:hower,
.info.hower{
    border-color: white;
}
</style>