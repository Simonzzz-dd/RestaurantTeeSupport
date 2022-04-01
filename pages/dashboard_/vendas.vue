<template>
<div>
    <h1 style="text-align: center">
      Vendas
    </h1>
    <div style="text-align: center" class="pb-4"> <small> A qui temos uma lista de clientes satisfeitos. Bom Trabalho. </small></div>
    

    <v-card elevation="0" width="100%">
  <v-data-table
    :headers="headers"
    :items="Sales"
    class="elevation-0"
  >
    <template v-slot:item.link="{ item }">
      <v-chip
        :to="item.link"
        color="#383838"
        dark
      >
        Ver Venda
      </v-chip>
    </template>
        <template v-slot:item.date="{ item }">

        {{ modDate( item.date ) }}

    </template>
    <template v-slot:item.total="{ item }">

        {{ Number(item.total).toFixed(2) + " Mzn"}}

    </template>
  </v-data-table>
      </v-card>
 

</div>

</template>

<script>
import Connection_ from '~/assets/serverConnection'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Nome do Cliente',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Ver dados da Venda', value: 'link',  sortable: false },
          { text: 'Date', value: 'date' },
          { text: 'Email', value: 'email' },
          { text: 'Total', value: 'total', align: 'right',sortable: true },
        ],
        Sales: [
          {
            name: '',
            link: "",
            date: "",
            email: "",
            total: "",
          },
        ],
      }
    },
    methods: {
      modDate ( date )  {
        let d = new Date( date )
        
        return d.toUTCString()
      }
    },
    async mounted ( ) {
      let Sales = []
      this.$store.dispatch('getAllSales_')
      let data = await Connection_.getAllSales()
      if ( data.sucess ) {
        data.sucess.forEach(( sale ) => {
          let d = new Date( sale.date)
          let saleTrans = {}
          saleTrans.name = sale.username
          saleTrans.email = sale.email
          saleTrans.link = "/sale/"+ sale._id
          saleTrans.total = sale.total
          saleTrans.date = d.getTime()
          Sales.push(saleTrans)
        })
        this.Sales = Sales
      }
    }
  }
</script>
<style lang="scss" scoped>
 
</style>