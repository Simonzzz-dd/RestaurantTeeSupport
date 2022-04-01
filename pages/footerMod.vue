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
        Rodapé
      </h1>
      <div style="text-align: center" class="pb-8">
        Editar informações do rodapé
      </div>
      <v-divider />
      <div style="padding: 0 1rem">
        <br>
        <p> Adicione links às suas redes sociais</p>
        <v-col cols="12">
          <v-text-field
            v-model="insta"
            filled
            label="Instagram"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="twitter"
            filled
            label="Twitter"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="pint"
            filled
            label="Pinterest"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="facebook"
            filled
            label="Facebook"
            hide-details="auto"
          />
        </v-col>
        <br>
        <v-divider />
        <br>
        <p>
          Conteúdo do cabeçalho
        </p>
        <div style="padding: 0 1rem">
          <v-textarea
            v-model="content"
            filled
            label="Conteúdo"
          />
          <v-btn
            elevation="0"
            color="#dddddd"
            :loading="loading_"
            :disabled="loading_"
            @click="submitForm"
          >
            Actualizar
          </v-btn>
          <br>
          <br>
          <br>
        </div>
      </div>
    </v-card>
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
      pint: '',
      insta: '',
      content: '',
      facebook: '',
      twitter: '',
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
      const editFooter = await Connection_.footerContent(this.pint, this.insta, this.twitter, this.facebook, this.content)
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
