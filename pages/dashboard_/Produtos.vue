<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <h1 style="text-align: center">
      Produtos
    </h1>
    <div style="text-align: center" class="pb-8"> Actualizar, adicionar e apagar Produtos.</div>
    <p style="margin-left: 1rem">
      {{ Products.length }}/{{ maxProducts }}
    </p>
    <v-card
      
      elevation="0"
      color="accent"

    >
      
      <div class="flexProductTitle">
        <p class="productImage displayNone">Imagem do Produto</p>
        <p class="productName">Nome do Produto</p> 
        <p class="productPrice"> Preço do Produto</p>
        <p class="deleteProduct"> Apagar </p>
      </div>
      <div v-if="loading_products" style="height:300px; display: flex; align-items: center; justify-content: center">
        <v-progress-circular
          :size="30"
          color="#383838"
          indeterminate
        />
      </div>
      <div v-if="!loading_products" class="ProductsList" style="min-height: 300px">
        <v-list-item 
        v-for="product in Products" :key="product._id"
        class="ProductItem" v-ripple>
          <div class="ProductContents">
            <div class="productc displayNone">
              <v-avatar>
                <img
                  :src="product.imgId"
                  alt="John"
                >
              </v-avatar>              
            </div>

            <div class="productc"> {{ product.productName }} </div>
            <div class="productc"> {{ Number(product.price).toFixed(2) }} mzn</div>
            <div class="productc">
              <v-btn
                elevation="0"
                text
              >
                <v-icon @click="DeleteP(product._id)" color="red">
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>

          </div>
        </v-list-item>
      </div>
      <div class="adicionarProd">
        <AddProduct :refreshData="refreshData"/>
      </div>
    </v-card>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection.js'
import AddProduct from '~/components/dashboard/products/AddProduct.vue'
export default {
  components: { AddProduct },
  data(){
    return {
      Products: [],
      maxProducts: 30,
      loading_products: true,
      overlay: false,
    }
  },
  async mounted () {
    await Connection_.getCookies()
    let website = await Connection_.getWebsite()
    if ( website.sucess ) {
      this.maxProducts = website.sucess.maxProducts
    }
    let Products = await Connection_.getAllProducts()
    if ( Products.sucess ) {
      this.Products = Products.sucess
      this.loading_products = false
    }
  },
  methods: {
    async refreshData ( ) {
      let Products = await Connection_.getAllProducts()
      this.Products = Products.sucess
    },
    async DeleteP ( id ) {
      this.overlay = true
      let DeleteProduct = await Connection_.DeleteProduct(id)
      console.log(DeleteProduct)
      let Products = await Connection_.getAllProducts()
      this.Products = Products.sucess
      this.overlay = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .flexProductTitle {
    display: flex;
    justify-content: space-between;
    border-bottom: $secondary 1px solid;
  }

  .productImage, .productName, .productPrice, .deleteProduct, .updateProduct {
    width: 14rem;
    text-align: center;
    font-weight: 500;
    padding-top: 1rem;
    font-size: .8rem;
  } 

  .ProductsList {
    max-height: 300px;
    overflow-y: scroll;
  }

  .ProductItem {
    cursor: pointer;
    padding: 0;
  }

  .ProductContents {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .productc {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    text-align: center;
    font-size: .8rem;
  }

  .adicionarProd {
    padding: 1.5rem;
    border-top: 1px solid #dddddd;
  }

  @media ( max-width: 530px ) {
    .displayNone {
      display: none;
    }
  }


</style>