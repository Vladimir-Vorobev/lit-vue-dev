<template>
    <div id="text"></div>
</template>

<script>
export default {
    name: 'AllEvents',
}
let needle = require("needle");
let cheerio= require("cheerio");

let url = "http://events.mosedu.ru/";

needle.get(url,function(err,res){
  if(err) throw(err);

  let $ = cheerio.load(res.body);
  let string = $('.event-block-blocks').text()
  let re = /\s* \s* \s*/
  let data = string.split(re)
  for(let i = 1; i < data.length; i+=6){
      console.log('Дата мероприятия: ' + data[i])
      console.log('Время мероприятия: ' + data[i + 1])
      console.log('Свободные места: ' + data[i + 2])
      console.log('Для кого: ' + data[i + 3])
      console.log('Форма мероприятия: ' + data[i + 4])
      console.log('Название мероприятия: ' + data[i + 5])
  }
});
</script>

<style scoped>

</style>