<template>
  <v-container class="mt-0 mb-0">
    <v-layout wrap>
      <v-flex xs12>
        <v-form class="ml-4 mr-4" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            ref="nameTextBox"
            v-model="name"
            :rules="nameRules"
            :counter="30"
            label="商品名"
            required
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="price"
            :rules="priceRules"
            :counter="5"
            label="価格"
            required
          ></v-text-field>
          <v-text-field v-model="comment" :rules="commentRules" :counter="50" label="コメント" required></v-text-field>
          <v-select :items="categories" v-model="category" :rules="categoryRules" label="カテゴリ"></v-select>
        </v-form>
      </v-flex>
    </v-layout>
    <ImageUploader
      :fileName="img.fileName"
      :fileUrl="img.fileUrl"
      @update="update"
      @disabledChanged="disabledChanged"
    />
    <v-flex xs12>
      <v-btn color="info" @click="submit" :disabled="!iscommitable">確定</v-btn>
      <v-btn color="info" @click="cancel" :disabled="!iscommitable">キャンセル</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import ImageUploader from './imageUploader'
export default {
  components: {
    ImageUploader
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  mounted() {
    if (this.value) {
      this.id = this.value.id
      this.beforeImg = this.value.beforeImg
      this.img = this.value.img
      this.name = this.value.name
      this.price = this.value.price
      this.comment = this.value.comment
      this.disporder = this.value.disporder
      this.category = this.value.category
    } else {
      this.id = ''
      this.beforeImg = { fileName: '', fileUrl: '' }
      this.img = { fileName: '', fileUrl: '' }
      this.name = ''
      this.price = 0
      this.comment = ''
      this.disporder = 0
      this.category = ''
    }
    // this.setfocus()
  },
  computed: {},
  methods: {
    update(newVal) {
      if (newVal) {
        this.img = newVal
      } else {
        this.img = { fileName: '', fileUrl: '' }
      }
    },
    disabledChanged(disabled) {
      this.iscommitable = !disabled
    },
    setfocus() {
      this.$nextTick(() => {
        this.$refs.nameTextBox.focus()
      })
    },
    submit() {
      if (this.$refs.form.validate() && this.iscommitable) {
        const menu = {
          id: this.id,
          name: this.name,
          price: this.price,
          comment: this.comment,
          img: this.img,
          disporder: this.disporder,
          beforeImg: this.beforeImg,
          category: this.category
        }
        this.$emit('submitted', menu)
      }
    },
    cancel() {
      this.$emit('canceled')
    }
  },
  data() {
    return {
      iscommitable: true,
      id: '',
      img: { fileName: '', fileUrl: '' },
      name: '',
      price: 0,
      comment: '',
      disporder: 0,
      beforeImg: '',
      category: '',
      nameRules: [
        v => {
          if (!v || v.trim() === '') {
            return '名称を入力して下さい。'
          }
          if (v.length > 30) {
            return '名称は30文字以内で入力してください。。'
          }
          return true
        }
      ],
      priceRules: [
        v => {
          if (!v || v.toString() === '') {
            return '価格を入力して下さい。'
          }
          return true
        }
      ],
      commentRules: [
        v => {
          if (v.length > 50) {
            return '説明は50文字以内で入力してください。。'
          }
          return true
        }
      ],
      categoryRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'カテゴリを選択して下さい。'
          }
          if (!this.categories.some(x => v === x)) {
            return 'カテゴリ一覧からカテゴリを選択してください。'
          }
          return true
        }
      ],
      valid: false
    }
  }
}
</script>

<style>
</style>
