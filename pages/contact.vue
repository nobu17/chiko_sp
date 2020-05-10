<template>
  <v-layout justify-center align-center wrap>
    <v-card xs12 class="elevation-0 transparent">
      <v-card-title class="justify-center">
        <h3 class="article_title stripe">Contact</h3>
      </v-card-title>
      <v-card-text>
        <p class="article_content">
          下記のフォームに入力して送信をお願いいたします。<br>
          お急ぎの用事は、電話かLINEでご連絡ください。
        </p>
      </v-card-text>
    </v-card>
    <v-flex class xs12>
      <div v-html="formUrl" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      description:
        '下記のフォームに入力して送信をお願いいたします。 お急ぎの用事は、電話かLINEでご連絡ください。',
      formUrl:
        '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdIKxlkZnf3qnMvshBMLxQlBqunbPpNtQmupZvUfRn_aL2s7A/viewform?embedded=true" width="100%" height="818" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>'
    }
  }
}
</script>

<style scoped>
</style>
