<template>
<div>
    <add-user/>
    <div>
        
    </div>
</div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
import AddUser from '~/components/dashboard/Permissions/AddUser.vue'
export default {
  components: { AddUser },
    data: () => ({

    }),
      async mounted () {
    await Connection_.getCookies()
  }
}
</script>

<style>

</style>