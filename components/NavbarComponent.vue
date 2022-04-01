<template>
  <div class="navbarTwo pl-8 pr-8 pt-4">
    <div class="logo">
      Logo
    </div>
    <ul class="Navbar-options">
      <router-link to="/">
        <li v-ripple>
          Pagina Principal
        </li>
      </router-link>
      <router-link to="/shop">
        <li v-ripple>
          Loja
        </li>
      </router-link>
      <li v-if="loggedOut == false" v-ripple @click="removeCookies()">
        Logout
      </li>
      <!-- <router-link v-if="false" to="/dashboard_">
        <li> Painel </li>
      </router-link> -->
      <li v-if="loggedOut == true">
        <router-link v-ripple to="/loginUser">
          <li> Autenticar </li>
        </router-link>
      </li>

      <!-- <router-link to="/userPainel">
        <li> Meu Perfil </li>
      </router-link> -->
      <li>
        <PaymentConfirmation />
      </li>
    </ul>
  </div>
</template>
<script>
import Cookies from 'js-cookie/dist/js.cookie.mjs'
import PaymentConfirmation from '~/components/AddToCart_/PaymentConf.vue'
import Connection_ from '~/assets/serverConnection'
export default {
  components: {
    PaymentConfirmation
  },
  data () {
    return {
      loggedOut: true
    }
  },
  mounted () {
    // eslint-disable-next-line eqeqeq
    if (Cookies.get(Connection_.serverApiCode + 'auth') == 'false') { this.loggedOut = true } else {
      this.loggedOut = false
    }
  },
  methods: {
    async removeCookies () {
      const res_ = await Connection_.logout()
      if (res_.sucess) {
        window.location.replace(window.location.protocol + '//' + window.location.host)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navbarTwo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

a {
  color: #383838;
  text-decoration: none;
}
.logo {
  font-weight: bold;
}

.Navbar-options {
  display: flex;
  align-items: center;
  justify-content: right;
  background-color: $navBar;
  border-radius: 8px;
  width: 70%;
}

.Navbar-options li {
  font-size: .85rem;
  font-weight: 700;
  padding-left: 1rem;
  text-decoration: none;
  list-style: none
}

  .navbarTwo {
    display: none;
  }

  @media ( min-width: 1260px ) {
    .navbarTwo {
      display: flex;
    }
  }
</style>
