<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="900" class="diag">
      <v-card>
        <v-container>
          <v-flex xs12>
            <v-data-table :headers="headers" :items="statisticDataArray" class="elevation-1" :disable-initial-sort="true" hide-actions>
              <template v-slot:items="props">
                <tr @click="{}">
                  <td>{{ props.item.coupon_name }}</td>
                  <td>{{ props.item.number }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      headers: [
        {
          text: 'クーポン名',
          align: 'start',
          value: 'key'
        },
        { text: '使用枚数', value: 'number' }
      ],
      statisticData: {},
      statisticDataArray: [{ coupon_name: '', used_number: 0 }]
    }
  },
  methods: {
    open(statisticData, coupons) {
      console.log(statisticData)
      this.dialog = true
      this.statisticData = statisticData
      this.convertToArrayAndMapCouponName(coupons)
      // this.$refs.editor.setfocus()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close() {
      this.resolve(null)
      this.dialog = false
    },
    convertToArrayAndMapCouponName(coupons) {
      // conver hashmap at first
      const hashCoupons = coupons.reduce(function(map, obj) {
        map[obj.id] = obj
        return map
      }, {})
      const array = Object.keys(this.statisticData).map(key => ({
        key: key,
        coupon_name: this.getCouponName(key, hashCoupons),
        number: this.statisticData[key]
      }))
      this.statisticDataArray = array
    },
    getCouponName(couponId, hashCoupons) {
      if (hashCoupons[couponId] && hashCoupons[couponId].title) {
        return hashCoupons[couponId].title
      } else {
        return '不明'
      }
    }
  }
}
</script>

<style>
</style>
