<template>
  <div class="Global border-left">
    <LoadingBar />
    <HomePagee />
    <SectionOne />
    <v-container class="main-container">
      <div class="HomeContainer">
        <div class="relative">
          <section-twooo />
        </div>
      </div>
    </v-container>
    <div class="border-bottom" />
    <ZFOOOTER />
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'

import HomePagee from '~/components/Homepage/HomePagee.vue'
import SectionOne from '~/components/Homepage/SectionOne.vue'
import SectionTwooo from '~/components/Homepage/SectionTwooo.vue'
import LoadingBar from '~/components/LoadingBar.vue'

export default {
  name: 'IndexPage',
  components: { HomePagee, SectionTwooo, SectionOne, LoadingBar },
  async mounted () {
    await Connection_.getCookies()
  }

}
</script>
<style lang="scss" scoped>

.Global {
  background-color: #383838;
}

.HomeContainer {
  position: relative;
  height: fit-content;
}

.relative {
  position: relative;
}

.border-bottom {
  border-bottom: solid #dddddd2e 1px ;
}

.main-container {
  max-width: 1200px
}
</style>
