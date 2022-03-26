<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}" grid-list-md text-xs-center>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="article_title stripe">クーポン</h3>
        </v-flex>
        <v-flex xs12>
          <p class="mt-4 mb-4">LINEで配信されているクーポンコードを入力してください。</p>
          <v-form ref="form" v-model="valid" class="ml-4 mr-4" lazy-validation>
            <v-text-field
              v-model="couponCode"
              :rules="codeRules"
              :counter="15"
              label="クーポンコード"
              required
            />
          </v-form>
        </v-flex>
        <v-flex xs12>
          <v-btn color="info" :disabled="!valid" @click="submit">確定</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12>
          <imageCoupon v-if="selectedCoupon" :coupon="selectedCoupon" />
        </v-flex>
      </v-layout>
    </v-container>
    <div data-app>
      <loadingScreen :is-loading="isLoading" />
    </div>
  </div>
</template>

<script>
import loadingScreen from '../components/loadingScreen'
import imageCoupon from '../components/imageCoupon'

export default {
  components: {
    loadingScreen,
    imageCoupon
  },
  data() {
    return {
      isLoading: false,
      errorMessage: '',
      couponCode: '',
      valid: false,
      selectedCoupon: null,
      codeRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'クーポンコードを入力して下さい。'
          }
          if (v.length > 15) {
            return '15文字以内で入力してください。。'
          }
          return true
        }
      ]
    }
  },
  computed: {
    availableCoupons: {
      get() {
        return this.$store.getters['image_coupon/availableCoupons']
      },
      async set(val) {}
    }
  },
  created() {},
  async mounted() {
    await this.loadCoupons()
  },
  methods: {
    async loadCoupons() {
      try {
        this.isLoading = true
        await this.$store.dispatch('image_coupon/readAvailableCoupons')
      } catch (err) {
        console.error(err)
        this.errorMessage =
          '読み込みに失敗しました。画面をリロードしてください。'
      } finally {
        this.isLoading = false
      }
    },
    submit() {
      console.log('this.availableCoupons', this.availableCoupons)
      this.selectedCoupon = null
      this.errorMessage = ''
      if (this.$refs.form.validate()) {
        const coupons = this.filterCoupon(this.couponCode)
        if (coupons && coupons.length > 0) {
          this.selectedCoupon = coupons[0]
        } else {
          this.errorMessage =
            'クーポンが見つかりませんでした。入力したコードをご確認ください。'
        }
      }
    },
    filterCoupon(couponCode) {
      return this.availableCoupons.filter(c => c.password === couponCode)
    }
  }
}
</script>

<style scoped>
.coupon {
  border: medium solid black;
}
</style>
