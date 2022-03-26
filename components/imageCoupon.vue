<template>
  <v-card>
    <v-card-title class="justify-center">
      <h3 class="article_title stripe">{{ coupon.title }}</h3>
    </v-card-title>
    <v-img :src="coupon.img.fileUrl | imageFilter" contain max-height="750" max-widh="800" />
    <v-card-text>
      {{ coupon.message }}
      <p class="warn-message">※会計時に本画像をお見せください。</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    coupon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
