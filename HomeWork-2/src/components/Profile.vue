<template>

    <div class="main">
        <h2>Профиль</h2>
        <form>
            Имя
            <input name="name" placeholder="Иван"><br>
            Фамилия
            <input name="surname" placeholder="Иванов"><br>
            E-mail
            <input v-model="email" name="email" placeholder="example@gmail.com"><br>
            Возраст
            <input name="age" placeholder="15"><br>
            Новый пароль
            <input type="password" v-model="password" name="password" placeholder="1234567"><br>
            Повторите пароль
            <input name="password2" placeholder="1234567"><br>
            Город
            <input name="city" placeholder="Москва"><br>
            Номер учебного заведения
            <input name="school" placeholder="1234"><br>
            Тип учебного заведения<br>
            <input type="radio" name="school">Школа<br>
            <input type="radio" name="college">Колледж<br>
            <input type="radio" name="university">ВУЗ<br>
            Роль в учебном заведении<br>
            <input type="radio" name="student">Ученик<br>
            <input type="radio" name="teacher">Учитель<br>
            <input type="radio" name="director">Директор<br>
            Класс<br>
            Номер
            <input name="class_number" placeholder="8"><br>
            Символ
            <input name="simvol" placeholder="И"><br>
            Добавить портфолио<br>
            <input type="file" name="portfolio" multiple accept="image/*">
            <button @click="updateUser()">Сохранить</button><br><br><br>
        </form>
        <div>
            <button @click="addNumber()">Создать уникальный номер</button><br>
            Этот номер необходим, если Вы хотите делиться своей статистикой с другими пользователями, например, с родителями или друзьями. Внимание: предоставляйте этот номер только тем, кому Вы доверяете<br>
            <router-link to="/statistics">Посмотреть статистику знакомых</router-link><br>
        </div>
    </div>
</template>

<script>
//import 'firebase/database'
//import { db } from '../main'
export default {
    name: 'Profile',
    data() {
      return {
        email: '',
        password: '',
        name: '',
        surname: '',
      }
    },
    methods: {
      addData(){
        //let form = document.forms[1]
        //db.collection("users").add({
           // name: form.elements.one.value,
            //surname: form.elements.two.value
        //})
      },
    }
  }


</script>

<style scoped>
.main{
    display: flex;
    padding-top: 80px;
}
</style>