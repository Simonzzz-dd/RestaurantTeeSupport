<template>
  <div class="pb-10">
    <v-toolbar
      elevation="0"
      dark
      color="#383838"
      dense
    >
      <v-btn
        to="/dashboard_/PageContent"
        icon
        dark
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <!-- <v-toolbar-title>Settings</v-toolbar-title> -->
      <v-spacer />
    </v-toolbar>
    <br>
    <h1 style="text-align: center">
      Secção 2
    </h1>
    <div style="text-align: center" class="pb-8">
      Edite o conteúdo da página.
    </div>
    <v-skeleton-loader
      v-if="!loaded"
      height="24rem"
      v-bind="attrs"
      type="image"
    />
    <div v-else>
      <div
        class="cropperDiv"
      >
        <img id="imageCrop_" ref="image" src="/pizza.jpg">
      </div>
    </div>
    <v-file-input
      id="fileInput"
      class="mt-4 ml-7 mr-9"
      show-size
      accept="image/*"
      label="Imagem Inicial"
      @change="changeImage($event)"
    />
    <p style="color: red; height: 1.5rem" class="ml-9">
      <small>{{ err }}</small>
    </p>
    <v-row class="mt-4 ml-7 mr-8">
      <v-col cols="12">
        <v-textarea
          v-model="h1"
          name="input-7-1"
          label="H1 Tittle"
          hint="Hint text"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="p"
          name="input-7-2"
          label="P Content"
          hint="Hint text"
        />
      </v-col>
      <div class="ml-2">
        <v-btn
          elevation="0"
          dark
          color="#383838"
          @click="submitContent()"
        >
          Actualizar
        </v-btn>
      </div>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar"
        :color="color"
        dark
      >
        {{ text }}

        <template #action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import compressAfterCropping from '~/assets/compressSection/CompressAfterCroppingSections'
import CompressFile from '~/assets/compressSection/CompressFileSection'
import Connection_ from '~/assets/serverConnection'
export default {
  data: () => {
    return {
      cropper: {},
      image_: '',
      h1: '',
      p: '',
      loaded: false,
      err: '',
      attrs: {
        class: 'mb-6',
        boilerplate: false,
        elevation: 0
      },
      snackbar: false,
      text: 'Hello, I\'m a snackbar',
      color: 'blue'
    }
  },
  head () {
    return {
      title: 'crop js',
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/2.0.0-alpha.2/cropper.min.js' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/2.0.0-alpha.2/cropper.min.css' }
      ]
    }
  },

  async mounted () {
    await Connection_.getCookies()

    const ChangeImage_ = this.changeImage_
    /*eslint-disable */
    setTimeout(() => {
      this.cropper = new Cropper(this.$refs.image, {
        aspectRatio: 4/3,
        zoomable: false,
        scalable: false,
        crop () {
          this.cropper.getCroppedCanvas().toBlob( function( blob ) {
            blob.lastModified = Date.now()
            blob.name = "zimmoCroppedImage"
            ChangeImage_(blob)
          })
        }
      })
    }, 1300)
    setTimeout( () => { 
      this.cropper.getCroppedCanvas().toBlob( function( blob ) {
      blob.lastModified = Date.now()
      blob.name = "zimmoCroppedImage"
      compressAfterCropping(blob,ChangeImage_)
    })
    }, 1400)
    setTimeout(() => this.loaded = true, 1000)
  },
  methods: {
    async submitContent ( ) {
      let Content = await Connection_.SectionTwoContent( this.h1, this.p, this.image_)
      if ( Content.sucess ) {
        this.snackbar = true
        this.text = "Actualizado"
        this.color = "blue"
      } else {
        this.snackbar = true
        this.text = "Erro"
        this.color = "red"
      }
    },
    changeImage_ (image) {
      this.image_ = image
    },
    changeImage (input) {
       const ChangeImage_ = this.changeImage_
       console.log(ChangeImage_)
      let cropper = this.cropper
      if (!input) {
        return
      }
      const file = input
     
      // Compress file ------------------------------------------------------------------------------------
      if (file.type == 'image/jpeg' || file.type == 'image/png') {
        if (file.size > 1048576) {
          CompressFile(file, ChangeImage_, cropper, 500)
        } else {

          // if no need to compress -----------------------------------------------------
          CompressFile(file, ChangeImage_, cropper, 500)
        }
      } else {
        this.err = 'Formato do ficheiro deve ser jpeg ou png'
      }
    },
  }
}
</script>

<style>
/* Ensure the size of the image fit the container perfectly */
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-height: 100%;
  max-width: 100%;
}

.cropperDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24rem;
    width: 100%;
}
</style>
