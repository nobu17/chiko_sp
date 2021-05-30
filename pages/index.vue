<template>
  <v-layout justify-center align-center wrap>
    <v-flex xs12>
      <v-img :src="top_image_src" aspect-ratio="1.6" />
    </v-flex>
    <v-flex xs12>
      <v-card class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">About</h3>
        </v-card-title>
        <v-card-text>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >
            CHICO★SPICEは静岡県田方郡函南町で、おいしいカレーやスパイス料理を提供するお店です。
          </p>
        </v-card-text>
        <v-flex xs12>
          <v-img :src="t2_img_src" />
        </v-flex>
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
          >
            鰹や昆布でとった和風だしをベースとしたスパイスカレー。
          </p>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >
            島とうがらし、塩、黒糖などの沖縄の調味料を隠し味に使っています。
          </p>
          <v-flex xs12>
            <v-img :src="t3_img_src" />
            </br>
          </v-flex>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >
            本を読みながら、お酒を飲みながら、ゆったりとお過ごしください。
          </p>
          <v-flex xs12>
            <v-img :src="t1_img_src" />
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">News</h3>
        </v-card-title>
      </v-card>
      <LoadingPartialScreen :is-loading="isLoadingNews" />
      <NewsList :items="news" />
    </v-flex>
    <!-- <v-flex xs12>
      <v-card class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">Promotion</h3>
        </v-card-title>
        <v-card-text>
          <h2>
            今ならGoToEatを利用するとかなりお得です。よろしくお願いいたします。
            </br>
            <a href="https://amp.retty.me/r/100001547492/">詳細はこちら</a>
          </h2>
          </br>
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fchicospice.jp%2Fposts%2F112615360534335&show_text=true&width=552&height=231&appId"
            width="100%"
            height="250"
            style="border:none;overflow:hidden"
            scrolling="no"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
        </v-card-text>
      </v-card>
    </v-flex> -->
    <v-flex md6 xs12>
      <v-card class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">Insta</h3>
        </v-card-title>
        <v-card-text>
          <!-- SnapWidget -->
          <script src="https://snapwidget.com/js/snapwidget.js" />
          <iframe 
            src="https://snapwidget.com/embed/926763" 
            class="snapwidget-widget" 
            allowtransparency="true" 
            frameborder="0" 
            scrolling="no" 
            style="border:none; overflow:hidden;  width:100%; "
          />
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md6 xs12>
      <v-card class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">Twitter</h3>
        </v-card-title>
        <v-card-text>
          <a
            class="twitter-timeline"
            href="https://twitter.com/ChicoSpiceCurry?ref_src=twsrc%5Etfw"
            data-height="570"
          >Tweets by (@ChicoSpiceCurry)</a>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- <v-flex xs12>
      <v-card class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">Blog</h3>
        </v-card-title>
        <v-card-text>
          <LoadingPartialScreen :isLoading="isLoadingNews" />
          <NewsDisplay :items="news" />
        </v-card-text>
      </v-card>
    </v-flex> -->
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
              <td>電話番号：080-6712-2988</td>
            </tr>
            <br>
            <tr>
              <td>
                <strong>定休日：木曜日</strong>
                <br>
              </td>
            </tr>
            <tr>
              <td>
                <strong>営業時間</strong>
                <br>モーニング:7:00 - 9:30 
                <br>※モーニングは火・水・土・日曜日のみ
                <br>ランチ:11:30 - 15:00 (L.O:14:30)
                <br>ディナー:17:30 - 21:00 (L.O:20:30) 
                <br>※ディナーは金・土曜日のみ
                <br>
              </td>
            </tr>
            <br>
            <tr>
              <td>ネットで来店予約を始めました。是非ご利用ください。</td>
            </tr>
            <tr>
              <td>
                <v-btn
                  href="https://nobu17.pythonanywhere.com"
                  target="_blank" 
                  rel="noopener noreferrer"
                  color="primary"
                  elevation="2"
                  x-large
                >
                  ネット予約サイト
                </v-btn>
              </td>
            </tr>
            <br>         
            <tr>
              <td>LINEでお得なクーポンやお知らせを配信しています。友達追加をお願いします。</td>
            </tr>
            <tr>
              <td>
                <a href="https://line.me/R/ti/p/%40bzp3447p">
                  <img
                    height="36"
                    border="0"
                    alt="友だち追加"
                    src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
                  >
                </a>
              </td>
            </tr>
          </table>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card xs12 class="elevation-0 transparent">
        <v-card-title class="justify-center">
          <h3 class="article_title stripe">Access</h3>
        </v-card-title>
        <v-card-text>
          <p
            :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
          >
            {{ description }}
          </p>
        </v-card-text>
      </v-card>
      <v-flex class xs12>
        <div class="ggmap" v-html="mapurl" />
      </v-flex>
      <v-flex class xs12>
        <p
          :class="{'article_content_xs': $vuetify.breakpoint.smAndDown, 'article_content': $vuetify.breakpoint.mdAndUp}"
        >
          駐車場情報
        </p>
        <v-img :src="parkin_img" />
      </v-flex>  
    </v-flex>
  </v-layout>
</template>

<script>
import microcmsClient from '~/lib/microcmsClient'
import NewsList from '~/components/newsList'
// import Top from '~/assets/img/top.jpg'
// import RssClinet from '~/lib/rssClient'
import LoadingPartialScreen from '~/components/loadingPartialScreen'
// import NewsDisplay from '~/components/newsDisplay'
export default {
  components: {
    LoadingPartialScreen,
    NewsList
  },
  data() {
    return {
      topimage: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      t1_img_src: require('~/assets/img/ct1.jpg'),
      t2_img_src: require('~/assets/img/ct2.jpg'),
      t3_img_src: require('~/assets/img/ct3.jpg'),
      top_image_src: require('~/assets/img/top.jpg'),
      parkin_img: require('~/assets/img/park.jpg'),
      news: [],
      isLoadingNews: true,
      img2: 'https://picsum.photos/500/300?image=3',
      description:
        '伊豆箱根鉄道 大場駅:徒歩12分、伊豆仁田駅:徒歩10分。駐車場があります。',
      mapurl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.883768983908!2d138.93596031524257!3d35.08463678033777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601991c0eac60545%3A0x3b268ab848accfcf!2zQ0hJQ0_imIVTUElDRSjjg4HjgrPjgrnjg5HjgqTjgrkp!5e0!3m2!1sja!2sjp!4v1591486734623!5m2!1sja!2sjp" width="800" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
    }
  },
  async mounted() {
    try {
      this.isLoadingNews = true
      console.log('start loading...')
      const news = await microcmsClient.getLatestNewsAsync()
      this.news = news.contents
      this.isLoadingNews = false
    } catch (e) {
      console.error('loading news failed', e)
    }
  }
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
