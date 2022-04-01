<template>
  <div>
    <h1 style="text-align: center">
      Conteudo
    </h1>
    <div style="text-align: center" class="pb-8">
      Edite o conteúdo da página.
    </div>
    <edit-options />
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
import EditOptions from '~/components/dashboard/EditLayout/EditOptions..vue'
export default {
  components: { EditOptions },
  async mounted () {
    await Connection_.getCookies()
  }
}
</script>

<style>

</style>