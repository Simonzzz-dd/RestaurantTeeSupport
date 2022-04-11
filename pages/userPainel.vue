<template>
  <div style="background-color: #fefefe ">
    <v-container style="max-width: 1500px; padding:0; margin: 0 auto">
      <div class="userPainel" style="background-color: #fefefe ">
        <v-card elevation="0" class="pa-4 main-c" color="#fefefe" max-width="100vw">
          <h1 style="text-align: center; margin-top: 2rem">
            Painel Do Cliente
          </h1>
          <br>
          <br>
          <h4>Minhas Compras</h4>
          <br>
          <MinhasCompras :user="user" />
          <br><br>
          <h4>Pedidos</h4>
          <PedidosUsuario :requests_="requests_" />
        </v-card>
        <DataGrid :user="user" />
      </div>
    </v-container>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
import DataGrid from '~/components/UserPainel/dataGrid.vue'
import MinhasCompras from '~/components/UserPainel/minhasCompras.vue'
import PedidosUsuario from '~/components/UserPainel/pedidosUsuario.vue'
export default {
  components: { DataGrid, PedidosUsuario, MinhasCompras },
  data () {
    return {
      requests_: [],
      user: {
        Balance: 0
      }
    }
  },
  async mounted () {
    const data = await Connection_.getRequests()
    if (data.sucess) {
      this.requests_ = data.sucess
      data.sucess.forEach((ele, i) => {
        // eslint-disable-next-line no-unused-vars
        let total_ = 0
        ele.products.forEach((product) => {
          total_ += product.price - product.price * (product.discount / 100)
        })
        this.requests_[i].total = total_
      })
    }

    const purch = await Connection_.getClientDataAndPursh()
    console.log(purch)
    if (purch.sucess) {
      this.user = purch.sucess
    }
  }
}
</script>

<style>
.userPainel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, max-content));
  grid-gap: .5rem;
  padding: 1rem;

}
  @media ( max-width: 1700px ) {

    .main-c {
      min-width: 70vw;
    }

  }
  @media ( max-width: 900px ) {

    .userPainel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, max-content));
      grid-gap: .5rem;
      padding: 1rem;
    }

  }

  @media ( max-width: 500px ) {
  .rm-small{
    display: none;
  }

  }

</style>
