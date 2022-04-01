<template>
  <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #FDF0D5">
    <v-stepper v-model="e1" elevation="0" outlined style="margin: auto" max-width="1000px">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          Por favor ensira o seu Email.
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Verificar o chave
        </v-stepper-step>

        <v-divider />

        <v-stepper-step step="3">
          Trocar palavra-passe
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-12 pa-0"
            color="#ffffff"
            elevation="0"
            height="200px"
          >
            <v-col>
              <v-text-field
                v-model="email"
                label="Email"
                filled
              />
            </v-col>

            <v-card-text>
              Adicione o email da conta que deseja recuperar. Em seguida enviaremos um email que ira conter a chave.
            </v-card-text>
            <v-card-text style="color: red">
              {{ err }}
            </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            :disabled="isLoading"
            :loading="isLoading"
            @click="IncertEmail(e1)"
          >
            Continuar
          </v-btn>

          <v-btn to="/loginUser" text>
            Cancelar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="#efefef"
            height="200px"
          >
            <v-col>
              <v-text-field
                v-model="recoveryKey"
                type="Number"
                label="Chave de recuperacao da conta"
                filled
              />
            </v-col>

            <v-card-text>
              Preencha porFavor o espaco em branco com o codigo que foi enviado, para o seu email.
            </v-card-text>
            <v-card-text style="color: red">
              {{ err2 }}
            </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            :disabled="isLoading"
            :loading="isLoading"
            @click="Verfykey()"
          >
            Continue
          </v-btn>

          <v-btn to="/loginUser" text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="#ffffff"
            height="200px"
          >
            <v-col>
              <v-text-field
                v-model="newPass"
                label="Palavra Passe"
                filled
              />
            </v-col>

            <v-card-text>
              Preencha porFavor o espaco em branco com a sua nova Palavra passe.
            </v-card-text>
            <v-card-text style="color: red">
              {{ err3 }}
            </v-card-text>
          </v-card>
          <v-btn
            color="primary"
            :disabled="isLoading"
            :loading="isLoading"
            @click="AddNewPass()"
          >
            Continue
          </v-btn>

          <v-btn to="/loginUser" text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
export default {
  data () {
    return {
      e1: 1,
      err: '',
      err2: '',
      err3: '',
      email: '',
      isLoading: false,
      recoveryKey: 0,
      newPass: ''
    }
  },
  methods: {
    async IncertEmail (el) {
      this.isLoading = true
      const recoveryState = await Connection_.createRecoveryKey(this.email.toLocaleLowerCase())
      setTimeout(() => {
        if (recoveryState.sucess) {
        // eslint-disable-next-line no-unused-expressions
          this.isLoading = false
          console.log(recoveryState.sucess)
          this.e1 = 2
        } else {
          this.err = recoveryState.err
          this.isLoading = false
        }
      }, 1000)
    },
    async Verfykey () {
      this.isLoading = true
      const recoveryState = await Connection_.verifyRecoveryKey(this.email, this.recoveryKey)
      setTimeout(() => {
        if (recoveryState.sucess) {
        // eslint-disable-next-line no-unused-expressions
          this.isLoading = false
          console.log(recoveryState.sucess)
          this.e1 = 3
        } else {
          this.err2 = recoveryState.err
          this.isLoading = false
        }
      }, 1000)
    },
    async AddNewPass () {
      this.isLoading = true
      const recoveryState = await Connection_.changePassForForgeters(this.email, this.newPass)
      setTimeout(() => {
        if (recoveryState.sucess) {
        // eslint-disable-next-line no-unused-expressions
          this.isLoading = false
          console.log(recoveryState.sucess)
          window.location.replace(window.location.protocol + '//' + window.location.host)
        } else {
          this.err3 = recoveryState.err
          this.isLoading = false
        }
      }, 1000)
    }
  }
}
</script>

<style>

</style>
