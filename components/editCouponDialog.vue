<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="900" class="diag">
      <v-card>
        <v-container v-if="coupon">
          <v-flex xs12>
            <v-form ref="form" v-model="valid" class="ml-4 mr-4" lazy-validation>
              <v-text-field
                v-model="coupon.title"
                :rules="titleRules"
                :counter="15"
                label="クーポン名"
                required
              />
              <v-text-field
                v-model="coupon.message"
                :rules="messageRules"
                :counter="30"
                label="説明"
                required
              />
              <v-text-field
                v-model.number="coupon.limit_usage"
                type="number"
                :rules="limitRules"
                label="使用可能数(１ユーザごと) 0で制限なし"
                required
              />
              <v-checkbox v-model="coupon.disabled" label="無効化" />
            </v-form>
          </v-flex>
          <ImageUploader
            :file-name="coupon.img.fileName"
            :file-url="coupon.img.fileUrl"
            @update="update"
            @disabledChanged="disabledChanged"
          />
        </v-container>
        <v-flex xs12>
          <v-btn color="info" @click="submit" :disabled="(!iscommitable || !valid)">確定</v-btn>
          <v-btn color="info" @click="cancel" :disabled="!iscommitable">キャンセル</v-btn>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ImageUploader from './imageUploader'
export default {
  components: {
    ImageUploader
  },
  data() {
    return {
      iscommitable: true,
      valid: false,
      dialog: false,
      resolve: null,
      reject: null,
      coupon: null,
      titleRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'タイトルを入力して下さい。'
          }
          if (v.length > 15) {
            return '名称は15文字以内で入力してください。。'
          }
          return true
        }
      ],
      messageRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'タイトルを入力して下さい。'
          }
          if (v.length > 15) {
            return '名称は15文字以内で入力してください。。'
          }
          return true
        }
      ],
      limitRules: [
        v => {
          if (v.toString() === '') {
            return '制限を入力して下さい。'
          }
          if (v < 0 || v > 9) {
            return '0-9の値を入力してください。'
          }
          return true
        }
      ]
    }
  },
  methods: {
    open(coupon) {
      this.coupon = coupon
      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    disabledChanged(disabled) {
      this.iscommitable = !disabled
    },
    update(newVal) {
      if (newVal) {
        this.coupon.img = newVal
      } else {
        this.coupon.img = { fileName: '', fileUrl: '' }
      }
    },
    submit() {
      if (this.$refs.form.validate() && this.iscommitable) {
        this.resolve(this.coupon)
        this.coupon = null
        this.dialog = false
      }
    },
    cancel() {
      this.resolve(null)
      this.coupon = null
      this.dialog = false
    }
  }
}
</script>

<style scoped>
</style>
