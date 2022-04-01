<template>
  <v-card elevation="0" color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h6 basil--text">
        {{ request.email }}
      </h1>
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{ modDate(request.date) }}
    </v-card-subtitle>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item.name"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.name"
      >
        <v-card
          class="content_"
          height="12rem"
          color="white"
          flat
        >
          <div v-if="item.tips">
            <v-card v-if="item.tips[0].tips !== 'nenhuma dica'" elevation="0" color="#ffffff">
              <v-card-text v-for="(tip, i) in item.tips" :key="i">
                Produto: {{ tip.productName }} <br>
                Dicas: {{ tip.tips }}
              </v-card-text>
            </v-card>
            <v-card-text v-else>
              Nenhuma
              sugestão
            </v-card-text>
          </div>

          <div v-if="item.product" class="product">
            <CarrouselProductData :products="item.product" :total="item.total" />
          </div>
          <div v-if="item.username">
            <v-card
              color="#ffffff"
              height="10rem"
              elevation="0"
            >
              <v-card-subtitle>
                Usuario: {{ item.username }} <br>
                Email: {{ item.email }} <br>
                Localizacao: {{ item.location }} <br>
                Contacto: {{ item.contact }}
              </v-card-subtitle>
            </v-card>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import CarrouselProductData from './CarrouselProductData.vue'
export default {
  components: { CarrouselProductData },
  props: {
    request: Object
  },
  data () {
    return {
      tab: null,
      items: [
        {
          name: 'Pedidos'
        },
        {
          name: 'Dados do Cliente'
        },
        {
          name: 'Dicas & Sugestões',
          tips: [{ tips: 'nenhuma dica' }]
        }
      ]

    }
  },
  mounted () {
    const request = this.$props.request
    let total = 0
    request.products.map((ele) => {
      total += ele.price - (ele.price * (ele.discount / 100))
      return total
    })
    const pedido = [
      {
        name: 'Pedido',
        product: request.products,
        total
      },
      {
        name: 'Dados do Cliente',
        username: request.username,
        email: request.email,
        location: request.location,
        contact: request.phoneNumber
      },
      {
        name: 'Dicas & Sugestões',
        tips: request.tips[0] ? request.tips : [{ tips: 'nenhuma dica' }]
      }

    ]
    this.items = pedido
    console.log(pedido)
  },
  methods: {
    modDate (date) {
      const d = new Date(date)
      return d.toDateString()
    }
  }
}
</script>
<style lang="scss">
/* Helper classes */
.basil {
  background-color: #f7f7f7 !important;
}
.basil--text {
  color: #383838 !important;
}

.content_ {
  border-left: #dddddd 1px solid;
  border-right: #dddddd 1px solid;
  overflow-y: auto ;
  max-height: 12rem;
  padding-bottom: 1rem;
}
</style>
