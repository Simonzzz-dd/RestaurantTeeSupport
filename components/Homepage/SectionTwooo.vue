<template>
  <div class="s2Grid">
    <div class="text">
      <h1> {{ h1 }} </h1>
      <p>{{ p }}</p>
    </div>
    <div :style="`height: 100%;  background-image: url('${image}')`" class="image_s2" />
  </div>
</template>

<script>
// import { gsap } from 'gsap/dist/gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Connection_ from '~/assets/serverConnection'
export default {
  data: () => {
    return {
      image: '',
      h1: '',
      p: ''
    }
  },
  async mounted () {
    const image = await Connection_.getS2Image()
    const content_ = await Connection_.getS2Content()

    if (content_.sucess) {
      this.h1 = content_.sucess.h1
      this.p = content_.sucess.p
    }
    this.image = image
  }
}
</script>

<style lang="scss">

  .s2Grid {
    margin: 4rem 2rem;
    background-color: #efefef;
    // min-height: 550px; max-height: 550px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: 500px;
      border-radius: 8px;
    max-width: 90vw;
  }

  .s2Grid h1 {
    max-width: 90vw;
    font-family: "BasementGrotesque-Black";
    font-size: 1.5rem;
  }
  .text {
    height: 100%;
    display: flex;
    flex-direction: column;
    max-width: 380px;
    padding: 2rem;
    justify-content: center;

  }

  .image_s2 {
    margin-left: auto;
    width: 100%;
  }
  @media ( max-width: 1200px ) {
    .s2Grid {
      margin: 2rem 1rem;

      background-color: #efefef;
      min-height: fit-content; max-height: fit-content;
      display: grid;
          justify-content: space-between;
      grid-template-columns: 1fr;
      grid-template-rows: max-content 400px;

    }
    .image_s2 {
      margin-left: auto;
      min-width: 0;
      width: 100%;
    }

    .text {
          max-width: 80vw;
    }
  }
</style>
