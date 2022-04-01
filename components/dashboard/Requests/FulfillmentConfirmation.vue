<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-btn

          color="#383838"
          elevation="0"
          dark
          v-bind="attrs"

          v-on="on"
        >
          Concluir
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          O Cliente ja recebeu o Produto?
        </v-card-title>
        <br>
        <v-card-text>
          Apos o cliente ter recebido o produto, a opcao "Concluir" e selecionada para armazenar o registar a venda como completa.
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="soldProducts(_id)"
          >
            Sim Ja
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
// import Connection_ from '~/assets/serverConnection'
export default {
  props: {
    _id: String,
    refresh: Function
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async soldProducts (id) {
      console.log(id)
      console.log(this.$props)
      const Products = await Connection_.SoldProducts(id)
      console.log(Products)
      this.dialog = false
      this._props.refresh()
    }
  }
}
</script>

<style>

</style>
