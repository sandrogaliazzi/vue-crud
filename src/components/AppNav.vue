<template>
  <v-container>
    <v-navigation-drawer color="#FF6347" dark temporary v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="value in drawerLinks" :key="value.text" router :to="value.route">
          <v-list-item-action>
            <v-icon>{{value.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{value.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#41B883" flat dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">VUEJS</span>
        <span class="font-weught-regular">CRUD</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="this.$store.getters.auth">
        <v-menu open-on-hover offset-y bottom left>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              {{user.displayName}}
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="signOut()">
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-sm-and-down">
        <v-btn text router to="login">Login</v-btn>
        <v-btn text router to="register">Cadastrar-se</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    },

    drawerLinks() {
      if (this.$store.getters.auth) {
        return [
          { text: "home", icon: "mdi-home", route: "/" },
          { text: "sobre", icon: "mdi-information", route: "/about" }
        ];
      } else {
        return [
          { text: "login", icon: "mdi-login", route: "/login" },
          { text: "cadastrar-se", icon: "mdi-account", route: "/register" },
          { text: "sobre", icon: "mdi-information", route: "/about" }
        ];
      }
    }
  },

  methods: {
    signOut() {
      this.$store.dispatch("unsetUser");
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>