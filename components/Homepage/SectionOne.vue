<template>
  <div class="SectionOne">
    <v-container style="max-width: 1200px; height: 100%; padding: 0;">
      <div class="s1container">
        <div class="s1-content">
          <div class="image-s1">
            <div class="image-s1-div" :style="`background-image: url( ${image});`">
              <!-- <img :src="image" alt=""> -->
            </div>

            <h1 style="opacity: 0">
              Shashas <br> Boutique
            </h1>
          </div>
          <div class="txt-s1">
            <h1 class="main-">
              {{ h1 }}
            </h1>
            <p>{{ p }}</p>
            <v-btn class="s1-btn" to="/shop" color="primary">
              ir a loja
            </v-btn>
            <div class="txtAnim">
              <h1>{{ h1 }}</h1>
              <p>{{ p }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-container>
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
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.SectionOne',
        // scrub: 1,
        start: '10% 50%',
        toggleActions: 'restart pause resume reverse'
      }
    })
    tl.to('.txt-s1 .main_', { opacity: 1, duration: 1 })
      .to('.txt-s1 .txtAnim h1', { textShadow: '0 0 0px hsla(28, 55%, 29%, 0.5)', duration: 1 }, '<')
      .to('.txt-s1 .p', { opacity: 1, duration: 1 }, '<')
      .to('.txt-s1 .txtAnim p', { textShadow: '0 0 0px hsla(28, 55%, 29%, 0.5)', duration: 1 }, '<')
      .to('.image-s1-div ', { opacity: 0.75 }, '<')
      .to('.s1-btn', { opacity: 1 }, '<')
    const content_ = await Connection_.getS2Content()
    if (content_.sucess) {
      this.h1 = content_.sucess.h1
      this.p = content_.sucess.p
    }
    const image = await Connection_.getS1Image()
    this.image = image
  }
}
</script>

<style lang="scss">
 .SectionOne {
    position: relative;
    z-index: 10;
    background-color: $homepageBack;
    border-top: solid 1px #9e6f2841;
    height: 100vh;
    max-height: 600px;
    min-height: 500px;
    text-align: center;
 }
 .s1container {
  padding: 2.5rem;
  width: 100%;
  height: 100%;
 }

 .SectionOne h1 {
    font-family: "Vanisha";
    margin-top: 1rem;
    color: $primary;
    text-align: center;
 }

 .s1-content {
   position: relative;
   width: 100%;
   display: grid;
   grid-template-columns: 2fr 1fr;
   align-items: center;
   height: 100%;
   grid-gap: 2rem;
 }

 .s1-btn {
   opacity: .1;
 }

 .image-s1 {
   position: relative;
   height: 80%;
   background-color: $homepageBack;
   width: 100%;
   display: flex;
   align-items: center;
 }
 .image-s1-div {
      height: 350px;
      opacity: .4;
   margin: auto;
   background-position: center;
      border-radius: 10px;
      background-color: $homepageBack;
   width: 100%;
   position: relative;
   z-index: 1;
 }

  .txt-s1 {
   position: relative;
 }
  .txt-s1 .main-{
   opacity: 0;
 }

 .txt-s1 p {
   opacity: 0;
 }
 .txtAnim {
   position: absolute;
   top: 0;
 }

 .txtAnim h1 {
   opacity: 1;
   color: transparent;
   text-shadow: 0 0 10px hsla(28, 55%, 29%, 0.5);
 }
 .txtAnim p {
    opacity: 1;
   color: transparent;
   text-shadow: 0 0 10px hsla(28, 55%, 29%, 0.5);
 }
 .image-s1 h1 {
    opacity: .1;
    z-index: 0;
    position: absolute;
    color: #746145;
    top: 50%;
    left: -10%;
    transform: translateY(-50%);
    font-size: 12rem;
  }

  @media ( max-width: 950px ) {
    .SectionOne {

      border-top: solid 1px #9e6f2841;
      height: fit-content;
      max-height: fit-content;
      min-height: fit-content;
      padding-bottom: -.5rem;
    }
    .SectionOne * {
      padding: 0;
    }
    .s1container {
      padding: 0rem;
    }

    .SectionOne h1 {
        margin-top: 1rem;
        text-align: center;
    }

    .s1-content {
      position: relative;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }

    .image-s1 {
      position: relative;
      height: 80%;
      padding: 0;
      background-color: $homepageBack;
      display: flex;
      align-items: center;
    }
    .image-s1-div {
      padding: 0;
      height: 350px;
      margin: auto;
      border-radius: 0px;
      background-color: $homepageBack;
      // border-top: solid #746145 2px;

      margin: 0;
      margin-top: 1rem;
      width: 100%;
      position: relative;
      z-index: 1;
    }

    .txt-s1 {
      margin-top: 2rem;
    }
    .s1-content p {
      text-align: center;
      opacity: 1;
      // height: 350px;
      color: transparent;
      padding: 1rem;
      text-shadow: 0 0 10px hsla(28, 55%, 29%, 0.5);
    }
  }

</style>
