import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import db from './firebase/databaseConfig'

Vue.use(firestorePlugin)


Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
    new Vue({
        router,
        vuetify,
        store,
        render: h => h(App)
    }).$mount('#app')
})