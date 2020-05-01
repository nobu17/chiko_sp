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
              月別
            </v-tab>
            <v-tab
              ripple
            >
              日別
            </v-tab>
            <v-tab-item>
              <v-flex xs12>
                <v-data-table :headers="headers" :items="statisticDataArray.per_month_usage" class="elevation-1" hide-actions>
                  <template v-slot:items="props">
                    <tr @click="{}">
                      <td>{{ props.item.key }}</td>
                      <td>{{ props.item.number }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
            </v-tab-item>
            <v-tab-item>
              <v-data-table :headers="headers" :items="statisticDataArray.per_date_usage" class="elevation-1" hide-actions>
                <template v-slot:items="props">
                  <tr @click="{}">
                    <td>{{ props.item.key }}</td>
                    <td>{{ props.item.number }}</td>
                  </tr>
                </template>
              </v-data-table>
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
          text: '日付',
          align: 'start',
          value: 'key'
        },
        { text: '使用枚数', value: 'number' }
      ],
      statisticData: {
        per_date_usage: {},
        per_month_usage: {}
      },
      statisticDataArray: {
        per_date_usage: [],
        per_month_usage: []
      }
    }
  },
  methods: {
    open(statisticData) {
      this.dialog = true
      this.statisticData = statisticData
      this.convertToArray()
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
    convertToArray() {
      const perDate = Object.keys(this.statisticData.per_date_usage).map(
        key => ({
          key: key,
          number: this.statisticData.per_date_usage[key]
        })
      )
      const perMonth = Object.keys(this.statisticData.per_month_usage).map(
        key => ({
          key: key,
          number: this.statisticData.per_month_usage[key]
        })
      )
      this.statisticDataArray = {
        per_date_usage: perDate,
        per_month_usage: perMonth
      }
    }
  }
}
</script>

<style>
</style>
