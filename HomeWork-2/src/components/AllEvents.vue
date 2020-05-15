<template>
    <div id="main" class="main"></div>
</template>

<script>
import needle from 'needle'
import cheerio from 'cheerio'

export default {
    name: 'AllEvents',
    mounted(){
        let mainDiv = document.querySelector('.main');


        let url_1 = "https://cors-anywhere.herokuapp.com/https://events.mosedu.ru/"; //Ссылка на ресурс
        needle.get(url_1,function(err,res){ 
            if(err) throw(err); //Если ошибка генерируем исключение
            let counter2 = 0; //Счетчик для заполнения массива
            let counter1 = 3; //Счетчик для прохода по всем кнопкам

            let arr = ['','','','','']; //Проходной массив для всех элементов события
            let mainArr = []; //Массив для хранения данных мероприятий

            let $ = cheerio.load(res.body); //Загрузка html кода страницы
            
            while ($('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(4)').text() != ''){ //Пока вызванное мероприятие не станет пустым делать
                arr[0] = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(4)').text(); //Загрузка названия
                let dopS = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(3)').text().slice(15); //Загрузка типа
                dopS = dopS.slice(0,dopS.length-4); //Обрезание
                arr[1] = dopS; //Заполнение
                dopS = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div:nth-child(2) table tbody tr td div').text(); //Загрузка даты и времени
                arr[2] = dopS.slice(0,5); //Заполнение даты
                arr[3] = dopS.slice(7,20); //Заполнение времени
                arr[4] = $('div[id = "events-list-block"] div:nth-child(' + String(counter1) + ') div').attr("onclick").slice(21); //Заполнение ссылки
                mainArr[counter2] = arr; //Добавление мероприятия в список

                counter1 +=  1; //Увеличение счетчиков
                counter2 += 1;

                arr = ['','','','','']; //Обнуление промежуточного массива
                
            }
            for(let i = 0; i < mainArr.length; i++){
                let newDiv = document.createElement('div')
                newDiv.innerHTML += '<b>' + 'Дата: ' + '</b>' + mainArr[i][2] + '</br>'
                newDiv.innerHTML += '<b>' + 'Время: ' + '</b>' + mainArr[i][3] + '</br>'
                newDiv.innerHTML += '<b>' + 'Название мероприятия: ' + '</b>' + mainArr[i][0] + '</br>'
                newDiv.innerHTML += '<b>' + 'Тип: ' + '</b>' + mainArr[i][1] + '</br>'
                newDiv.innerHTML += '<a href="' + mainArr[i][4] + '">' + 'Ссылка' + '</a>' + '</br>'
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
	padding: 80px 30px 0px 30px;
}
</style>