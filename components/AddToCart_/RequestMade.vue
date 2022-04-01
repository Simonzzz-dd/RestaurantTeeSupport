<template>
  <v-banner color="#f7f7f7" two-line>
    <v-avatar
      slot="icon"
      color="#383838"
      size="40"
    >
      <v-icon
        icon="mdi-lock"
        color="white"
      >
        mdi-rocket
      </v-icon>
    </v-avatar>

    {{ text }}
  </v-banner>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
export default {
  data () {
    return {
      text: ''
    }
  },
  async mounted () {
    const requestMessage = await Connection_.getRequestMessage()
    if (requestMessage.sucess) {
      this.text = requestMessage.sucess
    } else {
      this.text = 'Request Made'
    }
  }
}
</script>

<style>

</style>
