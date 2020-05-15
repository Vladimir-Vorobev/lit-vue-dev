<template>

    <div class="main">
        <h2>Войти</h2>
        <form>
            E-mail
            <input v-model="email" name="email" placeholder="example@gmail.com"><br>
            Пароль
            <input name="password" placeholder="1234567"><br>
            <button @click="addUser()">Войти</button>
        </form>
        <p>Еще не зарегистрировались? <router-link to="/registration">Создать аккаунт</router-link></p>
    </div>
</template>

<script>
import 'firebase/database'
import { db } from '../main'
export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    firestore () {
      return {
        comics: db.collection('comics').orderBy('createdAt')
      }
    },
    methods: {
      addData(){
        let form = document.forms[1]
        db.collection("users").add({
            name: form.elements.one.value,
            surname: form.elements.two.value
        })
      },
      findData(){
        db.collection("users").where("name", "==", "Владимир").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let docId = doc.id
                //let docData = doc.data()
                return docId
            });
        })
      },
      deliteData(){
        let docId = this.findData()
        alert(docId)
        db.collection("users").doc(docId).delete()
      },
      updateData(){
        db.collection("users").doc("zujwIPpTGKaY3oqyM0V1")
      }
    }
  }


</script>

<style scoped>
.main{
    padding-top: 80px;
}
</style>