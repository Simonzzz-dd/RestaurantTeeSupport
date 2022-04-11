
<template>
  <div class="homePage">
    <div class="homeBack">
      <img src="https://images.unsplash.com/photo-1517840933437-c41356892b35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
    </div>
    <div class="homeTextContent">
      <div class="headerTittle">
        Samia Roberts
      </div>
      <div class="HomeMainContent">
        <h1>FAZER  <br> TERAPIA</h1>
        <p>É um ato de coragem.</p>
        <v-btn to="/shop" x-large dark color="primary" class="homeBtn">
          Meus Produtos
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
export default {
  mounted () {
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.homePage', start: 'top top', end: '+=300', scrub: 2 } })
    tl.to(
      '.homeBack img', { scaleX: 1.2, scaleY: 1.2 }
    )
  }
}
</script>

<style lang="scss">
  /* homePage -------------------------------------------------------------------------- Image */
  .homePage {
    height: 100vh;
    position: relative;
    width: 100%;
    min-height: 500px;
    // max-height: 1500px;
  }

  .homeBack {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .homeBack img {
    transform: scale(1);
    width: 100%;
    height: 100%;
    background-position: center;
    object-fit: cover;
  }

  /* HomePage Txt Content ------------------------------ */
  .homeTextContent {
    z-index: 10;
    position: absolute;

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: hsla(0, 0%, 0%, 0.201);
  }
  .HomeMainContent {
    margin: auto 2vw;
    margin-top: auto;
    margin-bottom: 4vw;
  }
  .HomeMainContent {
    color: white;
  }
  .HomeMainContent h1 {
    font-family: "BasementGrotesque-Black";
      line-height: 95%;
    font-size: 7vw;
  }

  .HomeMainContent p {
    font-size: 1.5vw;
  }
  .homeBtn {
    width: 12vw;
    height: 4vw;
    border-radius: 20px;
  }

  .headerTittle {
    font-weight: 700;
    margin: 3vw;
    margin-top: 2vw;
    margin-left: auto;
    color: white;
    font-size: 1vw;
  }

  @media ( max-width: 1250px ) {
   .HomeMainContent h1 {
      font-family: "BasementGrotesque-Black";
      font-size: 7rem;
    }

    .HomeMainContent p {
      font-size: 2rem;
      font-weight: 500;
    }
    .homeBtn {
      width: 14rem;
      font-size: 2rem;

      border-radius: 20px;
    }
    .headerTittle {
      padding: 1rem;
      font-size: 1rem;
    }
  }

  @media ( max-width: 1120px ) {
    .HomeMainContent {
      background-color: hsla(0, 0%, 0%, 0.61);
      width: 100%;
      margin: 0;
      margin-top: auto;
      padding: 1rem;
      padding-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-content: center;
      text-align: center;
      border-top-left-radius: 50px;
    }
   .HomeMainContent h1 {
      font-family: "BasementGrotesque-Black";
      font-size: 5rem;
    }

    .HomeMainContent p {
      font-size: 2rem;
      font-weight: 500;
    }
    .homeBtn {
      width: 13rem;
      font-size: 1rem;
      margin: 0 auto;
      border-radius: 20px;
    }
    .headerTittle {
      padding: 1rem;
      font-size: 1rem;
    }
  }
  @media ( max-width: 600px ) {
       .HomeMainContent h1 {
      font-family: "BasementGrotesque-Black";
      font-size: 3rem;
    }

    .HomeMainContent p {
      font-size: 1rem;
      font-weight: 500;
    }
  }
</style>
