<template>
  <div class="sectionOne">
    <v-container class="mainGrid_">
      <div class="imagesSection_One">
        <div class="sectionOneImages">
          <div class="circle" />
          <div class="imgSectionOne">
            <img src="https://images.unsplash.com/photo-1603032050875-903d7c065931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="">
          </div>
          <div class="imgSectionOneTwo">
            <img :src="image" alt="">
          </div>
        </div>
      </div>
      <div class="s1-txt-content">
        <h1> {{ h1 }} </h1>
        <p>{{ p }}</p>
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
    const image = await Connection_.getS1Image()
    const content_ = await Connection_.getS1Content()

    if (content_.sucess) {
      this.h1 = content_.sucess.h1
      this.p = content_.sucess.p
    }
    this.image = image
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.sectionOne', start: 'top center', toggleActions: 'restart pause resume reverse' } })
    tl.to('.circle', { scaleX: 1, scaleY: 1, yPercent: -50, ease: 'ease-in', duration: 0.4 })
      .to('.imgSectionOne', { scaleX: 1, scaleY: 1, ease: 'ease-in', duration: 0.350 })
      .to('.imgSectionOneTwo', { scaleX: 1, scaleY: 1, ease: 'ease-in', duration: 0.350 })
  }
}
</script>

<style lang="scss">

  .sectionOne {
    position: relative;
    z-index: 20;
    background-color: #fefefe;
    min-height: 700px;
      height: fit-content;
  }

  .sectionOne h1 {
    font-family: "BasementGrotesque-Black";
    font-size: 3.5rem;
  }

  .imagesSection_One {
    position: relative;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mainGrid_ {
    min-height: 700px;
    display: grid;
    align-items: center;
    justify-content: center;
      height: fit-content;
      padding: 5rem 0;
    grid-template-columns: 2fr 1fr;
  }

  // images  --------------------------
  .sectionOneImages {
    width: 400px;
    height: 400px;
    position: relative;
    display: flex;
    align-content: center;
    justify-content: center;

  }

  .imgSectionOne {
    position: absolute;
    z-index: 0;
    height: 400px;
    left: -30%;
    top: -5%;
    // background-color: aqua;
    // opacity: .5;
    transform:  scale(.0);
  }
  .imgSectionOne img {
    height: 60%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .imgSectionOneTwo {
    transform:  scale(.0);
    position: absolute;
    z-index: 0;
    height: 400px;
    right: -40%;
    bottom: -40%;
    // background-color: aqua;
    // opacity: .5;
  }
  .imgSectionOneTwo img {
    height: 60%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .imagesSection_One {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .circle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scale(.2);
    height: 300px;
    width: 300px;
    border-radius: 100%;
    background-color: $primary;
  }

  // txt content ----------------------------
  .s1-txt-content {
    text-align: center;
  }

  .s1-txt-content {
    // border-left: 4px solid #383838;
    padding-left: 1rem;
  }
  @media ( max-width: 1275px ) {
    .sectionOne {
      position: relative;
      z-index: 20;
      background-color: #fefefe;
      height: fit-content;
      max-height: fit-content;
    }
    .mainGrid_ {
      padding: 5rem 0;
      display: grid;
      align-items: center;
      grid-gap: 3rem;
      justify-content: center;
      height: fit-content;
      grid-template-columns: 1fr;

    }
    .imagesSection_One {
      position: relative;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .imgSectionOne {
      position: absolute;
      z-index: 0;
      height: 400px;
      left: -30%;
      top: -5%;
      // background-color: aqua;
      // opacity: .5;
      transform:  scale(.0);
    }
    .imgSectionOneTwo {
      transform:  scale(.0);
      position: absolute;
      z-index: 0;
      height: 400px;
      right: -40%;
      bottom: -40%;
      // background-color: aqua;
      // opacity: .5;
    }
  }

  @media ( max-width: 778px ) {
    .sectionOneImages {
      width: 100%;
      height: 300px;
      position: relative;
      display: flex;
      align-content: center;
      justify-content: center;

    }
    .imgSectionOne {
      position: absolute;
      z-index: 0;
      width: 60%;
      height: 300px;
      left: 10%;
      top: -5%;
      // background-color: aqua;
      // opacity: .5;
      transform:  scale(.0);
    }
    .imgSectionOneTwo {
      transform:  scale(.0);
      height: 300px;
      width: 60%;
      position: absolute;
      z-index: 0;
      right: 10%;
      bottom: -40%;
      // background-color: aqua;
      // opacity: .5;
    }

    .s1-txt-content {
      padding: 0 2rem;
    }

  }
  @media ( max-width: 478px ) {
    .sectionOneImages {
      width: 100%;
      height: 250px;
      position: relative;
      display: flex;
      align-content: center;
      justify-content: center;

    }
    .imgSectionOne {
      position: absolute;
      z-index: 0;
      width: 60%;
      height: 250px;
      left: 10%;
      top: -5%;
      // background-color: aqua;
      // opacity: .5;
      transform:  scale(.0);
    }
    .imgSectionOneTwo {
      transform:  scale(.0);
      height: 250px;
      width: 60%;
      position: absolute;
      z-index: 0;
      right: 10%;
      bottom: -40%;
      // background-color: aqua;
      // opacity: .5;
    }
  }
</style>
