<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}" grid-list-md text-xs-center>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">クーポン</h3>
          <p>使用したいクーポンを選択して会計時にご提示ください。</p>
        </v-flex>
        <v-flex class="coupon" v-for="(coupon) in coupons" :key="coupon.id" xs12 md6>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
              @click="showCoupon(coupon)"
            >
              <v-card-title>
                <p class="item mr-4">{{ coupon.title }}</p>
                <p class="item mr-4">{{ coupon.message }}</p>
                <p v-if="coupon.limit_usage !== 0" class="item">({{ coupon.limit_usage }}回まで使用可能)</p>
                <p v-if="coupon.used_number !== 0" class="item">（{{ coupon.used_number }}回使用済)</p>
              </v-card-title>
              <v-img :src="coupon.img.fileUrl | imageFilter" aspect-ratio="2" />
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12>
          <p v-if="optionMessage != ''" :value="true">{{ optionMessage }}</p>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12>
          <p>再ログインしたい場合は下記ボタンを押下してください。</p>
          <v-btn type="button" color="info" @click="logout">ログアウト</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <div data-app>
      <loadingScreen :is-loading="isLoading" />
    </div>
    <couponDisplayDialog ref="couponDisplayDialog" />
  </div>
</template>

<script>
import couponDisplayDialog from '~/components/couponDisplayDialog.vue'
import auth0AuthClient from '../../lib/auth0AuthClient'
import { FireStoreCouponClient } from '../../lib/firebaseCouponClient'
import loadingScreen from '../../components/loadingScreen'

const couponClient = new FireStoreCouponClient()

export default {
  components: {
    loadingScreen,
    couponDisplayDialog
  },
  meta: {
    requiredUserAuth: true
  },
  data() {
    return {
      isLoading: false,
      errorMessage: '',
      optionMessage: '',
      coupons: []
    }
  },
  computed: {
    isLogined() {
      return this.$store.getters['user_auth/isLogined']
    },
    user() {
      return this.$store.getters['user_auth/user']
    }
  },
  created() {},
  async mounted() {
    if (this.user) {
      await this.loadCoupons(this.user.id)
    }
  },
  methods: {
    async loadCoupons(userId) {
      try {
        this.isLoading = true
        this.coupons = await couponClient.getAvailaleCoupons(userId)
        if (!this.coupons || this.coupons.length === 0) {
          this.optionMessage = '現在使用可能なクーポンはございません。'
        }
      } catch (err) {
        console.error(err)
        this.errorMessage =
          '読み込みに失敗しました。画面をリロードしてください。'
      } finally {
        this.isLoading = false
      }
    },
    async showCoupon(coupon) {
      const isUseCoupon = await this.$refs.couponDisplayDialog.open(
        coupon.title,
        coupon.message,
        coupon.img.fileUrl
      )
      if (isUseCoupon) {
        await this.useCoupon(coupon)
        await this.loadCoupons(this.user.id)
      }
    },
    async useCoupon(coupon) {
      try {
        this.isLoading = true
        await couponClient.useCoupon(this.user.id, coupon.id)
      } catch (err) {
        console.error(err)
        this.errorMessage = 'データ更新に失敗しました。'
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      try {
        await auth0AuthClient.logout()
        this.$store.commit('user_auth/clearLogginUser')
        this.$router.push('/user/login')
      } catch (err) {
        console.error(err)
        this.errorMessage =
          'ログアウト中にエラーが発生しました。画面をリロードして再度お試し下さい。'
      }
    }
  }
}
</script>

<style scoped>
.coupon {
  border: medium solid black;
}
</style>
