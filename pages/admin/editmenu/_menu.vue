<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex class="mb-2" xs12>
          <v-btn color="info" @click="addNew()">新規作成</v-btn>
          <v-btn color="info" @click="cancel()">管理Topへ戻る</v-btn>
        </v-flex>
        <v-flex class="mb-2" xs12>
          <label>
            ※一覧から選択で編集
            <br>※ゴミ箱を選択で削除
            <br>※順序はドラッグドロップで並び替え可能
          </label>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12>
          <v-list>
            <draggable v-model="editTargetMenu">
              <v-list-tile
                v-for="(menu, index) in editTargetMenu"
                :key="menu.id"
                avatar
                @click="click"
              >
                <v-list-tile-avatar>
                  <img :src="menu.img.fileUrl | imageFilter">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="menu.name" @click="editMenu(menu)"></v-list-tile-title>
                  <v-list-tile-sub-title class="sub_title" v-text="menu.category"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn outline color="red" @click="deleteMenu(index)">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </draggable>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
    <editMenuDialog ref="editMenuDialog"/>
    <loadingScreen :isLoading="isLoading"/>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import loadingScreen from '../../../components/loadingScreen'
import editMenuDialog from '../../../components/editMenuDialog'

export default {
  components: {
    draggable,
    loadingScreen,
    editMenuDialog
  },
  meta: {
    requiredAuth: true
  },
  head() {
    return {
      title: 'メニュー編集'
    }
  },
  async mounted() {
    this.isLoading = true
    this.menuType = this.$nuxt.$route.params.menu
    if (
      this.menuType === 'dinner' ||
      this.menuType === 'lunch' ||
      this.menuType === 'morning' ||
      this.menuType === 'takeout'
    ) {
      await this.$store.dispatch('menu_edit/readEditMenu', {
        editMenuType: this.menuType
      })
    } else {
      console.error('param is error')
      this.$router.push('/')
      return
    }
    this.isLoading = false
  },
  computed: {
    editCategories() {
      return this.$store.getters['menu_edit/editCategories']
    },
    editTargetMenu: {
      get() {
        return this.$store.getters['menu_edit/editMenu']
      },
      async set(val) {
        // ドラッグドロップで並び替え時
        this.isLoading = true
        await this.$store.dispatch('menu_edit/updateDispOrderAsync', {
          menuList: val
        })
        this.isLoading = false
      }
    }
  },
  methods: {
    click() {}, // this is duumy for ui image
    async addNew() {
      this.errorMessage = ''
      const target = {
        id: '999',
        name: '',
        price: 0,
        comment: '',
        img: {
          fileName: '',
          fileUrl: ''
        }
      }
      const data = await this.$refs.editMenuDialog.open(
        JSON.parse(JSON.stringify(target)),
        this.editCategories
      )
      if (data) {
        this.isLoading = true
        try {
          await this.$store.dispatch('menu_edit/addMenuAsync', { menu: data })
        } catch (err) {
          this.errorMessage = 'エラーが発生:' + err
        } finally {
          this.isLoading = false
        }
      }
    },
    async deleteMenu(index) {
      if (confirm('削除しますか？')) {
        this.errorMessage = ''
        this.isLoading = true
        try {
          await this.$store.dispatch('menu_edit/deleteMenuAsync', {
            index: index
          })
        } catch (err) {
          this.errorMessage = 'エラーが発生:' + err
        } finally {
          this.isLoading = false
        }
      }
    },
    async editMenu(item, index) {
      this.errorMessage = ''
      const data = await this.$refs.editMenuDialog.open(
        JSON.parse(JSON.stringify(item)),
        this.editCategories
      )
      if (data) {
        this.isLoading = true
        try {
          await this.$store.dispatch('menu_edit/editMenuAsync', {
            menu: data
          })
        } catch (err) {
          this.errorMessage = 'エラーが発生:' + err
        } finally {
          this.isLoading = false
        }
      }
    },
    cancel() {
      this.$router.push('/admin')
    }
  },
  data() {
    return {
      errorMessage: '',
      isLoading: false,
      menuType: null
    }
  }
}
</script>

<style scoped>
.sub_title {
  font-size: 13px;
}
</style>
