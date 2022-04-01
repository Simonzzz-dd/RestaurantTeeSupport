<template>
  <div style="max-width: 97%">
    <h1 style="text-align: center">
      Permissões
    </h1>
    <div style="text-align: center" class="pb-8">
      Deseja atribuir uma função ou tarefa a um dos membros de sua equipe? vamos fazer isso.
    </div>
    <h4 class="pb-4">
      Adicionar usuário
    </h4>
    <v-select
      v-model="email"
      filled
      :items="items"
      label="Selecione o usuário ao qual você deseja atribuir uma tarefa"
      dense
    />
    <h4> Tarefas </h4>
    <v-row>
      <v-col>
        <v-checkbox
          v-model="addProducts"
          label="Gestor de Produtos"
          color="#383838"
          hide-details
        />
      </v-col>
      <v-col>
        <v-checkbox
          v-model="Manager"
          label="Gestor de Tudo"
          color="#383838"
          hide-details
        />
      </v-col>
      <v-col>
        <v-checkbox
          v-model="manageMoney"
          label="Visualizador de vendas"
          color="#383838"
          hide-details
        />
      </v-col>
      <v-col>
        <v-checkbox
          v-model="handleRequests"
          label="Gestor de Vendas"
          color="#383838"
          hide-details
        />
      </v-col>
    </v-row>
    <br>
    <v-btn
      color="#f7f7f7"
      elevation="0"
      @click="AddClientPerm"
    >
      Save
    </v-btn>
    <br>
    <h4 class="mt-8 mb-8">
      Usuários com privilégios
    </h4>
    <div v-if="loading_products" style="height:350px; display: flex; align-items: center; justify-content: center">
      <v-progress-circular
        :size="30"
        color="#383838"
        indeterminate
      />
    </div>
    <div v-if="!loading_products" class="addUserGrid">
      <v-card
        v-for="clientWithPerm in clientsWithPerm"
        :key="clientWithPerm._id"
        color="#f7f7f7"
        elevation="0"
        width="390px"
      >
        <v-card-title class="text-h5">
          {{ clientWithPerm.username }}
        </v-card-title>

        <v-card-text>{{ clientWithPerm.email }}</v-card-text>
        <v-card-title> Permissões </v-card-title>
        <v-card-text>
          {{ clientWithPerm.permissions.addProduts ? "Gestor de Produtos": "" }} <br>
          {{ clientWithPerm.permissions.handleRequests ? "Gestor de Vendas": "" }} <br>
          {{ clientWithPerm.permissions.manageMoney ? "Visualizador de vendas": "" }} <br>
          {{ clientWithPerm.permissions.Manager ?"Gestor de Tudo": "" }}
        </v-card-text>
        <v-card-actions>
          <div class="pa-2 pl-5 pb-5">
            <!-- <form-popup /> -->
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
// import FormPopup from './FormPopup.vue'
import Connection_ from '~/assets/serverConnection'
export default {
  components: {
    // FormPopup
  },
  data: () => {
    return {
      checkbox: true,
      loading_products: true,
      clientsWithPerm: [],
      items: [],
      email: '',
      addProducts: false,
      Manager: false,
      manageMoney: false,
      handleRequests: false
    }
  },
  async mounted () {
    const clients = await Connection_.getAllClients()
    if (clients.sucess) {
      this.items = clients.sucess.map(ele => ele.email)
    }
    const clientsWithPerm = await Connection_.getUsersWithPerm()
    if (clientsWithPerm.sucess) {
      this.loading_products = false
      this.clientsWithPerm = clientsWithPerm.sucess
    }
  },
  methods: {
    async AddClientPerm () {
      this.loading_products = true
      const addPerm = await Connection_.AddClientsPerm(this.email, this.addProducts, this.Manager, this.manageMoney, this.handleRequests)
      console.log(addPerm)

      const clientsWithPerm = await Connection_.getUsersWithPerm()
      if (clientsWithPerm.sucess) {
        this.loading_products = false
        this.clientsWithPerm = clientsWithPerm.sucess
      }
    }
  }

}
</script>

<style>
    .addUserGrid {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
    }

</style>
