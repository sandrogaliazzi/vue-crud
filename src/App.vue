<template>
  <v-app>
    <AppNav/>
    <v-content class="grey lighten-3" style="padding: 56px 0px 36px;">
      <router-view></router-view>
    </v-content>
    <v-footer
      color="#41B883"
      app
    >
      <span class="white--text">&copy; Cimol {{date}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppNav from './components/AppNav';


export default {
  name: 'App',
  components: {
    AppNav,
  },
  data: () => ({
    date:'',
  }),

  mounted(){
    this.setDate();
  },

  methods:{
    setDate(){
      setInterval(()=>{
        this.date = new Date().toLocaleString('pt-BR');
      },1000)
    }
  }
}
</script>

