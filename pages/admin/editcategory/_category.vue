<template>
  <v-container class="mt-0 mb-0">
    <v-layout text-xs-center wrap child-flex>
      <v-flex xs12>
        <label>※左の●をドラッグドロップして順番変更可能</label>
      </v-flex>
      <v-flex xs12>
        <label>※既存のカテゴリ名を編集/削除した場合、変更前のアイテムのカテゴリは手動で変更必要なことに注意</label>
      </v-flex>
         <v-form ref="form" v-model="newValid" lazy-validation>
          <v-flex xs12>
            <v-text-field
              ref="nameTextBox"
              v-model="addingCategory"
              :rules="categoryRules"
              :counter="10"
              label="新規カテゴリ名"
              required
            ></v-text-field>
          </v-flex>
        </v-form>
        <v-flex xs12>
          <v-btn color="info" @click="addCategory()">新規追加</v-btn>
        </v-flex>
      <v-flex xs12>
        <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
      </v-flex>
      <v-flex xs12>
        <v-form ref="form2" v-model="commitValid" lazy-validation>
          <draggable v-model="editCategories">
            <div v-for="(category, index) in editCategories" :key="index">
              <v-layout wrap>
                <v-flex xs1>
                  <label>●</label>
                </v-flex>
                <v-flex xs9>
                  <v-text-field
                    :value="editCategories[index]"
                    @change="updateCategory(index , $event)"
                    outline
                    :rules="categoryRules"
                    label="カテゴリ名"
                    requireds
                  />
                </v-flex>
                <v-flex xs2>
                  <v-btn outline color="red" @click="deleteCategory(index)">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </div>
          </draggable>
        </v-form>
      </v-flex>
      <v-flex xs12>
        <v-btn color="info" @click="submit()">確定</v-btn>
        <v-btn color="info" @click="cancel()">キャンセル</v-btn>
      </v-flex>
    </v-layout>
    <loadingScreen :isLoading="isLoading"/>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import loadingScreen from '../../../components/loadingScreen'
export default {
  components: {
    draggable,
    loadingScreen
  },
  meta: {
    requiredAuth: true
  },
  async mounted() {
    this.isLoading = true
    this.menuType = this.$nuxt.$route.params.category
    if (
      this.menuType === 'dinner' ||
      this.menuType === 'lunch' ||
      this.menuType === 'drink'
    ) {
      await this.$store.dispatch('menu/readEditCategories', {
        editMenuType: this.menuType
      })
    } else {
      console.error('param is error')
      this.$router.push('/admin')
      return
    }
    this.isLoading = false
  },
  computed: {
    editCategories: {
      get() {
        return this.$store.getters['menu/editCategories']
      },
      set(val) {
        // ドラッグドロップで並び替え時
        this.$store.commit('menu/setEditCategories', {
          editCategories: val
        })
      }
    }
  },
  methods: {
    click() {}, // dummy for clickable
    updateCategory(index, item) {
      this.$store.commit('menu/setEditCategory', {
        index: index,
        editItem: item
      })
    },
    addCategory() {
      this.errorMessage = ''
      if (this.$refs.form.validate()) {
        // check the duplication
        const add = this.addingCategory.trim()
        if (this.editCategories.some(cat => cat === add)) {
          this.errorMessage = '既に同名のカテゴリを登録済みです。'
        } else {
          this.$store.commit('menu/addEditCategory', {
            newItem: add
          })
        }
      }
    },
    deleteCategory(index) {
      this.$store.commit('menu/deleteEditCategory', {
        index: index
      })
    },
    cancel() {
      if (confirm('確定せずに終了しますか？')) {
        this.$router.push('/admin')
      }
    },
    async submit() {
      this.errorMessage = ''
      if (this.$refs.form2.validate()) {
        if (this.editCategories.length < 1) {
          this.errorMessage = '最低でも１カテゴリの入力が必要です。'
          return
        }
        // duplicate check
        const distincts = this.editCategories.filter(function(
          element,
          index,
          array
        ) {
          return array.indexOf(element) === index
        })
        if (distincts.length !== this.editCategories.length) {
          this.errorMessage = '重複したカテゴリ名が入力されています。'
          return
        }
        this.isLoading = true
        await this.$store.dispatch('menu/commitEditCategories')
        this.isLoading = false
        this.$router.push('/admin')
      }
    }
  },
  data() {
    return {
      isLoading: false,
      newValid: false,
      commitValid: false,
      errorMessage: '',
      menuType: null,
      addingCategory: '',
      categoryRules: [
        v => {
          if (!v || v.trim() === '') {
            return '名称を入力して下さい。'
          }
          if (v.length > 10) {
            return '名称は10文字以内で入力してください。。'
          }
          return true
        }
      ]
    }
  }
}
</script>

<style>
</style>
