<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      color="homepageBack"
      app

      :mini-variant="true"
      fixed
      style="z-index:100"
    >
      <v-list v-if="isActive">
        <div v-for="(item, i) in items" :key="i">
          <v-list-item
            v-if="item.condition()"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon size="25" color="#C89851">
                {{ item.icon }}
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </div>
        <v-list-item>
          <v-list-item-action>
            <cart-for-side-bar />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="#383838"
      class="navbar"
      dark
      elevation="0"
      dense
      height="55"
      style="max-height: 55px"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <Nuxt class="border-right-" />
    </v-main>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie/dist/js.cookie.mjs'
import Connection_ from '~/assets/serverConnection.js'
import cartForSideBar from '~/components/AddToCart_/cartForSideBar.vue'
export default {
  name: 'DefaultLayout',
  components: { cartForSideBar },
  data () {
    console.log()
    return {
      isActive: false,
      drawer: true,
      items: [''],
      title: 'Vuetify.js'
    }
  },
  async mounted () {
    this.$store.dispatch('getAllProducts')
    this.$store.dispatch('getAllSales_')
    const cookies_ = await Connection_.getCookies()
    console.log(cookies_)
    const ArrayOfConditions = [
      {
        icon: 'mdi-home-outline',
        to: '/',
        condition () {
          return true
        }
      },
      {
        icon: 'mdi-basket-outline ',
        to: '/shop',
        condition () {
          return true
        }
      },
      {
        icon: 'mdi-chart-bell-curve',
        to: '/dashboard_',
        condition () {
          if (Cookies.get(Connection_.serverApiCode + 'handleRequests') === 'true' || Cookies.get(Connection_.serverApiCode + 'addProduts') === 'true' || Cookies.get(Connection_.serverApiCode + 'manageMoney') === 'true' || Cookies.get(Connection_.serverApiCode + 'Manager') === 'true' || Cookies.get(Connection_.serverApiCode + 'addProduts') === 'true') { return true } else {
            return false
          }
        }
      },
      {
        icon: 'mdi-login',
        to: '/loginUser',
        condition () {
          if (Cookies.get(Connection_.serverApiCode + 'auth') === 'false') { return true } else {
            return false
          }
        }
      },
      {
        icon: 'mdi-account-outline',
        to: '/userPainel',
        condition () {
          if (Cookies.get(Connection_.serverApiCode + 'auth') === 'true') { return true } else {
            return false
          }
        }
      }
    ]
    this.items = ArrayOfConditions
    this.isActive = true
    /*eslint-disable */
    console.log(Connection_)
  }
}
</script>

<style lang="scss">

@font-face {
    font-family: "Vanisha";
    src: local("Vanisha"),
     url(~assets/fonts/Vanisha.ttf) format("truetype");
}


html {
    font-family: "Oxygen";
}

@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600;700&display=swap');

*{
  // font-family: 'Montserrat Alternates', sans-serif;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}
  .navbar {
    display: none;
    z-index: 10;
  }
  .border-right- {
    border-left: solid 1px #e3c9a2;
    // height: 100vh;
  }
  @media ( max-width: 1260px ) {
    .navbar {
      display: flex;
    }
      .border-right- {
    border-left: none;
    // height: 100vh;
  }

  }


  .v-navigation-drawer__border {
    background-color: transparent;
    opacity: 0;
    display: none;
  }
      body {
      overflow-y: hidden;
      overflow-x: hidden;
      width: 100vw;
      max-width: 100vw;
    }

  @media ( min-width: 860px ) {

    *::-webkit-scrollbar {
      width: .6rem;
    }

    *::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    *::-webkit-scrollbar-thumb {
      background-color: #5c5c5c;
      // outline: 2px solid rgb(255, 255, 255);
      border-radius: 8px;
    }
  }
</style>