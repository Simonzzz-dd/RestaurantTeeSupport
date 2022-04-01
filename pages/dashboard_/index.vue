<template>
  <div>
    <zimmo-analitics />
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
import ZimmoAnalitics from '~/components/dashboard/ZimmoAnalitics.vue'
export default {
  components: { ZimmoAnalitics },
    async mounted () {
    await Connection_.getCookies()
  }
}
</script>

<style>

</style>
