import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyCsldmvWwQ1hjyPZmLLzBQfycqxbZ6K-rs",
        authDomain: "vue-crud-3d280.firebaseapp.com",
        databaseURL: "https://vue-crud-3d280.firebaseio.com",
        projectId: "vue-crud-3d280",
        storageBucket: "gs://vue-crud-3d280.appspot.com/",
        messagingSenderId: "549502201257",
        appId: "1:549502201257:web:24c4052daaa2c6688368b8",
        measurementId: "G-D7HRG1LT07"
    })
    .firestore();