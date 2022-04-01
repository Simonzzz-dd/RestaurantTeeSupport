<template>
  <div>
    <v-card flat class="ma-0" tile elevation="0">
      <v-toolbar
        elevation="0"
        dark
        color="#383838"
        dense
      >
        <v-btn
          to="/dashboard_/PageContent"
          icon
          dark
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-spacer />
      </v-toolbar>
      <br>
      <h1 style="text-align: center">
        Shop Section Content
      </h1>
      <div style="text-align: center" class="pb-8">
        Editar informações da Secção
      </div>
      <v-divider />
      <div style="padding: 0 1rem">
        <br>
        <p> Editar Conteudo da Secção de Compras</p>

        <v-col cols="12">
          <v-text-field
            v-model="Titulo"
            filled
            label="Título"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="Paragrafo"
            filled
            label="Parágrafo"
            hide-details="auto"
          />
        </v-col>
        <br>
      </div>
    </v-card>
    <div class="ml-4 mt-6">
      <v-btn
        elevation="0"
        dark
        color="#383838"
        @click="submitForm()"
      >
        Actualizar
      </v-btn>
    </div>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar"
        :color="color"
        dark
      >
        {{ text }}

        <template #action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"

            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'

export default {

  data () {
    return {
      Titulo: '',
      Paragrafo: '',
      snackbar: false,
      text: 'Hello, I\'m a snackbar',
      color: 'blue',
      loading_: false

    }
  },
  async mounted () {
    await Connection_.getCookies()
  },

  methods: {

    async submitForm () {
      this.loading_ = true
      const editFooter = await Connection_.AddShopSectionMsg(this.Titulo, this.Paragrafo)
      if (editFooter.sucess) {
        setTimeout(() => { this.loading_ = false }, 300)
        this.snackbar = true
        this.text = 'Actualizado'
        this.color = 'blue'
      } else {
        setTimeout(() => { this.loading_ = false }, 300)
        this.snackbar = true
        this.text = 'Erro'
        this.color = 'red'
      }
      return ''
    }
  }
}
</script>
<style>

</style>
