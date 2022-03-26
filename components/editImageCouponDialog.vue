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
                v-model="coupon.password"
                :rules="passwordRules"
                :counter="10"  
                label="クーポンコード"
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
          <v-btn color="info" :disabled="(!iscommitable || !valid)" @click="submit">確定</v-btn>
          <v-btn color="info" :disabled="!iscommitable" @click="cancel">キャンセル</v-btn>
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
            return '15文字以内で入力してください。。'
          }
          return true
        }
      ],
      messageRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'タイトルを入力して下さい。'
          }
          if (v.length > 30) {
            return '30文字以内で入力してください。。'
          }
          return true
        }
      ],
      passwordRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'クーポンコードを入力して下さい。'
          }
          if (v.length > 10) {
            return '10文字以内で入力してください。。'
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
