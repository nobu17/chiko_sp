<template>
  <v-layout justify-center align-center wrap>
    <v-card xs12 class="elevation-0 transparent">
      <v-card-title class="justify-center">
        <h3 class="article_title stripe">Access</h3>
      </v-card-title>
      <v-card-text>
        <p class="article_content">{{ description }}</p>
      </v-card-text>
    </v-card>
    <v-flex class xs12>
      <div class="ggmap" v-html="mapurl" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      description: '伊豆箱根鉄道大場駅駅徒歩15分。駐車場があります。',
      mapurl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.8806069678203!2d138.93632851524276!3d35.08471578033757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6019911823f19ee7%3A0x267e733f627c91f0!2z44CSNDE5LTAxMjMg6Z2Z5bKh55yM55Sw5pa56YOh5Ye95Y2X55S66ZaT5a6u77yW77yY77yQ!5e0!3m2!1sja!2sjp!4v1586253628009!5m2!1sja!2sjp" width="800" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
    }
  }
}
</script>

<style>
.ggmap {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  margin-left: 10px;
  height: 0;
  overflow: hidden;
}

.ggmap iframe,
.ggmap object,
.ggmap embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
}
</style>
