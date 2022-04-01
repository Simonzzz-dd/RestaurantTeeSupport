<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          text
          color="primary"
          dark
          small
          v-bind="attrs"
          v-on="on"
        >
          Adicionar Produto
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5"> Adicionar Produto </span>
        </v-card-title>
        <div>
          <!-- eslint-disable-next-line vue/attribute-hyphenation  -->
          <CropImage :changeImage_="changeImage_" />
        </div>
        <div>
          <!-- eslint-disable-next-line vue/attribute-hyphenation  -->
          <MultipleImagess :AddMultipleImages="AddMultipleImages" />
        </div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="productName"
                  label="Nome do Produto"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="content"
                  label="Descrição"
                />
                <v-textarea
                  v-model="terms"
                  label="Termos e Condiçoes"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="price"
                  label="Preço do produto"
                  type="number"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="loading"
            @click="submit"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import CropImage from './CropImage.vue'
import MultipleImagess from './Multiple_Images.vue'
// import compressAfterCropping from '~/assets/compressAfterCropping'
import Connection_ from '~/assets/serverConnection.js'

export default {
  components: { CropImage, MultipleImagess },
  props: {
    refreshData: Function
  },
  data: () => ({
    loading: false,
    dialog: false,
    image_: '',
    productName: 'Nome do Produto',
    price: 1000,
    terms: 'Nenhum',
    MultipleImages_: [],
    content: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'
  }),
  methods: {
    changeImage_ (image) {
      this.image_ = image
    },
    AddMultipleImages (images) {
      this.MultipleImages_ = images
    },
    async submit () {
      this.loading = true
      const ShareImage = await Connection_.AddProduct(this.productName, this.price, this.content, this.image_, undefined, false, this.MultipleImages_, this.terms)
      // eslint-disable-next-line no-console
      this.$props.refreshData()
      console.log(ShareImage)
      this.dialog = false
      this.loading = false
    }
  }
}
</script>

<style>

</style>
