<template>
  <v-container style="max-width: 1500px; padding:0; margin: 0 auto">
    <v-card
      class="mx-auto"
      tile
      flat
      elevation="0"
    >
      <v-toolbar
        dark
        dense
        color="#383838"
        elevation="0"
      >
        <v-btn
          to="/dashboard_/vendas"
          icon
          dark
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            {{ sale.username }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ sale.email }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ sale.date }} {{ sale.location }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Disconto
              </th>
              <th class="text-left">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in products_"
              :key="item._id"
            >
              <td>{{ item.productName }}</td>
              <td>{{ item.discount }}%</td>
              <td>{{ item.price }}.00 Mzn</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style="border-top: 1px solid #dddddd">
                <b> Total </b>
              </td>
              <td style="border-top: 1px solid #dddddd" />
              <td style="border-top: 1px solid #dddddd">
                <b> {{ sale.total }} </b>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
export default {
  data () {
    return {
      products_: [
        {
          _id: 0,
          productName: 'None',
          price: 0,
          discount: 0
        }
      ],
      sale: {
        email: '',

        username: '',
        location: '',
        date: '',
        total: 0
      }
    }
  },
  async mounted () {
    const sale = await Connection_.getSale(this.$route.params.id)
    if (sale.sucess) {
      this.products_ = sale.sucess.products
      this.sale = sale.sucess
      console.log(sale.sucess)
    }
  }
}
</script>

<style>

</style>
