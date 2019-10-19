import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from './router'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        isAuth: false,
        errorLog: null
    },

    getters: {
        auth(state) {
            return state.isAuth;
        }
    },

    mutations: {

        setUser(state, user) {
            state.user = user
        },

        setAuth(state, auth) {
            state.isAuth = auth
        },

        setErrorLog(state, error) {
            state.errorLog = error
        }
    },

    actions: {

        setNewUser({ commit }, { email, password, name }) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        user.updateProfile({ displayName: name });
                        commit('setErrorLog', null)
                        router.replace('/login')
                    }
                })
            }).catch((err) => {
                commit('setErrorLog', err)
            })
        },

        setLogin({ commit }, { email, password }) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    commit('setUser', user)
                    commit('setAuth', true)
                    commit('setErrorLog', null)
                    router.replace('/')
                }).catch(err => {
                    commit('setAuth', false)
                    commit('setErrorLog', err.message)
                })
        },

        unsetUser({ commit }) {
            firebase.auth().signOut().then(() => {
                commit('setAuth', false)
                router.replace('/login')
            }).catch(err => {
                commit('setErrorLog', err.message)
            });
        }
    }
})