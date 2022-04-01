<template>
  <div class="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      width="25rem"
      style="z-index: 100"
    >
      <v-list
        nav
        dense
      >
        <div class="options">
          <zimmo-options />
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar-nav-icon style="position: absolute; top: 1rem; ; z-index: 20" @click.stop="drawer = !drawer" />
    <div class="analitics">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection.js'
import ZimmoOptions from '~/components/dashboard/ZimmoOptions.vue'
export default {
  components: { ZimmoOptions },
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group () {
      this.drawer = false
    }
  },
  async mounted () {
    // this.$store.dispatch('getAllSales_')
    await Connection_.getCookies()
  }

}
</script>

<style>
  .dashboard {
    position: relative;
    min-height: 90%;
    padding: 1rem;
    border: solid 1px #dddddd;
    display: flex;
    margin: 1rem;
    justify-content: space-between;
  }

  @media ( max-width: 900px ) {

  .dashboard {
    position: relative;
    min-height: 90%;
    padding: 0rem;
    border: solid 0px #dddddd;
    display: flex;
    margin: 1rem;
    justify-content: space-between;
  }

  }
  .analitics {
    width: 100%;
    position: relative;
    left: 0;
  }
</style>
