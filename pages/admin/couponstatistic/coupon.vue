<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex class="mb-2" xs12>
          <v-btn color="info" @click="goBackTop()">管理Topへ戻る</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="coupons" class="elevation-1" hide-actions>
            <template v-slot:items="props">
              <td>{{ props.item.title }}</td>
              <td>{{ getDisabledString(props.item.disabled) }}</td>
              <td>{{ props.item.limit_usage }}</td>
              <td>{{ props.item.used_number }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <loadingScreen :is-loading="isLoading" />
  </div>
</template>
<script>
import loadingScreen from '../../../components/loadingScreen'
import { CouponStatisticClinet } from '../../../lib/couponStatisticClient'

const client = new CouponStatisticClinet()

export default {
  components: {
    loadingScreen
  },
  meta: {
    requiredAuth: true
  },
  head() {
    return {
      title: 'クーポン企画統計'
    }
  },
  data() {
    return {
      errorMessage: '',
      isLoading: false,
      headers: [
        {
          text: 'クーポン名',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: '状態', value: 'disabled' },
        { text: '使用制限枚数', value: 'limit_usage' },
        { text: 'ユーザー使用数', value: 'used_number' }
      ],
      coupons: []
    }
  },
  computed: {},
  async mounted() {
    await this.loadCoupons()
  },
  methods: {
    getDisabledString(disabled) {
      if (disabled) {
        return '無効'
      } else {
        return '有効'
      }
    },
    async loadCoupons() {
      this.isLoading = true
      try {
        this.coupons = await client.readCoupons()
        console.log('coupons', this.coupons)
      } catch (err) {
        this.errorMessage = 'エラー発生:' + err
      } finally {
        this.isLoading = false
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
