<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="900" class="diag">
      <v-card>
        <v-container v-if="menu">
          <MenuEditor ref="editor" v-model="menu" :categories="editCategories" @submitted="submitted" @canceled="canceled"/>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import MenuEditor from './menuEditer'
export default {
  components: {
    MenuEditor
  },
  data() {
    return {
      valid: false,
      dialog: false,
      resolve: null,
      reject: null,
      menu: null,
      editCategories: []
    }
  },
  methods: {
    open(menu, editCategories) {
      this.menu = menu
      this.editCategories = editCategories
      this.dialog = true
      // this.$refs.editor.setfocus()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    submitted(editItem) {
      this.resolve(editItem)
      this.menu = null
      this.dialog = false
    },
    canceled() {
      this.resolve(null)
      this.menu = null
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
