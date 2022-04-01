<template>
  <div v-if="watchLoading" class="loading-page">
    <div class="backImageLoading" />
    <div>
      <p>Shasha's Boutique</p>
      <h1>{{ test_.value }}%</h1>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap'
import Connection_ from '~/assets/serverConnection'
export default {
  data: () => {
    return { loading: true, loadingBar: 0, test_: { value: 0 } }
  },
  computed: {
    watchLoading () {
      let loading = true
      if (Math.ceil(this.test_.value) === 100) {
        loading = true
        this.finish()
      } else {
        loading = true
      }
      return loading
    }
  },
  async mounted () {
    const link1 = await Connection_.getS1Image()
    const link2 = await Connection_.getS2Image()
    const test_ = this.test_
    test_.value += 10
    setTimeout(() => {
      const image1 = new Image(100, 200)
      image1.onload = function () {
        test_.value += 40
      }
      image1.src = link1
      const image2 = new Image(100, 200)
      image2.onload = function () {
        test_.value += 50
      }
      image2.src = link2
    }, 1000)
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      setTimeout(() => {
        const tl = gsap.timeline()
        tl.to('.loading-page', {
          duration: 1, yPercent: -100, ease: 'power2.out'
        })
      }, 20)
    }
  }
}
</script>
<style lang="scss">

  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $homepageBack;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 30px;
    z-index: 10000;
    font-family: sans-serif;
  }
  .backImageLoading {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("/back.jpg");
      opacity: .15;
      z-index: 0;
  }

  .loading-page h1 {
       font-family: "Vanisha",'Quicksand', sans-serif;
  }

  .loading-page p {
    //   font-family: "Vanisha",'Quicksand', sans-serif;
        font-weight: 700;
        font-size: .85rem;
  }

</style>
