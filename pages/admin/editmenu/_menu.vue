<template>
  <div>
    <v-container class="mt-0 mb-0">
      <v-layout text-xs-center wrap child-flex>
        <v-flex class="mb-2" xs12>
          <v-btn color="info" @click="addNew()">新規作成</v-btn>
          <v-btn color="info" @click="cancel()">管理Topへ戻る</v-btn>
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
  async mounted() {
    this.isLoading = true
    this.menuType = this.$nuxt.$route.params.menu
    // const param = { isEditMode: true }
    if (
      this.menuType === 'dinner' ||
      this.menuType === 'lunch' ||
      this.menuType === 'drink'
    ) {
      await this.$store.dispatch('menu/readEditMenu', {
        editMenuType: this.menuType
      })
    } else {
      console.error('param is error')
      this.$router.push('/')
      return
    }
    console.log('ed', this.editTargetMenu)
    this.isLoading = false
  },
  computed: {
    editTargetMenu: {
      get() {
        return this.$store.getters['menu/editMenu']
      },
      async set(val) {
        // ドラッグドロップで並び替え時
        this.isLoading = true
        await this.$store.dispatch('menu/updateDispOrderAsync', {
          menuList: val
        })
        this.isLoading = false
        // this.$store.commit('menu/setEditMenu', val)
      }
    }
  },
  methods: {
    click() {}, // this is duumy for ui image
    async addNew() {
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
        JSON.parse(JSON.stringify(target))
      )
      if (data) {
        console.log(data)
        this.isLoading = true
        await this.$store.dispatch('menu/addMenuAsync', { menu: data })
        this.isLoading = false
      }
    },
    async deleteMenu(index) {
      if (confirm('削除しますか？')) {
        this.isLoading = true
        await this.$store.dispatch('menu/deleteMenuAsync', {
          index: index
        })
        this.isLoading = false
        // this.$store.commit('menu/deleteMenu', { index: index })
      }
    },
    async editMenu(item, index) {
      const data = await this.$refs.editMenuDialog.open(
        JSON.parse(JSON.stringify(item))
      )
      if (data) {
        this.isLoading = true
        await this.$store.dispatch('menu/editMenuAsync', {
          menu: data
        })
        this.isLoading = false
        // this.$store.commit('menu/editMenu', { index: index, item: data })
      }
    },
    cancel() {
      if (confirm('終了しますか？')) {
        this.$router.push('/admin')
      }
    }
  },
  data() {
    return {
      isLoading: false,
      menuType: null
    }
  }
}
</script>

<style>
</style>
