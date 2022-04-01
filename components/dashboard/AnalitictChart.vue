<template>
  <v-card
    class="mx-auto text-center"
    color="#f7f7f7"
    max-width="90vw"
    elevation="0"
    height="100%"
    width="100%"
  >
    <v-col
      class="d-flex"
      cols="12"
      sm="6"
    >
      <v-select
        v-model="year"
        :items="years"
        filled
        label="Selecionar Ano"
        @change="refresh()"
      />
    </v-col>
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, 0)" style="display: flex; justify-content: center">
        <canvas id="myChart" class="q-ma-md" width="90%" style=" max-width: 95%;" />
      </v-sheet>
    </v-card-text>
    <br>
    <br>
    <v-list-item three-line style="justify-content: center">
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ Number(BestSale).toFixed(2) }} Mzn
        </v-list-item-title>
        <v-list-item-subtitle> Total do melhor mês<br> de vendas deste este ano.</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ Number(totalSales).toFixed(2) }} Mzn
        </v-list-item-title>
        <v-list-item-subtitle>Receitas totais deste ano<br> na empresa</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ bestMounth }}
        </v-list-item-title>
        <v-list-item-subtitle>Melhor mês de vendas <br>deste ano</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <br>
  </v-card>
</template>
<script>
import Chart from 'chart.js/auto'
// import Connection_ from '~/assets/serverConnection'
export default {
  data () {
    const years = []
    let d = new Date().getFullYear()
    for (let i = 0; i < 15; i++) {
      years.push(d--)
    }
    return {
      year: new Date().getFullYear(),
      years,
      thisYearTotals: [],
      thisYearMouths: [],
      totalSales: 0,
      bestMounth: '',
      BestSale: 0
    }
  },
  mounted () {
    // ------------- Organizing the data
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const Sales = { sucess: this.$store.state.sales }
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
      const thisYearMouths = thisYearMounthsAndTotals.map(data => Object.keys(data)[0])
      const thisYearTotals = thisYearMounthsAndTotals.map(data => Object.values(data)[0])
      let totalSales = 0
      thisYearMounthsAndTotals.forEach((data) => { totalSales += Object.values(data)[0] })
      const BestSale = Math.max(...thisYearTotals)
      // eslint-disable-next-line array-callback-return
      let bestMounth = ''
      thisYearMounthsAndTotals.forEach((data, i) => {
        if (Object.values(data)[0] === BestSale) {
          bestMounth = Object.keys(data)[0]
        }
      })

      this.BestSale = BestSale
      this.bestMounth = bestMounth
      this.totalSales = totalSales
      this.thisYearTotals = thisYearTotals
      this.thisYearMouths = thisYearMouths
    }

    // Making The Chart --------------------------------
    const ctx = document.getElementById('myChart')

    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...this.thisYearMouths],
        datasets: [{
          label: 'Vendas Nos Ultimos Meses',
          data: [...this.thisYearTotals],
          backgroundColor: '#dddddd',
          borderColor: '#383838',
          borderWidth: 0,
          color: '#383838'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Include a dollar sign in the ticks
              callback (value, index, values) {
                return 'MZN ' + value
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 12,
                weight: 700,
                family: "'Quicksand', sans-serif"

              }
            }
          }
        }

      }
    })
    this.myChart = myChart
  },
  methods: {
    refresh () {
      console.log('refresh')
      // ------------- Organizing the data
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const Sales = { sucess: this.$store.state.sales }
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
        const thisYearMouths = thisYearMounthsAndTotals.map(data => Object.keys(data)[0])
        const thisYearTotals = thisYearMounthsAndTotals.map(data => Object.values(data)[0])

        this.thisYearTotals = thisYearTotals
        this.thisYearMouths = thisYearMouths
        this.myChart.destroy()
        // Making The Chart --------------------------------
        const ctx = document.getElementById('myChart')
        // eslint-disable-next-line no-unused-vars
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [...this.thisYearMouths],
            datasets: [{
              label: 'Vendas Nos Ultimos Meses',
              data: [...this.thisYearTotals],
              backgroundColor: '#dddddd',
              borderColor: '#383838',
              borderWidth: 0,
              color: '#383838'
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  // Include a dollar sign in the ticks
                  callback (value, index, values) {
                    return 'MZN ' + value
                  }
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    size: 12,
                    weight: 700,
                    family: "'Quicksand', sans-serif"

                  }
                }
              }
            }

          }
        })
        this.myChart = myChart
      }
    }
  }
}
</script>
<style lang="scss">
  #myChart {
    height: 250px;
    max-height: 250px;
  }
</style>
