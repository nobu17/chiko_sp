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
    <v-flex xs12>
      <loadingPartialScreen :isLoading="isLoading"/>
    </v-flex>
    <v-flex v-for="(item) in lunchMenu" :key="item.id" xs12 md6>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
          @click="showMenu(item)"
        >
          <v-card-title>
            <p class="item">{{ item.name }}</p>
            <p class="item">{{ item.price | commaFilter | yenFilter}}</p>
          </v-card-title>
          <v-img :src="item.img | imageFilter" aspect-ratio="2"/>
          <v-card-actions class="message">{{ item.comment }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <p id="dinner" class="article_title stripe">Dinner Menu</p>
    </v-flex>
    <v-flex xs12>
      <loadingPartialScreen :isLoading="isLoading"/>
    </v-flex>
    <v-flex v-for="(item) in dinnerMenu" :key="item.id" xs12 md6>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
          @click="showMenu(item)"
        >
          <v-card-title>
            <p class="item">{{ item.name }}</p>
            <p class="item">{{ item.price | commaFilter | yenFilter}}</p>
          </v-card-title>
          <v-img :src="item.img | imageFilter" aspect-ratio="2"/>
          <v-card-actions class="message">{{ item.comment }}</v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <p id="drink" class="article_title stripe">Drink Menu</p>
    </v-flex>
    <v-flex xs12>
      <loadingPartialScreen :isLoading="isLoading"/>
    </v-flex>
    <v-flex v-for="(item) in drinkMenu" :key="item.id" xs12 md6>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
          @click="showMenu(item)"
        >
          <v-card-title>
            <p class="item">{{ item.name }}</p>
            <p class="item">{{ item.price | commaFilter | yenFilter}}</p>
          </v-card-title>
          <v-img :src="item.img | imageFilter" aspect-ratio="2"/>
          <v-card-actions class="message">{{ item.comment }}</v-card-actions>
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
import loadingPartialScreen from '~/components/loadingPartialScreen'
export default {
  meta: {
    requiredAuth: true
  },
  components: {
    menudialog,
    loadingPartialScreen
  },
  async mounted() {
    this.isLoading = true
    await this.$store.dispatch('menu/readAllMeenu')
    this.isLoading = false
  },
  computed: {
    lunchMenu() {
      return this.$store.getters['menu/lunchMenu']
    },
    dinnerMenu() {
      return this.$store.getters['menu/dinnerMenu']
    },
    drinkMenu() {
      return this.$store.getters['menu/drinkMenu']
    }
  },
  data() {
    return {
      scrollButtonDisplied: false,
      isLoading: false
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
      this.$refs.menudialog.open(item.name, item.price, item.comment, item.img)
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
