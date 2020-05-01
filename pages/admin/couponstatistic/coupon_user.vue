<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex class="mb-2" xs12>
          <v-btn color="info" @click="goBackTop()">管理Topへ戻る</v-btn>
        </v-flex>
        <v-flex xs12>
          <p>選択する事で詳細情報を確認できます。</p>
          <p>直近50ユーザの情報のみ表示します。</p>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="users" class="elevation-1" :disable-initial-sort="true" hide-actions>
            <template v-slot:items="props">
              <tr @click="recordSelected(props.item.id)">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.nickname }}</td>
                <td>{{ getServiceKind(props.item.id) }}</td>
                <td>{{ props.item.last_updated }}</td>
                <td>{{ props.item.created }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <loadingScreen :is-loading="isLoading" />
    <couponUserStatisticDialog ref="couponUserStatisticDialog" />
  </div>
</template>
<script>
import loadingScreen from '../../../components/loadingScreen'
import { CouponStatisticClinet } from '../../../lib/couponStatisticClient'
import { FireStoreUserClient } from '../../../lib/firebaseUserClient'
import couponUserStatisticDialog from '../../../components/couponUserStatisticDialog'

const couponClient = new CouponStatisticClinet()
const userClient = new FireStoreUserClient()

export default {
  components: {
    loadingScreen,
    couponUserStatisticDialog
  },
  meta: {
    requiredAuth: true
  },
  head() {
    return {
      title: 'クーポンユーザ統計'
    }
  },
  data() {
    return {
      errorMessage: '',
      isLoading: false,
      headers: [
        {
          text: 'ユーザ名',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'ニックネーム', value: 'nickname' },
        { text: '種別', value: 'id' },
        { text: '最終ログイン', value: 'last_updated' },
        { text: '作成日', value: 'created' }
      ],
      users: [],
      coupons: {},
      userUsages: {}
    }
  },
  computed: {},
  async mounted() {
    await this.loadUsers()
    await this.loadCoupons()
  },
  methods: {
    getServiceKind(userId) {
      return userId.split('|')[0]
    },
    async recordSelected(userId) {
      const data = await this.loadUserUsage(userId)
      console.log(data)
      if (data.usage && Object.keys(data.usage).length) {
        await this.$refs.couponUserStatisticDialog.open(data, this.coupons)
      } else {
        alert('データがありません')
      }
    },
    async loadCoupons() {
      this.isLoading = true
      try {
        this.coupons = await couponClient.readCouponsAsync()
      } catch (err) {
        console.error(err)
        this.errorMessage = 'クーポン情報読み込みでエラー発生:' + err
      } finally {
        this.isLoading = false
      }
    },
    async loadUsers() {
      this.isLoading = true
      try {
        this.users = await userClient.readUsers()
      } catch (err) {
        console.error(err)
        this.errorMessage = 'ユーザ読み込みでエラー発生:' + err
      } finally {
        this.isLoading = false
      }
    },
    async loadUserUsage(userId) {
      if (this.userUsages[userId]) {
        return this.userUsages[userId]
      }
      this.isLoading = true
      try {
        const usage = await couponClient.readCouponUserUsage(userId)
        // cache
        if (usage) {
          this.userUsages[userId] = usage
        }
        return usage
      } catch (err) {
        console.error(err)
        this.errorMessage = '読み込みでエラー発生:' + err
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
