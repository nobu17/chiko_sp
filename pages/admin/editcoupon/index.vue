<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex class="mb-2" xs12>
          <v-btn color="info" @click="addNew()">新規作成</v-btn>
          <v-btn color="info" @click="goBackTop()">管理Topへ戻る</v-btn>
        </v-flex>
        <v-flex class="mb-2" xs12>
          <label>
            ※ゴミ箱を選択で削除
            <br />※削除すると使用履歴等は見れなくなるので、通常は選択して無効化を選ぶ事
            <br />※順序はドラッグドロップで並び替え可能
          </label>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12>
          <v-list>
            <draggable v-model="editCoupons">
              <v-list-tile
                v-for="(coupon, index) in editCoupons"
                :key="coupon.id"
                avatar
                @click="click"
              >
                <v-list-tile-avatar>
                  <img :src="coupon.img.fileUrl | imageFilter" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title
                    @click="editCoupon(coupon)"
                    v-text="displayCouponTitle(coupon)"
                  />
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn outline color="red" @click="deleteCoupon(index)">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </draggable>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
    <editCouponDialog ref="editCouponDialog" />
    <loadingScreen :is-loading="isLoading" />
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import loadingScreen from '../../../components/loadingScreen'
import editCouponDialog from '../../../components/editCouponDialog'

export default {
  components: {
    draggable,
    loadingScreen,
    editCouponDialog
  },
  meta: {
    requiredAuth: true
  },
  head() {
    return {
      title: 'クーポン編集'
    }
  },
  data() {
    return {
      errorMessage: '',
      isLoading: false
    }
  },
  computed: {
    editCoupons: {
      get() {
        return this.$store.getters['coupon_edit/editCoupons']
      },
      async set(val) {
        // ドラッグドロップで並び替え時
        this.isLoading = true
        // 先に表示を並び替える
        this.$store.commit('coupon_edit/setEditCoupons', { coupons: val })
        await this.$store.dispatch('coupon_edit/updateDispOrderAsync', {
          coupons: val
        })
        this.isLoading = false
      }
    }
  },
  async mounted() {
    await this.loadCoupons()
  },
  methods: {
    click() {}, // this is duumy for ui image
    async addNew() {
      this.errorMessage = ''
      const target = {
        id: '',
        title: '',
        message: '',
        disabled: false,
        limit_usage: 0,
        used_number: 0,
        img: {
          fileName: '',
          fileUrl: ''
        }
      }
      const data = await this.$refs.editCouponDialog.open(target)
      if (data) {
        this.isLoading = true
        try {
          await this.$store.dispatch('coupon_edit/addCouponAsync', {
            coupon: data
          })
        } catch (err) {
          this.errorMessage = 'エラー発生:' + err
        } finally {
          this.isLoading = false
        }
      }
    },
    displayCouponTitle(coupon) {
      if (coupon.disabled) {
        return '(無効)' + coupon.title
      }
      return coupon.title
    },
    async loadCoupons() {
      try {
        this.isLoading = true
        await this.$store.dispatch('coupon_edit/readEditCoupons')
      } catch (err) {
        console.error(err)
        this.errorMessage = '読み込みに失敗しました。'
      } finally {
        this.isLoading = false
      }
    },
    async editCoupon(coupon) {
      this.errorMessage = ''
      const data = await this.$refs.editCouponDialog.open(
        JSON.parse(JSON.stringify(coupon))
      )
      if (data) {
        this.isLoading = true
        try {
          await this.$store.dispatch('coupon_edit/editCouponAsync', {
            coupon: data
          })
        } catch (err) {
          this.errorMessage = 'エラー発生:' + err
        } finally {
          this.isLoading = false
        }
      }
    },
    async deleteCoupon(index) {
      if (confirm('削除しますか？')) {
        this.errorMessage = ''
        this.isLoading = true
        try {
          await this.$store.dispatch('coupon_edit/deleteCouponAsync', {
            removeIndex: index
          })
        } catch (err) {
          this.errorMessage = 'エラーが発生:' + err
        } finally {
          this.isLoading = false
        }
      }
    },
    goBackTop() {
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
.sub_title {
  font-size: 13px;
}
</style>
