<template>
  <v-layout justify-center align-center wrap>
    <v-card xs12 class="elevation-0 transparent">
      <v-card-title class="justify-center">
        <h3 class="article_title stripe">Access</h3>
      </v-card-title>
      <v-card-text><p class="article_content">{{description}}</p></v-card-text>
    </v-card>
    <v-flex class xs12>
      <div class="ggmap ml-5" v-html="mapurl"></div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      description:
        '伊豆箱根鉄道大仁駅徒歩1分。すぐ横に大仁駅前駐車場があります。駐車場ご利用者にはカレートッピングサービスいたします。',
      mapurl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.477240510063!2d138.89287291524357!3d35.119762280328864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60199aa4829704d9%3A0x941ace08ced74506!2z44CSNDExLTA5NDQg6Z2Z5bKh55yM6ae_5p2x6YOh6ZW35rOJ55S656u55Y6f77yS77yR77yR4oiS77yT77yQIOmVt-azieeUuuWNl-mDqOWcsOWMuuOCu-ODs-OCv-ODvDLpmo4!5e0!3m2!1sja!2sjp!4v1550762841359" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>'
    }
  }
}
</script>

<style>
.ggmap {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
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
