<template>

    <div class="main">
        <form>
            <input v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Пароль">
            <button @click="addUser()">Зарегистрироваться</button>
        </form>
        <form class='form'>
          <h2>Add name and surname</h2>
          <input name="one" placeholder="Имя" class="input" required>
          <input name="two" placeholder="Фамилия" class="input" required>
          <button @click="addData()">Добавить</button>
        </form>
    </div>
</template>

<script>
import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/database'
import { db } from '../main'
export default {
    name: 'Registration',
    data() {
      return {
        email: '',
        password: '',
        name: '',
        surname: '',
      }
    },
    firestore () {
      return {
        comics: db.collection('comics').orderBy('createdAt')
      }
    },
    methods: {
      addUser() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
      });
      },
      addData(){
        let form = document.forms[1]
        db.collection("users").add({
            name: form.elements.one.value,
            surname: form.elements.two.value
        })
        .then(function(docRef) {
            alert("Document written with ID: ", docRef.id)
        })
        .catch(function(error) {
            alert("Error adding document: ", error)
        });
      }
    }
  }


</script>

<style scoped>
.main{
    padding-top: 260px;
}
</style>