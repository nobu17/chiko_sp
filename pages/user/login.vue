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
          <p>お持ちのGoogle,LINEのアカウントでログイン頂く事でお得なクーポンを提供いたします。</p>
          <p>下記のログインボタンからログインを行ってください。ログイン完了後、クーポンの画面へ移動します。</p>
        </v-flex>
        <v-flex xs12>
          <v-btn v-if="isExistCoupon()" type="button" color="info" @click="login">ログイン</v-btn>
          <p v-if="!isExistCoupon()">申し訳ございません、ただ今ご利用可能なクーポンはございません。</p>
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
import { FireStoreCouponClient } from '../../lib/firebaseCouponClient'

const couponClient = new FireStoreCouponClient()

export default {
  components: {
    loadingScreen
  },
  data() {
    return {
      couponCount: 0,
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
  async mounted() {
    if (this.isLogined) {
      this.goNextPage()
      return
    }
    this.couponCount = await couponClient.getAvailableCouponsCount()
  },
  methods: {
    async login() {
      try {
        const url = window.location.origin + '/user/coupon'
        await auth0AuthClient.loginWithRedirect(url)
      } catch (err) {
        console.error(err)
        this.errorMessage =
          'ログイン中にエラーが発生しました。画面をリロードして再度お試し下さい。'
      }
    },
    async login2() {
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
    isExistCoupon() {
      if (this.couponCount > 0) {
        return true
      }
      return false
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
