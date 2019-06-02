<template>
  <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
    <v-layout wrap>
      <v-flex xs12>
        <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
          <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>管理ページ
        </h3>
      </v-flex>
      <v-flex xs12>
        <ul>
          <v-list>
            <template v-for="menu in menuList">
              <v-list-tile :key="menu.link" @click="changePage(menu.link)">
                <v-list-tile-avatar>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content class="menuTitle">{{menu.text}}</v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  meta: {
    requiredAuth: true
  },
  head() {
    return {
      title: '管理'
    }
  },
  methods: {
    changePage(url) {
      if (!url || url === '') {
        url = '/admin'
      }
      this.$router.push(url)
    }
  },
  data() {
    return {
      menuList: [
        {
          text: 'ランチメニュー編集',
          icon: 'info',
          link: '/admin/editmenu/lunch'
        },
        {
          text: 'ディナーメニュー編集',
          icon: 'info',
          link: '/admin/editmenu/dinner'
        },
        {
          text: 'ドリンクメニュー編集',
          icon: 'info',
          link: '/admin/editmenu/drink'
        }
      ]
    }
  }
}
</script>

<style scoped>
.menuTitle {
  letter-spacing: 2px;
  font-size: 20px;
  line-height: 35px;
  background-color: transparent;
}
</style>
