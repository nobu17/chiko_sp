<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}" grid-list-md text-xs-center>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">vpn_key</v-icon>クーポン
          </h3>
        </v-flex>
        <v-flex xs12>
          <p>お持ちのTwitter,Google,LINEのアカウントでログイン頂く事でお得なクーポンを提供いたします。</p>
          <p>下記のログインボタンからログインを行ってください。ログイン完了後、クーポンの画面へ移動します。</p>
        </v-flex>
        <v-flex xs12>
          <v-btn type="button" color="info" @click="login">ログイン</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn type="button" color="info" @click="logout">ログアウト</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <div data-app>
      <loadingScreen :is-loading="isLoading" />
    </div>
  </div>
</template>

<script>
import auth0AuthClient from '../../lib/auth0AuthClient'
import loadingScreen from '../../components/loadingScreen'
export default {
  components: {
    loadingScreen
  },
  data() {
    return {
      isLoading: false,
      errorMessage: ''
    }
  },
  computed: {
    isLogined() {
      return this.$store.getters['user_auth/isLogined']
    }
  },
  created() {},
  mounted() {
    if (this.isLogined) {
      this.goNextPage()
    }
  },
  methods: {
    async login() {
      try {
        const user = await auth0AuthClient.login()
        if (user) {
          this.$store.commit('user_auth/setLogginUser', user)
          this.goNextPage()
        } else {
          throw new Error('no user infomation')
        }
      } catch (err) {
        console.error(err)
        this.errorMessage =
          'ログイン中にエラーが発生しました。画面をリロードして再度お試し下さい。'
      }
    },
    async logout() {
      try {
        await auth0AuthClient.logout()
        this.$store.commit('user_auth/clearLogginUser')
      } catch (err) {
        console.error(err)
        this.errorMessage =
          'ログアウト中にエラーが発生しました。画面をリロードして再度お試し下さい。'
      }
    },
    goNextPage() {
      const url = this.$route.query.redirect
      if (url) {
        this.$router.push(url)
      } else {
        this.$router.push('/user/coupon')
      }
    }
  }
}
</script>

<style>
</style>
