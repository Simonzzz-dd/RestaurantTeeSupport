<template>
  <v-sheet
    color="#FDF0D5"
    width="100%"
    class="mx-auto "
    elevation="0"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="request_ in requests_"
        :key="request_._id"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? '#ffffff' : '#ffffff'"
          elevation="0"
          class="ma-2"
          height="300"
          width="300"
          @click="toggle"
        >
          <v-toolbar color="#dddddd" dark flat>
            <v-spacer />
          </v-toolbar>
          <v-card-title>{{ request_.username }}</v-card-title>
          <v-card-text>
            {{ request_.date }} <br>
            Email: {{ request_.email }}
          </v-card-text>
          <v-card-text>
            Total: {{ Number(request_.total).toFixed(2) }} Mzn
          </v-card-text>
          <v-badge
            v-if="!request_.approved"
            bordered
            color="error"
            icon="mdi-stop"
            overlap
          >
            <v-btn
              class="white--text"
              color="error"
              depressed
            >
              pendente
            </v-btn>
          </v-badge>
          <v-badge
            v-if="request_.approved"
            bordered
            color="blue"
            icon="mdi-check"
            overlap
          >
            <v-btn
              class="white--text"
              color="blue"
              depressed
            >
              Aceite
            </v-btn>
          </v-badge>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
export default {
  props: {
    requests_: Array
  },
  data: () => ({
    model: null
  })
}
</script>
<style>

</style>
