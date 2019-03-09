<template>
  <v-app>
    <v-toolbar dark app>
      <v-toolbar-title class="headline">
        <span class="px-2">Chiko★Spice</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in menu" :key="item.title" @click="$router.push(item.link)" flat>
          <v-icon class="pr-1">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in menu" :key="item.title" :to="item.link">
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
  </v-app>
</template>

<script>
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Footer
  },
  data() {
    return {
      // メニュー表示アイテム
      menu: [
        { title: 'Top', icon: 'home', link: '/' },
        { title: 'Menu', icon: 'restaurant_menu', link: '/menu' },
        { title: 'Access', icon: 'directions_car', link: '/access' },
        { title: 'Contact', icon: 'face', link: '/contact' },
        { title: 'blog', icon: 'beenhere', link: '/blog' }
      ]
    }
  },
  methods: {
    changePage(url) {}
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
