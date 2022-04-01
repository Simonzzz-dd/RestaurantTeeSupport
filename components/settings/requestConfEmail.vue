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
              Alterar mensagem de email de confirmacao.
            </v-list-item-title>
            <v-list-item-subtitle>
              Adicione aqui a sua mensagem.
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
            Alterar Mensagem de Confirmacao
          </v-toolbar>
          <v-card-text>
            <br>
            <v-text-field
              v-model="ApiKey"
              label="Email"
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
              elevation="0"
              dark
              :loading="loading"
              color="#383838"
              @click="ChangeEmail(dialog)"
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
    async ChangeEmail (dialog) {
      this.loading = true
      const response = await Connection_.RequestMailMsg(this.ApiKey)
      console.log(response)
      dialog.value = false
      this.loading = false
    }
  }
}
</script>

<style>

</style>
