<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-5">
          <v-toolbar color="#41B883" dark flat>
            <v-toolbar-title>Cadastrar-se</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field 
                v-model="name" 
                :rules="nameRules" 
                label="Nome" 
                prepend-icon="person"
                required>
              </v-text-field>

              <v-text-field 
                v-model="email" 
                :rules="emailRules" 
                label="E-mail" 
                prepend-icon="email"
                required>
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
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Criar conta</v-btn>
            <v-btn color="error" class="mr-4" @click="reset">Limpar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert class="py-5" type="error" v-if="errors" dismissible>{{errors}}</v-alert>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [v => !!v || "o campo nome é obrigatório"],
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

  computed: {
    errors() {
      return this.$store.state.errorLog;
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$store.dispatch("setNewUser", {
          email: this.email,
          password: this.password,
          name: this.name
        });

        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>