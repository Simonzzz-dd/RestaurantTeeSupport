<template>
  <div
    class="login-container"
  >
    <v-card
      outlined
      class="login"
    >
      <h5 style="padding-bottom: 2rem">
        Cadastre sua conta
      </h5>
      <label> Email </label>
      <v-text-field v-model="Email" :rules="rules" />
      <label> Palavra Passe</label>
      <div style="display: flex; justify-content: center; align-items: center">
        <v-text-field v-model="Password" :rules="Password_" :type="type_" />
        <v-btn
          dark
          elevation="0"
          small
          tile
          style="margin-left: .5rem"
          color="#383838"
          @click="seeOrNot"
        >
          <v-icon dark>
            {{ icon }}
          </v-icon>
        </v-btn>
      </div>

      <label> Username </label>
      <v-text-field v-model="username" />
      <label> Contacto </label>
      <v-otp-input
        v-model="phoneNumber"
        length="9"
        plain
        type="number"
      />
      <br>
      <v-btn
        elevation="0"
        dark
        @click="login()"
      >
        Registrar
      </v-btn>
      <v-btn
        elevation="0"
        plain
        color="terciary"
        to="/loginUser"
      >
        Entrar na Conta
      </v-btn>
      <div class="err">
        {{ err }}
      </div>
    </v-card>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection.js'
export default {

  data: () => ({
    rules: [
      value => !!value || 'Required.',
      value => (value || '').length <= 35 || 'Max 35 characters',
      (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    ],
    Password_: [
      value => !!value || 'Password Required.',
      value => (value || '').length >= 7 || 'min width 7 characters'
    ],
    Email: '',
    Password: '',
    username: '',
    phoneNumber: '',
    err: '',
    icon: 'mdi-eye',
    type_: 'password'
  }),
  methods: {
    // eslint-disable-next-line require-await
    async login () {
      const data = await Connection_.Signup(this.username, this.Password, this.Email, this.phoneNumber)
      console.log(data)
      if (data.err) {
        this.err = data.err.msg
      } else {
        window.location.replace(window.location.protocol + '//' + window.location.host)
      }
    },
    seeOrNot () {
      if (this.type_ === 'password') {
        this.type_ = 'text'
        this.icon = 'mdi-eye-off'
      } else {
        this.type_ = 'password'
        this.icon = 'mdi-eye'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .login-container {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $homepageBack;
  }

  .err {
    padding: 1rem 0;
    color: red;
  }

  .login {
    background-color: white;
    padding: 1rem;
    width: 100%;
    max-width: 400px;
  }
</style>
