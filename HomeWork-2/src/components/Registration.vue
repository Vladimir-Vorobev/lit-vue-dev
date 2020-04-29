<template>
    <div class="main">
        <form @submit="addLocation(name, surname, email)">
            <input v-model="name" placeholder="Location Name">
            <input v-model="surname" placeholder="Location Surname">
            <input v-model="email" placeholder="Location Email">
            <button type="submit">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import { db } from '../main'
export default {
    name: 'Registration',
    data () {
        return {
            name: "",
            surname: "",
            email: ""
        }
    },
    methods: {
        addLocation (name, surname, email) {   
            db.collection('registration').add({ name, surname, email })
        }
    }
}

</script>

<style scoped>

</style>