<template>
  <v-card elevation="0" class="pa-0">
    <div class="confgrid">
      <div v-for="item_ in $store.state.CartItems" :key="item_.ProductId" class="requestsGrid">
        <div class="t icon_">
          <v-avatar size="70" rounded>
            <img
              :src="item_.imgId"
              alt="John"
            >
          </v-avatar>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div class="t">
            {{ item_.productName }}
          </div>

          <v-btn
            icon
            elevation="0"
            dark
            style="margin-right: -.5rem"
            small
            color="primary"
          >
            <v-icon @click="$store.commit('OnDelete', item_.ProductId)">
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
        <div class="t">
          Dica: {{ item_.tips.length > 30 ? item_.tips.slice(0,29) + "..." : item_.tips }} {{ item_.tips.length == 0 ? "nenhuma" : "" }}
        </div>
        <div class="t">
          <div> Qt:</div> <div>{{ item_.quantity }}</div>
        </div>
        <div class="t">
          <div>
            Desconto:
          </div> <div>
            {{ Number(item_.discount).toFixed(2) }} mzn
          </div>
        </div>
        <div class="t">
          <div> <b>Preco:</b></div> <div><b> {{ Number(item_.price).toFixed(2) }} mzn </b></div>
        </div>
      </div>
    </div>
    <v-card-subtitle>
      <div style="display: flex; justify-content: space-between">
        <div>Desconto</div><div>{{ Number($store.state.discount).toFixed(2) }} mzn</div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div>Total sem desconto</div><div>{{ Number($store.state.totalSemDisconto).toFixed(2) }} mzn</div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div><b>Total com desconto</b></div><div><b>{{ Number($store.state.total).toFixed(2) }} mzn</b></div>
      </div>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
