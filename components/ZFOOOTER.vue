<template>
  <div>
    <v-footer
      dark
      color="footer"
      padless
    >
      <v-card
        style="max-width: 1200px; padding:0 1.5rem; margin: 0 auto"
        flat
        tile
        color="footer"
        class=" text-center"
      >
        <v-card-text>
          <v-btn
            :to="footer.facebook"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              mdi-facebook
            </v-icon>
          </v-btn>
          <v-btn
            :to="footer.twitter"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              mdi-twitter
            </v-icon>
          </v-btn>
          <v-btn
            v-if="footer.pint"
            :to="footer.pint"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              mdi-pinterest
            </v-icon>
          </v-btn>
          <v-btn
            :to="footer.insta"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              mdi-instagram
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          {{ footer.content }}
        </v-card-text>
      </v-card>
    </v-footer>
    <v-footer color="footer" dark padless>
      <v-col
        class="text-center"
        cols="12"
      >
        <v-divider />

        <div style="padding-top: .9rem">
          2022 — <strong>Zimmo #TEESUPPORT</strong>
        </div>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Connection_ from '~/assets/serverConnection'
export default {
  data: () => ({

    footer: {
      content: '',
      insta: '',
      twitter: '',
      pint: '',
      facebook: ''
    }
  }),
  async mounted () {
    const footer = await Connection_.GETfooter()
    if (footer.sucess) {
      this.footer = footer.sucess
    }
  }
}
</script>

<style lang="scss">
    .zfooter {
        background-color: $accent;
        min-height: 310px;
        height: fit-content;
        padding-top: 3rem;

    }
    .footerContent {
        display: flex;
        justify-content: space-between;
    }
    .footerContent div {
        font-size: .8rem;
    }
    .contacts, .aboutUSf, .SocialMedia {
        max-width: 200px;
        width: 100%;
    }

    .location {
        max-width: 250px;
        width: 100%;
    }
    .direitos {
        padding: .5rem;
        text-align: center;
        background-color: #161616;
        color: white;
        font-weight: 700;
        margin-top: 3rem;
        font-size: .8rem;
    }
    .mapEdit {
        border: solid black 2px;
        width: 244px;
        height: 164px;
    }
</style>
