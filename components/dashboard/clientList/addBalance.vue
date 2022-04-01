<template>
  <v-col cols="auto">
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          elevation="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          Modificar Saldo
        </v-btn>
      </template>
      <template #default="dialog">
        <v-card>
          <v-toolbar
            color="primary"
            dark
            elevation="0"
          >
            SendGrid Api Key
          </v-toolbar>
          <v-card-text>
            <br>
            <v-text-field
              v-model="balance"
              label="Add balance"
              type="number"
              clearable
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="dialog.value = false"
            >
              Close
            </v-btn>
            <v-btn
              elevation="0"
              dark
              color="#383838"
              @click="addBalance(dialog)"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
export default {
  props: {
    id: String,
    refresh: Function
  },
  data () {
    return {
      balance: ''
    }
  },
  methods: {
    async addBalance (dialog) {
      const balance = await Connection_.changeBalance(this._props.id, this.balance)
      this._props.refresh()
      console.log(balance)
      dialog.value = false
    }
  }
}

</script>

<style>

</style>
