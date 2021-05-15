<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="830" content content-class="centered-dialog">
      <v-card>
        <v-card-title>
          <p class="item mr-4">{{ name }}</p>
          <p class="item">{{ price | commaFilter | yenFilter }}</p>
        </v-card-title>
        <v-img :src="imagesrc | imageFilter" contain max-height="750" max-widh="800"/>
        <v-card-actions class='item'>{{ message }}</v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      price: '',
      message: '',
      imagesrc: '',
      dialog: false,
      resolve: null,
      reject: null
    }
  },
  methods: {
    open(name, price, message, imagesrc) {
      this.name = name
      this.price = price
      this.message = message
      this.imagesrc = imagesrc
      this.dialog = true

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close() {
      this.resolve(null)
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
</style>
