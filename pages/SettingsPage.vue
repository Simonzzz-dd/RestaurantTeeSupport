<template>
  <div>
    <v-card flat class="ma-0" tile elevation="0">
      <v-toolbar
        elevation="0"
        dark
        color="#383838"
        dense
      >
        <v-btn
          to="/dashboard_/PageContent"
          icon
          dark
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <!-- <v-toolbar-title>Settings</v-toolbar-title> -->
        <v-spacer />
      </v-toolbar>
      <v-list
        three-line
        subheader
      >
        <v-subheader>User Controls</v-subheader>
        <change-email />
        <change-apikey />
        <request-end-message />
        <request-conf-email />
      </v-list>
      <v-divider />
    </v-card>
  </div>
</template>

<script>
import changeApikey from '~/components/settings/changeApikey.vue'
import ChangeEmail from '~/components/settings/changeEmail.vue'
import RequestConfEmail from '~/components/settings/requestConfEmail.vue'
import RequestEndMessage from '~/components/settings/requestEndMessage.vue'
export default {
  components: { changeApikey, RequestEndMessage, ChangeEmail, RequestConfEmail },
  data () {
    return {

    }
  }
}
</script>
<style>

</style>
