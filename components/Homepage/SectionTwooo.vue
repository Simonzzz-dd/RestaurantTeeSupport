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
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
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
    gsap.set('.image_s2', { transformOrigin: '0% 50%' })

    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo('.image_s2', 2.2, { width: '0%' }, {
      width: '100%',
      minWidth: '100px',
      duration: 0.35,
      scrollTrigger: {
        trigger: '.s2Grid',
        start: 'top +=100px'
        // markers: 'true'
      }
    })
  }
}
</script>

<style lang="scss">

  .s2Grid {
    margin: 4rem 2rem;
    background-color: $homepageBack;
    // min-height: 550px; max-height: 550px;
    display: grid;
    grid-row: 500px;
        justify-content: space-between;
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: 500px;

  }

  .s2Grid h1 {
        font-family: "Vanisha";
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
    min-width: 200px;
  }
  @media ( max-width: 1200px ) {
    .s2Grid {
      margin: 2rem 1rem;
      background-color: $homepageBack;
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
  }
</style>
