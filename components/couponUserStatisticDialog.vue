<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="900" class="diag">
      <v-card>
        <v-container>
          <v-tabs
            v-model="active"
            color="cyan"
            dark
            slider-color="yellow"
          >
            <v-tab
              ripple
            >
              企画別
            </v-tab>
            <v-tab
              ripple
            >
              生データ
            </v-tab>
            <v-tab-item>
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
            </v-tab-item>
            <v-tab-item>
              <v-flex xs12>
                <p>※直近100件のみ表示</p>
                <v-data-table :headers="headersLog" :items="statisticData.log" class="elevation-1" :disable-initial-sort="true" hide-actions>
                  <template v-slot:items="props">
                    <tr @click="{}">
                      <td>{{ props.item.used_time }}</td>
                      <td>{{ getCouponName(props.item.coupon_id) }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
            </v-tab-item>
          </v-tabs>
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
      active: null,
      dialog: false,
      resolve: null,
      reject: null,
      headers: [
        {
          text: 'クーポン名',
          value: 'key'
        },
        { text: '使用枚数', value: 'number' }
      ],
      headersLog: [
        {
          text: '使用日時',
          value: 'used_time'
        },
        { text: 'クーポン名' }
      ],
      statisticData: {
        usage: {},
        log: []
      },
      statisticDataArray: [{ coupon_name: '', used_number: 0 }],
      coupons: {}
    }
  },
  methods: {
    open(statisticData, coupons) {
      console.log(statisticData)
      this.dialog = true
      this.statisticData = statisticData
      // conver hashmap at first
      this.coupons = coupons.reduce(function(map, obj) {
        map[obj.id] = obj
        return map
      }, {})
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
      const array = Object.keys(this.statisticData.usage)
        .map(key => ({
          key: key,
          coupon_name: this.getCouponName(key),
          number: this.statisticData.usage[key]
        }))
        .filter(x => x.coupon_name)
      this.statisticDataArray = array
    },
    getCouponName(couponId) {
      if (this.coupons[couponId] && this.coupons[couponId].title) {
        return this.coupons[couponId].title
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
</style>
