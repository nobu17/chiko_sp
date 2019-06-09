<template>
  <div>
    <input
      style="display: none"
      ref="input"
      type="file"
      color="info"
      accept="image/jpeg, image/jpg, image/png"
      :disabled="disabled"
      @change="fileUpload()"
    >
    <v-container class="mt-0 mb-0">
      <v-layout wrap>
        <v-flex xs12 md3>
          <v-btn color="info" @click="pickFile" :disabled="disabled">アップロード</v-btn>
        </v-flex>
        <v-flex xs12 md9>
          <v-text-field label="アップロードボタンを押下してください。" readonly v-model="imageName"></v-text-field>
        </v-flex>
        <v-flex xs3 md3 v-if="canDelete">
          <v-btn outline fab color="red" @click="deleteClicked" :disabled="disabled">
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImageUtil from '../lib/imageUtil'
export default {
  props: {
    imageName: {
      type: String,
      required: true
    },
    canDelete: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {},
  data() {
    return {
      disabled: false
    }
  },

  methods: {
    pickFile() {
      this.$refs.input.click()
    },
    deleteClicked() {
      this.$emit('deleteClicked')
    },
    async fileUpload() {
      this.disabled = true
      this.$emit('disabledChanged', this.disabled)
      const file = this.$refs.input.files[0]
      if (!file) {
        return
      }
      const base64 = await ImageUtil.getCompressImageDataUrl(file)
      const imageName = file.name
      this.$emit('resized', {
        base64,
        imageName
      })
      this.disabled = false
      this.$emit('disabledChanged', this.disabled)
    }
  }
}
</script>
