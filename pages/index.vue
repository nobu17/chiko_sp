<template>
  <v-layout justify-center align-center wrap>
    <v-flex xs12>
      <v-img :src="top_image_src" aspect-ratio="1.8" />
    </v-flex>
    <v-flex xs12>
      <v-card class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">About</h3>
        </v-card-title>
        <v-card-text>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >CHICO★SPICEは静岡県駿東郡函南町で、おいしいカレーやスパイス料理を提供するカフェです。</p>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card xs12 class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">Concept</h3>
        </v-card-title>
        <v-card-text>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >鰹や昆布でとった和風だしをベースとしたスパイスカレー。</p>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >島とうがらし、塩、黒糖などの沖縄の調味料を隠し味に使っています。</p>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >本を読みながら、お酒を飲みながら、ゆったりとお過ごしください。</p>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card xs12 class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">Infomation</h3>
        </v-card-title>
        <v-card-text>
          <table
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >
            <tr>
              <td>〒419-0123 静岡県田方郡函南町間宮680</td>
            </tr>
            <tr>
              <td>電話番号：0000-00-0000</td>
            </tr>
            <tr>
              <td>ランチタイム：11:00 - 14:30</td>
            </tr>
            <tr>
              <td>ディナータイム：17:00 - 22:00</td>
            </tr>
            <tr>
              <td>定休日：木曜日</td>
            </tr>
            <tr>
              <td>LINEでお得なクーポンやお知らせを配信しています。友達追加をお願いします。</td>
            </tr>
            <tr>
              <td>
                <div
                  class="line-it-button lineInfo"
                  data-lang="ja"
                  data-type="friend"
                  data-lineid="@bzp3447p"
                  style="display: none;"
                />
                <script
                  src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js "
                  async="async"
                  defer="defer"
                />
              </td>
            </tr>
          </table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import Top from '~/assets/img/top.jpg'

export default {
  components: {},
  data() {
    return {
      topimage: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      top_image_src: require('~/assets/img/top.jpg'),
      img2: 'https://picsum.photos/500/300?image=3'
    }
  },
  mounted() {}
}
</script>
<style>
table {
  width: 100%;
}

table th {
  position: relative;
  text-align: left;
  width: 20%;
}

table th:after {
  display: block;
  content: '';
  width: 10px;
  height: 2px;
  background-color: #333;
  position: absolute;
  top: calc(50% - 1px);
  right: 20px;
}

table td {
  text-align: center;
  width: 85%;
}

.lineInfo {
  text-align: center;
}
</style>
