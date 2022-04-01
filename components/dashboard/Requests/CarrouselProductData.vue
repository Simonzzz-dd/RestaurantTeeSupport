<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left ">
            Nome
          </th>
          <th class="text-left ">
            Preço
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="( item, i ) in products"
          :key="i"
        >
          <td>
            {{ item.productName }}
          </td>
          <td>
            {{ Number(item.price - item.price * ( item.discount / 100 )).toFixed(2) }} Mzn
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th style="border-bottom: none" class="text-left subtitle-2 bb">
            Total
          </th>
          <th style="border-bottom: none" class="text-left subtitle-2 bb">
            {{ Number(total).toFixed(2) }} Mzn
          </th>
        </tr>
      </thead>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: {
    products: Array,
    total: Number
  }
}
</script>
<style lang="scss">
    .bb {
        // border-left: solid #dddddd 1px;
        border-top: solid #dddddd 1px;
    }
</style>
