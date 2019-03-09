<template>
  <v-layout wrap>
    <v-flex xs12 class="justify-center">
      <v-btn xs4 flat @click="scroll('lunch')">Lunch</v-btn>
      <v-btn xs4 flat @click="scroll('dinner')">Dinner</v-btn>
      <v-btn xs4 flat @click="scroll('drink')">Drink</v-btn>
    </v-flex>
    <v-flex xs12>
      <p class="article_title stripe" id="lunch">Lunch Menu</p>
    </v-flex>
    <v-flex v-for="(item,index) in menuinfo.lunch" :key="index" xs12 md6>
      <v-hover>
        <v-card
          @click="showMenu(item)"
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
        >
          <v-card-title>
            <p class="item">{{item.name}}</p>
            <p class="item">{{item.price}}</p>
          </v-card-title>
          <v-img :src="item.src" aspect-ratio="2"></v-img>
          <v-card-actions class="message">{{ item.message }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <p class="article_title stripe" id="dinner">Dinner Menu</p>
    </v-flex>
    <v-flex v-for="(item,index) in menuinfo.dinner" :key="index" xs12 md6>
      <v-hover>
        <v-card
          @click="showMenu(item)"
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
        >
          <v-card-title>
            <p class="item">{{item.name}}</p>
            <p class="item">{{item.price}}</p>
          </v-card-title>
          <v-img :src="item.src" aspect-ratio="2"></v-img>
          <v-card-actions class="message">{{ item.message }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <p class="article_title stripe" id="drink">Drink Menu</p>
    </v-flex>
    <v-flex v-for="(item,index) in menuinfo.drink" :key="index" xs12 md6>
      <v-hover>
        <v-card
          @click="showMenu(item)"
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
        >
          <v-card-title>
            <p class="item">{{item.name}}</p>
            <p class="item">{{item.price}}</p>
          </v-card-title>
          <v-img :src="item.src" aspect-ratio="2"></v-img>
          <v-card-actions class="message">{{ item.message }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <menudialog ref="menudialog"/>
  </v-layout>
</template>

<script>
import menudialog from '~/components/menudialog.vue'
export default {
  components: {
    menudialog
  },
  methods: {
    scroll(name) {
      const elem = document.getElementById(name)
      elem.scrollIntoView()
    },
    showMenu(item) {
      this.$refs.menudialog.open(item.name, item.price, item.message, item.src)
    }
  },
  data() {
    return {
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
</style>
