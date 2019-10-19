<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-5">
          <v-toolbar color="#41B883" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field 
                v-model="email" 
                :rules="emailRules" 
                label="E-mail" 
                required
                type="email"
                prepend-icon="email">
              </v-text-field>
              
              <v-text-field
                v-model="password"
                name="password"
                label="Senha"
                :rules="passwordRules"
                required
                type="password"
                prepend-icon="lock"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Entrar</v-btn>
            <v-btn color="error" class="mr-4" @click="reset">Limpar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert type="error"   class="pt-5" v-if="errors" dismissible>{{errors}}</v-alert>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "o campo E-mail é obrigatório",
      v => /.+@.+\..+/.test(v) || "E-mail dever ser válido"
    ],
    password: "",
    passwordRules: [
      v =>
        (v && v.length >= 6) ||
        "o campo senha deve conter no mínimo 6 caracteres"
    ]
  }),

  computed:{
    errors() {
      return this.$store.state.errorLog;
    }
  },

  methods:{
     validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$store.dispatch("setLogin", {
          email: this.email,
          password: this.password
        });

        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  }
};
</script>
