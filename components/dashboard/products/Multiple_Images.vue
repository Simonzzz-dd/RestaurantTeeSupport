<template>
  <div class="multipleImages">
    <!-- <label> Add Multiple Imagess </label> -->
    <v-file-input
      label="Adicianar Imagens Extras"
      counter
      multiple
      accept="image/*"
      show-size
      truncate-length="5"
      @change="changeImage($event)"
    />
  </div>
</template>

<script>
import Compressor from 'compressorjs'
export default {
  props: {
    AddMultipleImages: Function
  },
  methods: {
    changeImage (e) {
      const ArrayOfFiles = []
      if (e.length === 0) { return '' }
      e.map((ele) => {
        if (ele.size > 1048576) {
          // eslint-disable-next-line no-new
          new Compressor(ele, {
            width: 800,
            height: 800,
            quality: 0.6,
            success (result) {
              ArrayOfFiles.push(result)
            },
            error (err) {
              console.log(err.message)
            }
          })
        } else {
          ArrayOfFiles.push(ele)
        }
        return ''
      })
      setTimeout(() => this.$props.AddMultipleImages(ArrayOfFiles), 200)
    }
  }
}
</script>

<style>
    .multipleImages {
        padding: 0 2rem;
    }
</style>
