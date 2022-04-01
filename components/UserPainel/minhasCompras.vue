<template>
  <div
    style="
      max-height: 14rem;
      overflow-y: auto;
      width: 95%;
      position: relative
    "
  >
    <v-sheet
      v-if="loading__.state"
      width="92%"
      color="homepageBack"
      class="pa-3"
    >
      <v-skeleton-loader
        class="mx-auto"

        type="table-thead, table-tbody"
      />
    </v-sheet>
    <v-simple-table v-if="!loading__.state">
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              Nomes dos usuários
            </th>
            <th class="rm-small">
              Datas
            </th>
            <th class="text-right">
              Totais
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in purch.data"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td class="rm-small">
              {{ item.date }}
            </td>
            <td class="text-right">
              {{ Number(item.total).toFixed(2) }} Mzn
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
// import Connection_ from '~/assets/serverConnection'
export default {
  inject: {
    theme: {
      default: { isDark: false }
    }
  },
  props: {
    user: Object
  },
  data () {
    return {
      purch: {
        data: [
          {
            name: 'empty',
            total: 0,
            date: Date().toString()
          }
        ]

      },
      loading__: { state: true }
    }
  },
  mounted () {
    const props = this._props
    const loading__ = this.loading__
    // eslint-disable-next-line no-unused-vars
    const purch = this.purch
    setTimeout(() => {
      console.log('from Props', props)
      if (props.user.username) {
        const Purchises = []
        props.user.purchises.forEach((ele) => {
          const data = {}
          data.name = ele.username
          data.total = ele.total
          data.date = ele.date
          Purchises.push(data)
        })
        purch.data = Purchises
        loading__.state = false
      } else {
        loading__.state = false
      }
    }, 3000)
  }
}
</script>

<style>

</style>
