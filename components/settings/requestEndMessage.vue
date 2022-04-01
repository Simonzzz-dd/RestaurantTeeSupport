
<template>
  <div>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-list-item v-ripple v-bind="attrs" v-on="on">
          <v-list-item-content>
            <v-list-item-title>
              Mensagem sobre informação do procedimento após pedido
            </v-list-item-title>
            <v-list-item-subtitle>
              Adicione aqui sua informação.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template #default="dialog">
        <v-card>
          <v-toolbar
            color="primary"
            dark
            elevation="0"
          >
            Mensagem sobre informação do procedimento após pedido
          </v-toolbar>
          <v-card-text>
            <br>
            <v-textarea
              v-model="ApiKey"
              label="Informação do procedimento após pedido"
              clearable
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="dialog.value = false"
            >
              Fechar
            </v-btn>
            <v-btn
              :loading="loading"
              elevation="0"
              dark
              color="#383838"
              @click="addRequestEndMessage(dialog)"
            >
              salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
export default {
  data () {
    return {
      ApiKey: '',
      loading: false
    }
  },
  methods: {
    async addRequestEndMessage (dialog) {
      this.loading = true
      const addMsg = await Connection_.AprovedRequestMsg(this.ApiKey)
      console.log(addMsg)
      dialog.value = false
      this.loading = false
    }
  }
}
</script>

<style>

</style>
