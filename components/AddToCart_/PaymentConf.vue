<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="800"
  >
    <template #activator="{ on, attrs }">
      <v-btn

        v-bind="attrs"
        dark
        elevation="0"
        color="#383838"
        v-on="on"
      >
        <v-badge
          color="red"
          :content="Number($store.state.total).toFixed(2) + 'mzn'"
        >
          Comprar
        </v-badge>
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card elevation="0">
        <v-toolbar
          elevation="0"
          color="primary"
          dark
        >
          Confirmar o pedido
        </v-toolbar>
        <v-stepper v-model="e1" elevation="0">
          <v-stepper-header class="elevation-0">
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
            >
              Verificar Meus Pedidos
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              Adicionar Dados Pessoais
            </v-stepper-step>
            <v-divider />

            <v-stepper-step
              :complete="e1 > 3"
              step="3"
            >
              Ja esta
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <confirmar-dados />
              <v-btn
                :disabled="$store.state.CartItems.length == 0 ? true : false "
                class="ml-4"
                color="primary"
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- eslint-disable-next-line vue/attribute-hyphenation -->
              <UserPaymentForm :isBtnDisabled="isBtnDisabled" />
              <v-btn
                color="primary"
                :disabled="formHasErrors"
                @click="SubmitForm"
              >
                Submeter Pedido
              </v-btn>

              <v-btn
                text
                color="primary"
                @click="e1 = 1"
              >
                voltar
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <request-made />
              <br>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="Close(dialog)"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import confirmarDados from './confirmarDados.vue'
import RequestMade from './RequestMade.vue'
import UserPaymentForm from './UserPaymentForm.vue'
import Connection_ from '~/assets/serverConnection'
export default {
  components: { confirmarDados, UserPaymentForm, RequestMade },
  data () {
    return {
      e1: 1,
      formHasErrors: true
    }
  },
  methods: {
    Close (dialog) {
      dialog.value = false
      this.e1 = 1
    },
    async SubmitForm () {
      const client = this.$store.state
      console.log(client)
      this.e1 = 3
      const requestProduct = await Connection_.requestProduct(client.contact, client.email, client.name_, client.location, client.CartItems)
      this.$store.commit('resetForm')
      console.log(requestProduct)
    },
    isBtnDisabled (form_) {
      if (form_.name_.length > 0 && form_.email.length > 0 && form_.contact.length > 0 && form_.location.length > 0) {
        this.formHasErrors = false
      } else {
        this.formHasErrors = true
      }
    }
  }
}
</script>
<style lang="scss" >

.confgrid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.requestsGrid {
  display: grid;
  grid-template-columns: 1fr 2.5fr ;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fafafa;
}

.requestsGrid * {
  color: #797979;
}

.t {
  display: flex;
  justify-content: space-between;
  font-size: .9rem;
  align-items: center;
}

.desc {
  color: $primary;
}

.icon_ {
  grid-row: 1/ span 5;
}
</style>
