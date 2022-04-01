<template>
  <div>
    <v-card
      v-for="it_ in options_"
      :key="it_.option"
      v-ripple
      :to="it_.link"
      class="mx-auto mt-3 btn"
      max-width="100%"
      color="#383838"
      dark
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 pt-5 mb-1">
            {{ it_.option }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ it_.desc }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions />
    </v-card>
  </div>
</template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options_: [
        { option: 'Conteúdo da secção 1', desc: 'Editar', link: '/EditSeccionOne' },
        { option: 'Conteúdo da secção 2', desc: 'Editar', link: '/EditSectionTwo' },
        { option: 'Conteúdo da Pagina de compras', desc: 'Editar', link: '/EditShopPage' },
        { option: 'Rodapé', desc: ' Imformacao do meu rodapé', link: '/footerMod' },
        { option: 'Configurações', desc: 'Modificar dados da conta', link: '/SettingsPage' }
      ]
    }
  }
}
</script>

<style>
 .btn {
     cursor: pointer;
 }
</style>
