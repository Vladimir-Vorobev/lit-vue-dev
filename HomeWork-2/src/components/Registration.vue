<template>

    <div class="main">
        <form>
            <input v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Пароль">
            <button @click="addUser()">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import * as firebase from 'firebase';
require('firebase/auth')
export default {
    name: 'Registration',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      addUser() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
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