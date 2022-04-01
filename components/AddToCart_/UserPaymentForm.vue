<template>
  <v-card elevation="0">
    <v-card-subtitle class="pa-0">
      Preencha por favor os seus Dados
    </v-card-subtitle>

    <v-text-field
      v-model="modifyName"
      :rules="[() => !!name_ || 'This field is required']"
      label="Nome"
    />
    <v-text-field
      v-model="modifyEmail"
      label="Email"
      :rules="[() => !!email || 'Por favor preencha os espacos em branco']"
    />
    <v-text-field
      v-model="modifyContact"
      type="number"
      label="Contacto"
      :rules="[() => !!Contact || 'Por favor preencha os espacos em branco']"
    />
    <v-textarea
      v-model="modifyLocation"
      :rules="[() => !!location || 'Por favor preencha os espacos em branco']"
      label="Localizacao"
      placeholder="Maputo, Matola, Bairro.."
    />
    <br>
    <br>
  </v-card>
</template>

<script>
export default {
  props: {
    isBtnDisabled: Function
  },
  data () {
    return {
      formHasErrors: false,
      errorMessages: '',
      name_: '',
      email: '',
      Contact: '',
      location: ''
    }
  },
  computed: {
    modifyName: {
      get () {
        return this.name_
      },
      set (newValue) {
        this.$store.commit('modifyName', newValue)
        this._props.isBtnDisabled(this.$store.state)
        this.name_ = newValue
      }
    },
    modifyContact: {
      get () {
        return this.Contact
      },
      set (newValue) {
        this.$store.commit('modifyContact', newValue)
        this.Contact = newValue
        this._props.isBtnDisabled(this.$store.state)
      }
    },
    modifyLocation: {
      get () {
        return this.location
      },
      set (newValue) {
        this.$store.commit('modifyLocation', newValue)
        this.location = newValue
        this._props.isBtnDisabled(this.$store.state)
      }
    },
    modifyEmail: {
      get () {
        return this.email
      },
      set (newValue) {
        this._props.isBtnDisabled(this.$store.state)
        this.email = newValue
        this.$store.commit('modifyEmail', newValue)
      }
    }
  }
}
</script>

<style>

</style>
