<template>
  <v-app>
    <v-toolbar dark app>
      <v-toolbar-title class="headline">
        <span class="px-2">CHICO★SPICE</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in filteredMenu" :key="item.title" flat @click="changePage(item)">
          <v-icon class="pr-1">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"/>
        <v-list>
          <v-list-tile v-for="item in filteredMenu" :key="item.title" :to="item.link">
            <v-list-tile-content>
              <v-list-tile-title>
                <v-icon class="pr-1">{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <Footer/>
    <div data-app>
      <loadingScreen :isLoading="isLoading"/>
    </div>
  </v-app>
</template>

<script>
// import firebaseAuthClient from '../lib/firebaseAuthClient'
import loadingScreen from '../components/loadingScreen'
import Footer from '~/components/footer.vue'
export default {
  components: {
    Footer,
    loadingScreen
  },
  mounted() {},
  computed: {
    isLogined() {
      return this.$store.getters['auth/isLogined']
    },
    filteredMenu() {
      return this.menu.filter(item => {
        // 認証設定が無ければ無条件ok
        if (!item.isNeedLogin) {
          return true
        }
        if (item.isNeedLogin) {
          if (this.isLogined) {
            return true
          }
        }
        return false
      })
    }
  },
  data() {
    return {
      isLoading: false,
      // メニュー表示アイテム
      menu: [
        { title: 'Top', icon: 'home', link: '/' },
        { title: 'Menu', icon: 'restaurant_menu', link: '/menu' },
        { title: 'Access', icon: 'directions_car', link: '/access' },
        { title: 'Contact', icon: 'face', link: '/contact' },
        { title: 'blog', icon: 'beenhere', link: '/blog' },
        {
          title: 'admin page',
          icon: 'lock',
          link: '/admin',
          isNeedLogin: true
        },
        {
          title: 'logout',
          icon: 'lock_open',
          link: '/logout',
          isNeedLogin: true
        }
      ]
    }
  },
  methods: {
    changePage(item) {
      this.$router.push(item.link)
    }
  }
}
</script>
<style>
.article_title {
  letter-spacing: 4px;
  font-size: 34px;
  line-height: 35px;
  font-weight: 200;
}
.article_content {
  letter-spacing: 4px;
  font-size: 17px;
  line-height: 35px;
  background-color: #fafafa;
}
.article_content_xs {
  letter-spacing: 2px;
  font-size: 14px;
  line-height: 26px;
  background-color: #fafafa;
}
.stripe {
  position: relative;
  padding: 0.3em;
}
.stripe:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: repeating-linear-gradient(
    -45deg,
    black,
    black 2px,
    white 2px,
    white 4px
  );
}
</style>
