<template>

    <div class="main">
        <h2>Регистрация</h2>
        <form>
            Имя*
            <input name="name" placeholder="Иван"><br>
            Фамилия*
            <input name="surname" placeholder="Иванов"><br>
            E-mail*
            <input name="email" placeholder="example@gmail.com"><br>
            Возраст*
            <input name="age" placeholder="15"><br>
            Пароль*
            <input type="password" name="password" placeholder="1234567"><br>
            Повторите пароль*
            <input type="password" name="password2" placeholder="1234567"><br>
            <button @click="addUser()">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import 'firebase/database'
//import { db } from '../main'
export default {
    name: 'Registration',
    methods: {
      addUser(){
        let form = document.forms[0]
        let name = form.elements.name.value
        let surname = form.elements.surname.value
        let email = form.elements.email.value
        let age = form.elements.age.value
        let password = form.elements.password.value
        let password2 = form.elements.password2.value
        if(name.trim() == ''){
          alert("Введите имя")
        }
        else if(surname.trim() == ''){
          alert("Введите фамилию")
        }
        else if(email.trim() == ''){
          alert("Введите email")
        }
        else if(age.trim() == ''){
          alert("введите возраст")
        }
        else if(password.trim() == ''){
          alert("Введите пароль")
        }
        else if(password != password2){
          alert("Пароли не совпадают")
        }
        alert(password)
        
      },
    }
  }


</script>

<style scoped>
.main{
    padding-top: 80px;
}
</style>