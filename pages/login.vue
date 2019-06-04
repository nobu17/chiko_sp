<template>
  <div>
    <v-container :class="{'ma-0 pa-0': $vuetify.breakpoint.smAndDown}" grid-list-md text-xs-center>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="title-head text-md-center text-xs-center mt-3 mb-4">
            <v-icon class="mr-3" color="red" size="45">vpn_key</v-icon>ログイン
          </h3>
        </v-flex>
        <v-flex xs12>
          <v-form class="ml-4 mr-4" ref="form" v-model="valid" lazy-validation @submit="submit">
            <v-text-field
              ref="idTextbox"
              v-model="userModel.id"
              :rules="idRules"
              label="Id"
              required
            ></v-text-field>
            <v-text-field
              :type="'password'"
              v-model="userModel.password"
              :rules="passRules"
              label="Password"
              v-on:keyup.enter="submit"
              required
            ></v-text-field>
            <v-btn :disabled="!valid" type="button" @click="submit" color="info">ログイン</v-btn>
          </v-form>
        </v-flex>
        <v-flex xs12>
          <v-alert v-if="errorMessage != ''" :value="true" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <div data-app>
      <loadingScreen :isLoading="isLoading"/>
    </div>
  </div>
</template>

<script>
import firebaseAuthClient from '../lib/firebaseAuthClient'
import loadingScreen from '../components/loadingScreen'
export default {
  components: {
    loadingScreen
  },
  created() {},
  mounted() {
    // this.isLoading = true
    // await firebaseAuthClient.init()
    // this.isLoading = false
    console.log('isLogined', this.isLogined)
    if (this.isLogined) {
      this.goNextPage()
    } else {
      this.$refs.idTextbox.focus()
    }
  },
  computed: {
    isLogined() {
      return this.$store.getters['auth/isLogined']
    }
  },
  methods: {
    async submit() {
      this.errorMessage = ''
      if (this.$refs.form.validate()) {
        const req = {
          userId: this.userModel.id,
          password: this.userModel.password
        }
        this.isLoading = true
        const res = await firebaseAuthClient.login(req)
        this.isLoading = false
        if (res) {
          this.goNextPage()
        } else {
          this.errorMessage = 'ログインに失敗しました。'
        }
      }
    },
    goNextPage() {
      const url = this.$route.query.redirect
      if (url) {
        this.$router.push(url)
      } else {
        this.$router.push('/')
      }
    }
  },
  data() {
    return {
      isLoading: false,
      idRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'Idを入力して下さい。'
          }
          if (v.length > 30) {
            return 'Idは30文字以内で入力して下さい。'
          }
          return true
        }
      ],
      passRules: [
        v => {
          if (!v || v.trim() === '') {
            return 'passwordを入力して下さい。'
          }
          if (v.length > 20) {
            return 'passwordは20文字以内で入力して下さい。'
          }
          return true
        }
      ],
      valid: false,
      userModel: {
        id: '',
        password: ''
      },
      errorMessage: ''
    }
  }
}
</script>

<style>
</style>
