<template>
  <div>
    <h1 style="text-align: center">
      Análise de Dados
    </h1>
    <div style="text-align: center" class="pb-8">
      Um breve resumo da minha produtividade.
    </div>
    <div class="analiticsGrid">
      <AnaliticChart />
      <v-card
        class="mx-auto"
        style="width: 100%"
        elevation="0"
      >
        <v-card-text>
          <div> Cliente do Mes </div>
          <p class="text-h4 text--primary">
            {{ bestCostumer.username }}
          </p>
          <p> Total de Compras: {{ Number(bestCostumer.total).toFixed(2) }} Mzn <br> Email: {{ bestCostumer.email }}</p>
        </v-card-text>

        <v-card-text>
          <div> {{ Number(thisYearAverage).toFixed(2) }} Mzn média de vendas por mês<br> do ano corrente </div>
          <p class="text-h4 text--primary">
            Média de vendas
          </p>
        </v-card-text>
        <v-divider />
        <v-card-text>
          <div> Controle </div>
          <p class="text-h4 text--primary">
            Data Transfer
          </p>
          <v-progress-circular
            :rotate="360"
            :size="150"
            :width="15"
            :value="usage"
            color="#fba700"
          >
            {{ Math.round(website.currentDataTransfer/1000).toFixed(2) }}GB /{{ website.MaxDataTransfer/1000 }}GB
          </v-progress-circular>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import AnaliticChart from './AnalitictChart.vue'
import Connection_ from '~/assets/serverConnection'
export default {
  components: {
    AnaliticChart
  },
  data () {
    const years = []
    let d = new Date().getFullYear()
    for (let i = 0; i < 15; i++) {
      years.push(d--)
    }
    return {
      year: new Date().getFullYear(),
      years,
      thisYearAverage: 0,
      bestCostumer: {

      },
      website: {},
      usage: 0
    }
  },
  async mounted () {
    const website = await Connection_.getWebsite()
    if (website.sucess) {
      this.website = website.sucess
      this.usage = (website.sucess.currentDataTransfer / website.sucess.MaxDataTransfer) * 100
    } else {
      this.website = {
        MaxDataTransfer: 0, currentDataTransfer: 0
      }
    }

    // to calculate the median sales for this year ------------------------------
    const months = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const Sales = await Connection_.getAllSales()
    if (Sales.sucess) {
      const AllData = []
      Sales.sucess.forEach((data) => {
        const d = new Date(data.date)
        const DataMod = {
          mounth: months[d.getMonth()],
          total: data.total,
          year: d.getFullYear()
        }

        AllData.push(DataMod)
      })

      // select year, tranform AllData
      const thisYearMounthsAndTotals = []
      months.forEach((mounth) => {
        const m = {}
        m[mounth] = 0
        thisYearMounthsAndTotals.push(m)
      })

      // add to the transformed array
      AllData.forEach((data) => {
        if (data.year === this.year) {
          thisYearMounthsAndTotals.forEach((mounthNtotal, i) => {
            const mounth_ = Object.keys(mounthNtotal)

            if (data.mounth === mounth_[0]) {
              mounthNtotal[mounth_[0]] += data.total
            }
          })
        }
      })
      // const thisYearMouths = thisYearMounthsAndTotals.map(data => Object.keys(data)[0])
      const thisYearTotals = thisYearMounthsAndTotals.map(data => Object.values(data)[0]).slice(0, new Date().getMonth() + 1)
      let totalSales = 0
      thisYearMounthsAndTotals.forEach((data) => { totalSales += Object.values(data)[0] })
      const thisYearAverage = totalSales / thisYearTotals.length
      this.thisYearAverage = thisYearAverage
    }
    // to calculate the best Client ----------------------------------
    const clients = await Connection_.getAllClients()
    if (clients.sucess) {
      const newClientsArray = clients.sucess.map((data) => {
        const Client = {
          username: data.username,
          email: data.email,
          total: 0
        }
        data.purchises.forEach((ele) => {
          Client.total += ele.total
        })
        return Client
      })

      const CostumerTotals = newClientsArray.map(ele => ele.total)
      const maxTotal = Math.max(...CostumerTotals)

      const foundBestCost = newClientsArray.find(element => element.total === maxTotal)
      this.bestCostumer = foundBestCost
    }
  }
}
</script>

<style>
 .analiticsGrid {
   display: grid;
   grid-template-columns: 2fr 1fr;
   grid-gap: 1rem;
 }

 @media ( max-width: 897px ) {
    .analiticsGrid {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1rem;
    }
 }
</style>
