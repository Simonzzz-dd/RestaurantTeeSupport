<template>
  <v-card
    elevation="0"
    color="#f7f7f7"
    outlined
    class="mt-6 pa-4"
  >
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h1>{{ Product.productName }}</h1>
      <v-btn
        to="/shop"
        elevation="0"
        dark
        small
        color="primary"
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </div>

    <br>
    <div class="Stars" />
    <div class="mt-4">
      <small><b>
        Descrição
      </b></small>
      <p>
        {{ Product.content }}
      </p>
    </div>
    <div class="mt-4">
      <small><b>
        Preço</b></small>
      <p>
        {{ Number( Product.price ).toFixed(2) }} Mzn
      </p>
    </div>
    <div class="mt-4">
      <small><b>Quantidade</b></small>
      <v-slider
        v-model="productRequested.quantity"
        thumb-color="#383838"
        track-color="#383838"
        value="1"
        thumb-label="always"
        hint="Im a hint"
        max="100"
        min="1"
      />
    </div>
    <v-textarea
      v-model="productRequested.tips"
      filled
      name="input-7-4"
      label="Dicas ou sugestoes"
    />

    <v-card-actions style="margin-top: 0rem; padding: 0">
      <small><b>
        Termos e Condições</b></small>

      <v-spacer />

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition class="pl-0">
      <div v-show="show">
        <v-divider />

        <v-card-text class="pl-0">
          {{ Product.termsConditions }}
        </v-card-text>
      </div>
    </v-expand-transition>
    <div style="display: flex" class="mt-4">
      <v-btn
        dark
        elevation="0"
        class="mr-1"
        color="primary"
        @click="AddToCart"
      >
        {{ submitBtn }}
      </v-btn>
      <PaymentConfirmation />
    </div>
  </v-card>
</template>

<script>
import PaymentConfirmation from '~/components/AddToCart_/PaymentConf.vue'
export default {
  components: {
    PaymentConfirmation
  },
  props: {
    Product: Object
  },
  data () {
    return {
      rating: 4,
      show: true,
      submitBtn: 'adicionar ao Cart',
      productRequested: {
        ProductId: this.$route.params.id,
        quantity: 1,
        tips: ''
      }
    }
  },
  methods: {
    AddToCart () {
      this.productRequested.productName = this.$props.Product.productName
      this.productRequested.price = this.$props.Product.price
      this.productRequested.discount = this.$props.Product.discount
      this.productRequested.imgId = this.$props.Product.imgId
      this.$store.commit('AddToCart', this.productRequested)
      this.submitBtn = 'Modificar Pedido'
      console.log(this.productRequested)
      // console.log('from method', this.$store)
    }
  }
}
</script>

<style>
    .Stars {
        display: flex;

    }
</style>
