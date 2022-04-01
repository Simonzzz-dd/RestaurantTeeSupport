<template>
  <div style="margin-top: 6rem">
    <h3>Produtos que talves gostarias</h3>
    <v-divider />
    <div class="reccomendations">
      <v-card
        v-for="link in products_"
        :key="link._id"
        color="#f7f7f7"
        elevation="0"
        outlined
        style="margin-left: 0"
        class="mt-4 mr-4"
        max-width="270"
      >
        <v-img
          :src="link.imgId"
          height="170px"
        />

        <v-card-subtitle>
          <b>{{ link.productName }}</b>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            dark
            small
            elevation="0"
            color="#383838"
            :to="'/addToCart/'+link._id"
          >
            ver
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products_: []
    }
  },
  mounted () {
    const id = this.$route.params.id
    setTimeout(() => {
      const Products = [...this.$store.state.Products].filter(ele => ele._id !== id)
      console.log(Products)
      this.products_ = [...Products].slice(0, 3)
    }, 800)
  }
}
</script>

<style>
    .reccomendations {

        display: flex;
        flex-wrap: wrap;
    }
</style>
