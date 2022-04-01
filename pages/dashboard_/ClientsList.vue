<template>
<div>
    <h1 style="text-align: center">
      Clientes
    </h1>
    <div style="text-align: center" class="pb-8"> Temos os clientes inscritos em sua página abaixo.</div>
    <v-container style="max-width: 1500px; padding:0; margin: 0 auto">
    <div v-if="loading_products" style="height:80vh; display: flex; align-items: center; justify-content: center">
      <v-progress-circular
        :size="30"
        color="#383838"
        indeterminate
      />
    </div>
    <div  v-if="!loading_products" class="clientsGrid">
    <v-card
      v-for="client in clients"
      :key="client._id"
      class="client"
      dark
      elevation="0"
      color="#383838"
    >
      <v-card-title> {{ client.username }} </v-card-title>
      <v-card-subtitle> {{ client.email }}</v-card-subtitle>
      <v-card-text style="color: white"> 
        Enrolled at: 20 June 2020 <br>
        Balance: {{ Number(client.Balance).toFixed(2) }} Mzn <br>
        phoneNumber: {{ client.phoneNumber }}
      </v-card-text>  
      <v-card-subtitle> <h3 style="color: white"> Compras: </h3></v-card-subtitle>
      <div class="compras pa-4 pt-0">
        <div class="vendas"  v-for="purchise in client.purchises" :key="purchise._id">
          Data: {{ purchise.date }} <br><br>
          Total: {{ Number(purchise.total).toFixed(2) }}mzn <br>
        </div>
      </div>
      <AddBalance :id="client._id" :refresh="refreshClientData" />
    </v-card>
    </div>
    </v-container>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
import AddBalance from '~/components/dashboard/clientList/addBalance.vue'
export default {
  components: { AddBalance },
  data ( ) {
    return {
      clients: [],
      loading_products: true,
    }
  },
  async mounted ( ) {

    await Connection_.getCookies()
    let clients = await Connection_.getAllClients()
    if ( clients.sucess ) {
      this.clients = [...clients.sucess]
      this.loading_products = false
    }
  },
  methods: {
    async refreshClientData ( ) {
      this.loading_products = true
      let clients = await Connection_.getAllClients()
      if ( clients.sucess ) {
        this.clients = [...clients.sucess]
        this.loading_products = false
      }
    }
  }
}
</script>

<style>
  .clientsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
    grid-gap: 1rem;
    justify-content: center;
  }

  .client {
    max-width: 20rem;
  }
  .compras {
    background-color: #383838;
    width: 100%;
    max-width: 20rem;
    display: flex;
    overflow-x: auto;
    overflow-y: none;
  }
  .vendas {
    width: 200px;
    min-width: 200px;
    margin: 0 1rem;
    border-right: solid white 3px;
    padding: 1rem;
    margin-top: 1rem;
  }
</style>