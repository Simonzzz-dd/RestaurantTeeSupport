<template>
  <div>
    <v-skeleton-loader
      v-if="!loaded"
      height="18rem"
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
      class="mt-4 ml-7 mr-8"
      show-size
      accept="image/*"
      label="Adicionar Imagem"
      @change="changeImage($event)"
    />
    <p style="color: red; height: 1.5rem" class="ml-9">
      <small>{{ err }}</small>
    </p>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import CompressFile from '~/assets/compressFile'
import compressAfterCropping from '~/assets/compressAfterCropping'

export default {
  props: {
    changeImage_: Function
  },
  data: () => {
    return {
      cropper: {},
      loaded: false,
      err: '',
      attrs: {
        class: 'mb-6',
        boilerplate: false,
        elevation: 0
      }
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

  mounted () {
    const ChangeImage_ = this.changeImage_
    /*eslint-disable */
    setTimeout(() => {
      this.cropper = new Cropper( this.$refs.image, {
        aspectRatio: 1,
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
    changeImage (input) {
      const ChangeImage_ = this.changeImage_
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

img {
  display: block;
  max-height: 100%;
  max-width: 100%;
}

.cropperDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18rem;
    width: 100%;
}
</style>
