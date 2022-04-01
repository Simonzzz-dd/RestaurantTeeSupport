<template>
  <div class="userGrid" style="width: 100%">
    <v-card

      height="350px"
      width="100%"

      class="pa-4 text-center c-small"
      color="#FDF0D5"
      elevation="0"
    >
      <v-avatar color="#FDF0D5">
        <v-icon color="#383838">
          mdi-bank
        </v-icon>
      </v-avatar>
      <br><br>
      <p>
        <b>Saldo</b>
      </p>
      <h1>
        {{ Number(user.Balance).toFixed(2) }} Mzn
      </h1>
      <v-sparkline
        :value="value"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        auto-draw
      />
    </v-card>
    <v-card

      width="100%"
      class="pa-4 mt-2 c-small"
      elevation="0"
      dark
    >
      <p> {{ user.email }} </p>
      <h1> {{ user.username }} </h1>
      <div style="margin-top: 6rem" />
    </v-card>
    <v-card

      width="100%"
      class="pa-4 mt-2 c-small"
      elevation="0"
      color="#fba700"
      dark
    >
      <h1> ZIMMO <br> #TEESUPPORT </h1>
    </v-card>
  </div>
</template>

<script>
const gradients = [
  ['#fba700'],
  ['#383838'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

export default {
  props: {
    user: Object
  },
  data: () => ({
    width: 4,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[1],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false
  }),
  mounted () {
    console.log(this._props)
  }
}
</script>

<style>
    .userGrid {
      width: 100%;

    }

    .c-small {
      max-width: 100vw;
    }

  @media ( max-width: 480px ) {
   .c-small {
      max-width: 90vw;
    }

  }
</style>
