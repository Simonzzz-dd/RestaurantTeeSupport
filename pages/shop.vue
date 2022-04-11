<template>
  <div>
    <div class="navbar---">
      {{ companyname }}
    </div>
    <v-container style="max-width: 1200px">
      <div class="myproducts">
        <div class="whatsAllObout pa-8">
          <b><small> {{ companyname }}</small></b>
          <h1>{{ h1 }}</h1>
          <b><small>{{ p }}</small></b>
        </div>
        <ShopSection />
      </div>
    </v-container>
    <ZFOOOTER />
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
export default {
  name: 'InspirePage',
  data () {
    return {
      h1: '',
      companyname: '',
      p: ''
    }
  },
  async mounted () {
    const Content = await Connection_.GetShopSection()
    if (Content.sucess) {
      this.p = Content.sucess.p
      this.companyname = Content.sucess.companyName
      this.h1 = Content.sucess.h1
    }
  }
}
</script>
<style lang="scss">
  .navbar--- {
    padding: 1rem;
    background-color:#383838;
    font-weight: 700;
    // border-bottom: 1px solid ;
    text-align: center;
    color: white;
  }
 .myproducts {
   min-height: 100vh;
   padding-bottom: 14rem;
 }
 .whatsAllObout {
   width: 100%;
   margin-top: 3rem;
    padding-bottom: 2rem;
   border-radius: 8px;
 }

//  .whatsAllObout h1 {
//    color: white;
//  }
</style>
