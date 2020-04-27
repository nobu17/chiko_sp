<template>
  <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}">
    <v-layout wrap>
      <v-flex xs12>
        <h3 class="menuTitle title-head text-md-center text-xs-center mt-3 mb-4">
          <v-icon class="mr-3" color="red" size="45">attach_money</v-icon>管理ページ
        </h3>
      </v-flex>
      <v-flex xs12>
        <label class="menuTitle">メニュー編集</label>
      </v-flex>
      <v-flex xs12>
        <ul>
          <v-list>
            <template v-for="menu in menuList1">
              <v-list-tile :key="menu.link" @click="changePage(menu.link)">
                <v-list-tile-avatar>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content
                  :class="{'menuTitle_xs': $vuetify.breakpoint.smAndDown, 'menuTitle': $vuetify.breakpoint.mdAndUp}"
                >{{menu.text}}</v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </ul>
      </v-flex>
      <v-flex xs12>
        <label class="menuTitle">カテゴリ編集</label>
      </v-flex>
      <v-flex xs12>
        <ul>
          <v-list>
            <template v-for="menu in menuList2">
              <v-list-tile :key="menu.link" @click="changePage(menu.link)">
                <v-list-tile-avatar>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content
                  :class="{'menuTitle_xs': $vuetify.breakpoint.smAndDown, 'menuTitle': $vuetify.breakpoint.mdAndUp}"
                >{{menu.text}}</v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </ul>
      </v-flex>
      <v-flex xs12>
        <label class="menuTitle">クーポン編集</label>
      </v-flex>
      <v-flex xs12>
        <ul>
          <v-list>
            <template v-for="menu in menuList3">
              <v-list-tile :key="menu.link" @click="changePage(menu.link)">
                <v-list-tile-avatar>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content
                  :class="{'menuTitle_xs': $vuetify.breakpoint.smAndDown, 'menuTitle': $vuetify.breakpoint.mdAndUp}"
                >{{menu.text}}</v-list-tile-content>
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
      menuList1: [
        {
          text: 'モーニングメニュー編集',
          icon: 'info',
          link: '/admin/editmenu/morning'
        },
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
          text: 'テイクアウトメニュー編集',
          icon: 'info',
          link: '/admin/editmenu/takeout'
        }
      ],
      menuList2: [
        {
          text: 'モーニングカテゴリ編集',
          icon: 'info',
          link: '/admin/editcategory/morning'
        },
        {
          text: 'ランチカテゴリ編集',
          icon: 'info',
          link: '/admin/editcategory/lunch'
        },
        {
          text: 'ディナーカテゴリ編集',
          icon: 'info',
          link: '/admin/editcategory/dinner'
        },
        {
          text: 'テイクアウトカテゴリ編集',
          icon: 'info',
          link: '/admin/editcategory/takeout'
        }
      ],
      menuList3: [
        {
          text: 'クーポン編集',
          icon: 'info',
          link: '/admin/editCoupon/'
        }
      ]
    }
  }
}
</script>

<style scoped>
.menuTitle {
  letter-spacing: 2px;
  font-size: 25px;
  line-height: 35px;
  background-color: transparent;
}
.menuTitle_xs {
  letter-spacing: 2px;
  font-size: 15px;
  line-height: 20px;
  background-color: transparent;
}
</style>
