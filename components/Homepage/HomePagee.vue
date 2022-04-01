<template>
  <div>
    <div class="navbar--">
      Shashas's Boutique
    </div>
    <div class="homeSection">
      <div class="backColor" />
      <div class="homeSectionDiv">
        <div class="img__first">
          <img src="https://images.unsplash.com/photo-1646641500506-7ab2975315dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="">
          <div class="h-txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ducimus eos dolorum voluptatibus illum at quam, architecto eum quasi, in suscipit modi placeat voluptates porro omnis, numquam fugit reprehenderit labore.
          </div>
        </div>
        <div class="img__second">
          <img src="https://images.unsplash.com/photo-1646641503378-94253777357f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="">
        </div>
      </div>
      <div class="home_content">
        <h1>
          BEST <br> SHOP <br> EVER
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
export default {
  mounted  () {
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.img__second',
        scrub: 1,
        start: '10% 30%'

      }
    })
    tl.to('.img__first', { yPercent: 15, duration: 0.1, opacity: 0.2 })
      .to('.img__second', { yPercent: -15, duration: 0.1, opacity: 0.2 }, '<')
  }
}
</script>

<style lang="scss">
  .navbar-- {
    padding: 1rem;
    background-color: $homepageBack;
    border-bottom: 1px solid #9e6f2858;
    text-align: center;
    color: $primary;
  }

  .backColor {
    z-index: 1;
    width: 100%;
    position: absolute;
    height: 100%;
    opacity: 0.15;
    background-image: url("/back.jpg");
  }
 .homeSection {

   position: relative;
   flex-direction: column;
   height: 100vh;
   display: flex;
   justify-content: center;
   background-color: hsl(40, 100%, 89%) ;
 }

 .homeSection h1 {
    font-family: "Vanisha",'Quicksand', sans-serif;
    // text-shadow: 1px 5px 5px hsl(40, 30%, 54%);
 }

 .homeSectionDiv {
      z-index: 2;
   height: 100%;
   width: 100%;
   justify-content: center;
   display: flex;

 }

.homeSectionDiv .img__first {
    margin: 5vh;

  width: 30vw;
  height: 70%;
  object-fit: cover;
margin-right: 2.5vh;
}

.homeSectionDiv .img__second {

  width: 30vw;
  height: 70%;
  object-fit: cover;
      margin: 5vh;
      margin-left: 2.5vh;
        margin-top: auto;
}

.homeSectionDiv img {
  opacity: .45;
  border-radius: 10px;
  width: 100%;
  object-position: top;
  height: 100%;
  object-fit: cover;
}

.homeSectionDiv .h-txt {
  padding-top: .5vw;
  color: #383838;
  font-size: 1vw;
  opacity: .5;
}

.home_content {
  background-color: rgba(255, 255, 255, 0.164);
  position: absolute;
    z-index: 4;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home_content h1 {

  font-size: 7vw;
  color: $primary;
  padding: 1vw 7vw;
  text-shadow: 1px 1px 30px #fcfcfc5d;
  // border: solid #9e6f287e 1px;
}

  @media ( max-width: 1200px ) {
      .home_content h1 {

        font-size: 6rem;
        color: $primary;
        padding: 1vw 7vw;
        text-shadow: 1px 1px 30px #ffffff9a;
        // border: solid #9e6f287e 1px;
      }
      .homeSectionDiv .img__first {

        width: 40vw;
        height: 70%;

      }

      .homeSection {
        max-width: 100vw;
        min-height: 800px;
        max-height: 800px;
      }

      .homeSectionDiv .img__second {

        width: 40vw;
      }
      .homeSectionDiv .h-txt {
        font-size: .7rem;
        opacity: .5;
      }
  }

    @media ( max-width: 780px ) {
      .home_content h1 {

        font-size: 5rem;
        color: $primary;
        padding: 1vw 7vw;
        text-shadow: 1px 1px 40px #ffffffac;
        // display: none;
        // border: solid #9e6f287e 1px;
      }
      .navbar-- {
        // font-family: "Vanisha",'Quicksand', sans-serif;
        position: relative;
        z-index: 20;
      }

      .homeSectionDiv img {
        opacity: .6;

      }
      .homeSectionDiv .h-txt {
        display: none;
        padding-top: .5rem;
        text-align: justify;
        font-size: .63rem;
        opacity: .5;
        font-family: "Vanisha",'Quicksand', sans-serif;
      }
      .homeSection {
        max-width: 100vw;
        min-height: 500px;
        max-height: 500px;
      }
      .homeSectionDiv img {
         border-radius: 0;
      }
      .homeSectionDiv .img__first {
        border-radius: 0;
        width: 50vw;
        height: 125%;
        // max-height: 270px;
        object-fit: cover;
        margin: 0;
        margin-right: 0vh;
                margin-top: -15%;
      }

      .homeSectionDiv .img__second {
        border-radius: 0;
        width: 50vw;
        height: 120%;
        object-fit: cover;
        // max-height: 470px;
        margin: 0;
        margin-left: 0vh;

      }
 }

</style>
