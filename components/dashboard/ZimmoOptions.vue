<template>
  <div>
    <div
      v-for="it_ in options_"
      :key="it_.option"
    >
      <v-card
        v-if="it_.condition()"
        v-ripple
        :to="it_.link"
        class="mx-auto mt-3 btn"
        max-width="344"
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
        <br>
      </v-card>
    </div>
    <br>
    <br>
  </div>
</template>
  </div>
</template>

<script>
import Cookies from 'js-cookie/dist/js.cookie.mjs'
import Connection_ from '~/assets/serverConnection'

export default {
  data () {
    return {
      options_: [

      ]
    }
  },
  mounted () {
    this.options_ = [{
      option: 'Analíticos',
      desc: 'Análise da minha produtividade.',
      link: '/dashboard_/',
      condition () {
        return true
      }
    },
    {
      option: 'Permissões',
      desc: 'Atribua uma função a cada membro da sua equipe.',
      link: '/dashboard_/Permissions',
      condition () {
        if (Cookies.get(Connection_.serverApiCode + 'Manager') === 'true') { return true } else {
          return false
        }
      }
    },
    {
      option: 'Lista de Clientes',
      desc: 'Veja informações sobre minha clientela.',
      link: '/dashboard_/ClientsList',
      condition () {
        if (Cookies.get(Connection_.serverApiCode + 'handleRequests') === 'true' || Cookies.get(Connection_.serverApiCode + 'manageMoney') === 'true' || Cookies.get(Connection_.serverApiCode + 'Manager') === 'true') { return true } else {
          return false
        }
      }
    },
    {
      option: 'Pedidos',
      desc: 'Ver os meus pedidos.',
      link: '/dashboard_/Pedidos',
      condition () {
        if (Cookies.get(Connection_.serverApiCode + 'handleRequests') === 'true' || Cookies.get(Connection_.serverApiCode + 'Manager') === 'true') { return true } else {
          return false
        }
      }
    },
    {
      option: 'Produtos',
      desc: 'Meus Produtos ou Serviços.',
      link: '/dashboard_/Produtos',
      condition () {
        if (Cookies.get(Connection_.serverApiCode + 'Manager') === 'true' || Cookies.get(Connection_.serverApiCode + 'addProduts') === 'true') { return true } else {
          return false
        }
      }
    },
    {
      option: 'Vendas',
      desc: 'Ver informação sobre minhas vendas.',
      link: '/dashboard_/vendas',
      condition () {
        if (Cookies.get(Connection_.serverApiCode + 'handleRequests') === 'true' || Cookies.get(Connection_.serverApiCode + 'manageMoney') === 'true' || Cookies.get(Connection_.serverApiCode + 'Manager') === 'true') { return true } else {
          return false
        }
      }
    },
    {
      option: 'Conteúdo da minha página',
      desc: 'Editar o Conteúdo Da minha Página.',
      link: '/dashboard_/PageContent',
      condition () {
        if (Cookies.get(Connection_.serverApiCode + 'Manager') === 'true') { return true } else {
          return false
        }
      }
    }]
  }
}
</script>

<style>
 .btn {
     cursor: pointer;
 }
</style>
