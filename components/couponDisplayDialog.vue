<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="830" content content-class="centered-dialog">
      <v-card>
        <v-card-title>
          <p class="item mr-4">{{ title }}</p>
          <p class="item">{{ message }}</p>
        </v-card-title>
        <v-img :src="imagesrc | imageFilter" contain max-height="750" max-widh="800" />
        <p class="warn-message">使用するボタンは使用時に店員が押下します。お客様は押下しないでください。</p>
        <v-card-actions class="item">
          <v-btn type="button" color="info" @click="use">使用する</v-btn>
          <v-btn type="button" color="danger" @click="cancel">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">確認</v-card-title>
        <v-card-text>使用するボタンは使用時に店員が押下します。押下後は使用できなくなりますがよろしいですか？.</v-card-text>
        <v-card-actions>
          <v-btn text color="info" @click="confirmed">使用する</v-btn>
          <v-btn text @click="cancelConfirmed">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      message: '',
      imagesrc: '',
      dialog: false,
      resolve: null,
      reject: null,
      confirmDialog: false
    }
  },
  methods: {
    open(title, message, imagesrc) {
      this.title = title
      this.message = message
      this.imagesrc = imagesrc
      this.dialog = true
      this.confirmDialog = false

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    use() {
      this.confirmDialog = true
    },
    confirmed() {
      this.confirmDialog = false
      this.resolve(true)
      this.dialog = false
    },
    cancelConfirmed() {
      this.confirmDialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.item {
  margin: 3px;
  letter-spacing: 4px;
  font-size: 17px;
  line-height: 18px;
}
.warn-message {
  margin: 3px;
  color: red;
}
</style>
