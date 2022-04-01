<template>
  <div>
    <div class="navbar--">
      Shashas's Boutique
    </div>
    <div class="wrapper_">
      <v-container style="max-width: 1100px;" class="pa-8">
        <h1 style="margin-top: 2rem" class="dope">
          Shop Now!
        </h1>
        <div class="grid">
          <v-card
            color="white"
            elevation="0"
            class="HundrendWidth"
          >
            <AddToCartCarousel :images_="images" />
            <v-avatar v-for="link_ in smallBoxes" :key="link_" tile size="70" class="mt-1 mr-1">
              <img
                style="object-fit: cover"
                :src="link_"
                alt="John"
              >
            </v-avatar>
          </v-card>

          <!-- eslint-disable-next-line vue/attribute-hyphenation -->
          <ProductDescription :Product="Product" />
        </div>
        <ProductsYouMightOlsoLike />
      </v-container>
    </div>
    <ZFOOOTER />
  </div>
</template>

<script>
import ProductsYouMightOlsoLike from '~/components/AddToCart_/ProductsYouMightOlsoLike.vue'
import AddToCartCarousel from '~/components/AddToCart_/AddToCartCarousel.vue'
import ProductDescription from '~/components/AddToCart_/ProductDescription.vue'
import Connection_ from '~/assets/serverConnection'
export default {
  components: {
    AddToCartCarousel, ProductDescription, ProductsYouMightOlsoLike
  },
  data () {
    return {
      cycle: false,
      images: [
      ],
      smallBoxes: [
      ],
      Product: {}
    }
  },
  async mounted () {
    const data = await Connection_.getProduct(this.$route.params.id)
    this.Product = data.sucess
    this.images = [data.sucess.imgId, ...data.sucess.extraImages]
    this.smallBoxes = [data.sucess.imgId, ...data.sucess.extraImages].slice(0, 5)
  }
}
</script>

<style lang="scss">

    @import url('https://fonts.googleapis.com/css2?family=Comforter&display=swap');
    .dope {
        font-family: 'Comforter', cursive;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));;
        grid-gap: 1rem;
    }
    .HundrendWidth {
        width: 100%;
    }
    .wrapper_ {
        min-height: 100vh;
        padding-bottom: 12rem;
    }

      .navbar-- {
    padding: 1rem;
    background-color: $homepageBack;
    border-bottom: 1px solid #9e6f2858;
    text-align: center;
    color: $primary;
  }
</style>
