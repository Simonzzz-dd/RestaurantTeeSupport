<template>
  <v-container fluid>
    <div v-if="loading_products" style="height:70vh; display: flex; align-items: center; justify-content: center">
      <v-progress-circular
        :size="30"
        color="#383838"
        indeterminate
      />
    </div>
    {{ err }}
    <div v-if="!loading_products" class="Products_grids">
      <v-card
        v-for="Product in Products"
        :key="Product._id"
        elevation="0"
        color="#f7f7f7"
        class="mx-auto my-6 card_"
      >
        <v-img
          height="250"
          :src="Product.imgId"
        />

        <v-card-title>{{ Product.productName }}</v-card-title>

        <v-card-text>
          <v-row
            align="center"
            class="mx-0 mb-3"
          />

          <div style="height: 3rem;">
            {{ Product.content.length > 100 ? Product.content.substring(0, 100) + "..." : Product.content }}
          </div>
        </v-card-text>

        <v-card-text>
          <div>
            <b>Preço:</b> {{ Number(Product.price).toFixed(2) }} mzn
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            dark
            elevation="0"
            class="no-text-transform mr-4"
            :to="'/addToCart/'+ Product._id"
          >
            Adicionar ao carinho
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="addMore">
      <v-btn
        width="10rem"
        color="#efefef"
        elevation="0"
        :loading="loading_more_items"
        @click="addMore()"
      >
        {{ btnMsg }}
      </v-btn>
    </div>
  </v-container>
</template>
<script>
import Connection_ from '~/assets/serverConnection'

export default {
  data: () => ({
    err: '',
    loading_products: true,
    loading: false,
    loading_more_items: false,
    selection: 1,
    Products: [],
    btnMsg: 'Ver Mais'
  }),
  async mounted () {
    const sequence = await Connection_.getProductsAtSequence(this.Products.length)
    this.err = ''
    if (sequence.sucess) {
      this.Products = [...sequence.sucess, ...this.Products]
      this.loading_products = false
    } else {
      this.err = "Could'nt fetch products..."
    }
  },
  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    async addMore () {
      this.loading_more_items = true
      const sequence = await Connection_.getProductsAtSequence(this.Products.length)
      setTimeout(() => {
        if (sequence.sucess && sequence.sucess.length > 0) {
          this.loading_more_items = false
          this.Products = [...this.Products, ...sequence.sucess]
        } else if (sequence.err === 'All data sent' || sequence.sucess.length === 0) {
          this.loading_more_items = false
          this.btnMsg = 'Sem mais Itens'
        }
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
  .Products_grids {
    display: grid;
    grid-gap: .5rem;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
  }

  .card_ {
    max-width: 300px;
  }

  @media ( max-width:970px) {
    .Products_grids {
      display: grid;
      grid-gap: .5rem;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
    }
    .card_ {
      max-width: 350px;
    }
  }

    @media ( max-width:750px) {
      .Products_grids {
        display: grid;
        grid-gap: .5rem;
        grid-template-columns: 1fr;
        justify-content: center;
      }
      .card_ {
        max-width: 350px;
      }
    }

    @media ( max-width:400px) {
      .Products_grids {
        display: grid;
        grid-gap: .5rem;
        grid-template-columns: 1fr;
        justify-content: center;
      }
      .card_ {
        max-width: 300px;
        }
      }

      .addMore {
        margin-top: 3rem;
        width: 100%;
        display: flex;
        justify-content: center;
      }
</style>
