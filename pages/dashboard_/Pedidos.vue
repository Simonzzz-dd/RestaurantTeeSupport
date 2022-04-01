<template>
<div>
  <h1 style="text-align: center">
    Pedidos
  </h1>
  <div style="text-align: center" class="pb-8">
Aqui temos uma lista de clientes insatisfeitos. Vamos a nossa missão:</div>
  <div v-if="loading_products" style="height:80vh; display: flex; align-items: center; justify-content: center">
      <v-progress-circular
        :size="30"
        color="#383838"
        indeterminate
      />
  </div>
  <div  v-if="!loading_products" class="requestGrid">
    <v-card
        class="requestDetails"
        v-for="request in requests_" :key="request._id"
        elevation="0"
        color="#f7f7f7"
      >
      <v-banner elevation="0" dark style="margin-bottom: .5rem" color="#f7f7f7" >
          <b style="color: #383838">{{ request.username }}</b>
          <v-avatar
            color="#f7f7f7"  
            slot="icon"
            size="40"
          >
            <v-icon
            @click="DeleteRequest(request._id)"
              v-ripple
              icon="mdi-delete"
              color="#383838"
            >
              mdi-delete
            </v-icon>
          </v-avatar>

        </v-banner>
        <RequestsCarrousel :request="request" />
        <v-card-actions>
        <v-btn
          text
          @click="ApproveRequest(request._id)"
          class="mr-4"
          :disabled="request.approved"
        >
          {{ request.approved ? "aprovado" : "aprovar"}}
        </v-btn>
        <FulfillmentConfirmation :_id="request._id" :refresh="refresh"> </FulfillmentConfirmation>
        </v-card-actions>
      </v-card>
    </div>
    <div class="text-center ma-2">
        <v-snackbar
          :color="color"
          dark
          v-model="snackbar"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
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
import FulfillmentConfirmation from '~/components/dashboard/Requests/FulfillmentConfirmation.vue'
import Connection_ from '~/assets/serverConnection'
import RequestsCarrousel from '~/components/dashboard/Requests/RequestsCarrousel.vue'
export default {
  components: { FulfillmentConfirmation, RequestsCarrousel },
  data ( ) {
    return {
      snackbar: false,
      text: `Hello, I'm a snackbar`,
      color: "blue",
      requests_: [],
      loading_products: true,
    }
  },
  async mounted ( ) {

    await Connection_.getCookies()
    this.$store.dispatch('getAllSales_')
    let requests = await Connection_.getAllRequests()
    if ( requests.sucess ) {
      this.requests_ = requests.sucess
      this.loading_products = false
    }
  },
  methods: {
    async DeleteRequest (id ) {
      let delete_ = await Connection_.DeleteRequest( id )
      let requests = await Connection_.getAllRequests()
      if ( requests.sucess ) {
        this.requests_ = requests.sucess
      }
      console.log(delete_)
    },
    async ApproveRequest (id ) {
      let aproveRequest = await Connection_.approveRequest( id )
      let requests = await Connection_.getAllRequests()
      if ( requests.sucess ) {
        this.requests_ = requests.sucess
        this.snackbar = true
        this.text = "Aprovado com Sucesso"
        this.color = "blue"
      } else if ( requests.err ) {
        this.text = "erro"
        this.snackbar = true
        this.color = "red"
      }
      console.log(aproveRequest)
    },
    async refresh () {
      let requests = await Connection_.getAllRequests()
      if ( requests.sucess ) {
        this.requests_ = requests.sucess
        
      } 
    }
  }
}
</script>

<style lang="scss" scoped>

  .requestGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 350px));
    grid-gap: 1rem;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .requestDetails {
    width: 100%;
    max-width: 400px;
    border: solid #d7d7d7 1px;
  }


</style>