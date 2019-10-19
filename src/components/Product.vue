<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-card class="elevation-3" width="90%">
            <v-toolbar  flat>
              <v-btn class="mt-3" @click="togglePanel()" rounded dark large color="primary">
                <v-icon dark>mdi-plus</v-icon>Novo
              </v-btn>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-text-field
                  v-model="search"
                  class="mt-5"
                  label="pesquisar"
                  prepend-icon="search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar-items>     
            </v-toolbar>
            <div class="flex-grow-1 my-5"></div>
            <v-expansion-panels v-model="panel" accordion inset>
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <form @submit.prevent="save">
                    <v-text-field v-model="product.name" :counter="50" label="Nome" required></v-text-field>
                    <v-text-field
                      v-model="product.price"
                      label="Preço"
                      @keyup="setFormat($event.target.value)"
                      required
                    ></v-text-field>
                    <v-text-field v-model="product.qnty" label="quantidade" required type="number"></v-text-field>
                    <v-textarea v-model="product.descr" label="descrição" required></v-textarea>
                    <v-btn class="mr-4" type="submit" color="success">salvar</v-btn>
                    <v-btn @click="clear" color="red" dark>Limpar</v-btn>
                    <v-icon class="float-right" @click="togglePanel()">mdi-close</v-icon>
                  </form>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="products"
                :items-per-page="10"
                :search="search"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="edit(item.id)">mdi-pencil</v-icon>
                  <v-icon small @click="remove(item.id)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from "../Model/Product";

export default {
  data: () => ({
    products: [],
    product: {},
    search: "",
    panel: "",

    headers: [
      { text: "nome", value: "name" },
      { text: "preço", value: "price" },
      { text: "quantidade", value: "qnty" },
      { text: "descrição", value: "descr" },
      { text: "editar/excluir", value: "actions", sortable: false }
    ]
  }),

  firestore: {
    products: Product.getAll()
  },

  methods: {
    edit(id) {
      Product.getProduct(id).then(doc => {
        this.product = doc.data();
        this.product.id = id;
      });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      this.panel = 0;
    },

    save() {
      if (!this.product.id) {
        Product.add(this.product).then(() => {
          alert("produto adicionado com sucesso");
        });
      } else {
        Product.update(this.product).then(() => {
          alert("produto atualizado com sucesso");
        });
      }

      this.clear();
    },

    remove(id) {
      if (confirm("deseja remover este produto?")) {
        Product.remove(id).then(() => {
          alert("produto deletado com sucesso");
        });
      }
    },

    setFormat(value) {
      let v = value.replace(/\D/g, "");
      v = (v / 100).toFixed(2) + "";
      v = v.replace(".", ",");
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
      v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
      value = v;
      this.product.price = "R$" + value;
    },

    clear() {
      this.product = {};
    },

    togglePanel() {
      this.panel = this.panel == 0 ? null : 0;
    }
  }
};
</script>
<style  scoped>
a {
  text-decoration: none;
}

.v-icon {
  cursor: pointer;
}
</style>
