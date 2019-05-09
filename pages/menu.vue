<template>
  <v-layout v-scroll="onScroll" wrap>
    <v-flex xs12 class="justify-center">
      <v-btn xs4 flat @click="scroll('lunch')">Lunch</v-btn>
      <v-btn xs4 flat @click="scroll('dinner')">Dinner</v-btn>
      <v-btn xs4 flat @click="scroll('drink')">Drink</v-btn>
    </v-flex>
    <v-flex xs12>
      <p id="lunch" class="article_title stripe">Lunch Menu</p>
    </v-flex>
    <v-flex v-for="(item,index) in menuinfo.lunch" :key="index" xs12 md6>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
          @click="showMenu(item)"
        >
          <v-card-title>
            <p class="item">{{ item.name }}</p>
            <p class="item">{{ item.price }}</p>
          </v-card-title>
          <v-img :src="item.src" aspect-ratio="2"/>
          <v-card-actions class="message">{{ item.message }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <p id="dinner" class="article_title stripe">Dinner Menu</p>
    </v-flex>
    <v-flex v-for="(item,index) in menuinfo.dinner" :key="index" xs12 md6>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
          @click="showMenu(item)"
        >
          <v-card-title>
            <p class="item">{{ item.name }}</p>
            <p class="item">{{ item.price }}</p>
          </v-card-title>
          <v-img :src="item.src" aspect-ratio="2"/>
          <v-card-actions class="message">{{ item.message }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <p id="drink" class="article_title stripe">Drink Menu</p>
    </v-flex>
    <v-flex v-for="(item,index) in menuinfo.drink" :key="index" xs12 md6>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
          @click="showMenu(item)"
        >
          <v-card-title>
            <p class="item">{{ item.name }}</p>
            <p class="item">{{ item.price }}</p>
          </v-card-title>
          <v-img :src="item.src" aspect-ratio="2"/>
          <v-card-actions class="message">{{ item.message }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-fab-transition>
      <v-btn
        v-show="scrollButtonDisplied"
        class="topButton"
        color="pink"
        dark
        fixed
        absolute
        bottom
        right
        fab
        @click="scrollTop()"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>
    <menudialog ref="menudialog"/>
  </v-layout>
</template>

<script>
import menudialog from '~/components/menudialog.vue'
export default {
  meta: {
    requiredAuth: true
  },
  components: {
    menudialog
  },
  data() {
    return {
      scrollButtonDisplied: false,
      menuinfo: {
        lunch: [
          {
            name: 'スパイスカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: 'キーマカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: 'バシャバシャカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: '普通のカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          }
        ],
        dinner: [
          {
            name: 'スパイスカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: 'キーマカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: 'バシャバシャカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: '普通のカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          }
        ],
        drink: [
          {
            name: 'スパイスカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: 'キーマカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: 'バシャバシャカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          },
          {
            name: '普通のカレー',
            src: require('~/assets/img/top.jpg'),
            message: 'おいしいカレーです。',
            price: '￥700'
          }
        ]
      }
    }
  },
  methods: {
    onScroll() {
      const top = window.pageYOffset
      if (top > 300) {
        this.scrollButtonDisplied = true
      } else {
        this.scrollButtonDisplied = false
      }
    },
    scrollTop() {
      window.scrollTo(0, 0)
    },
    scroll(name) {
      const elem = document.getElementById(name)
      elem.scrollIntoView()
    },
    showMenu(item) {
      this.$refs.menudialog.open(item.name, item.price, item.message, item.src)
    }
  }
}
</script>

<style>
.item {
  margin: 3px;
  letter-spacing: 4px;
  font-size: 17px;
  line-height: 18px;
}
.message {
  letter-spacing: 2px;
  font-size: 14px;
}
.topButton {
  margin-bottom: 40px;
}
</style>
