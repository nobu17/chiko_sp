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
    <v-flex xs12 v-for="(catItems) in lunchMenu" :key="catItems.category">
      <v-layout wrap>
        <v-flex xs12>
          <p class="category_title sub_stripe">{{ catItems.category }}</p>
        </v-flex>
        <v-flex v-for="(item) in catItems.menu" :key="item.id" xs12 md6>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
              @click="showMenu(item)"
            >
              <v-card-title>
                <p class="item mr-4">{{ item.name }}</p>
                <p class="item">{{ item.price | commaFilter | yenFilter}}</p>
              </v-card-title>
              <v-img :src="item.img.fileUrl | imageFilter" aspect-ratio="2"/>
              <v-card-actions class="message">{{ item.comment }}</v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <p id="dinner" class="article_title stripe">Dinner Menu</p>
    </v-flex>
    <v-flex xs12>
      <loadingPartialScreen :isLoading="isLoading"/>
    </v-flex>
    <v-flex xs12 v-for="(catItems) in dinnerMenu" :key="catItems.category">
      <v-layout wrap>
        <v-flex xs12>
          <p class="category_title sub_stripe">{{ catItems.category }}</p>
        </v-flex>

        <v-flex v-for="(item) in catItems.menu" :key="item.id" xs12 md6>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
              @click="showMenu(item)"
            >
              <v-card-title>
                <p class="item mr-4">{{ item.name }}</p>
                <p class="item">{{ item.price | commaFilter | yenFilter}}</p>
              </v-card-title>
              <v-img :src="item.img.fileUrl | imageFilter" aspect-ratio="2"/>
              <v-card-actions class="message">{{ item.comment }}</v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <p id="drink" class="article_title stripe">Drink Menu</p>
    </v-flex>
    <v-flex xs12>
      <loadingPartialScreen :isLoading="isLoading"/>
    </v-flex>
    <v-flex xs12 v-for="(catItems) in drinkMenu" :key="catItems.category">
      <v-layout wrap>
        <v-flex xs12>
          <p class="category_title sub_stripe">{{ catItems.category }}</p>
        </v-flex>
          <v-flex v-for="(item) in catItems.menu" :key="item.id" xs12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`ma-2 transparent elevation-${hover ? 12 : 0}`"
                @click="showMenu(item)"
              >
                <v-card-title>
                  <p class="item mr-4">{{ item.name }}</p>
                  <p class="item">{{ item.price | commaFilter | yenFilter}}</p>
                </v-card-title>
                <v-img :src="item.img.fileUrl | imageFilter" aspect-ratio="2"/>
                <v-card-actions class="message">{{ item.comment }}</v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
      </v-layout>
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
  components: {
    menudialog,
    loadingPartialScreen
  },
  async mounted() {
    this.isLoading = true
    await this.$store.dispatch('menu/readAllMenu')
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
      if (top > 250) {
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
      console.log('pos', elem.offsetTop)
      window.scrollTo({
        left: elem.offsetLeft,
        top: elem.offsetTop,
        behavior: 'smooth'
      })
    },
    showMenu(item) {
      this.$refs.menudialog.open(
        item.name,
        item.price,
        item.comment,
        item.img.fileUrl
      )
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
.message {
  letter-spacing: 2px;
  font-size: 17px;
}
.topButton {
  margin-bottom: 40px;
}
.category_title {
  margin-left: 6px;
  font-size: 23px;
  line-height: 28px;
}
.sub_stripe {
  position: relative;
  padding: 0.3em;
}
.sub_stripe:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: repeating-linear-gradient(
    -45deg,
    red,
    red 2px,
    white 2px,
    white 4px
  );
}
</style>
