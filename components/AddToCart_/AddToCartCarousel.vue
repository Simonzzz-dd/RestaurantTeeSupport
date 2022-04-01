<template>
  <v-carousel
    :continuous="false"
    :cycle="cycle"
    :show-arrows="false"
    class="mt-6"
    delimiter-icon="mdi-minus"
    height="450"
    style="min-width: 100%"
  >
    <v-carousel-item
      v-for="(slide, i) in images_"
      :key="i"
    >
      <v-img :src="slide" class="img_" />
    </v-carousel-item>
  </v-carousel>
</template>

<script>

export default {
  props: {
    images_: Array
  },
  data () {
    return {
      cycle: false,
      images: [

      ]
    }
  }

}
</script>

<style>
  .img_ {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style>
