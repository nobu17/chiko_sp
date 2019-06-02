<template>
  <div>
    <input
      style="display: none"
      ref="input"
      type="file"
      color="info"
      accept="image/jpeg, image/jpg, image/png"
      :disabled="disabled"
      @change="resize()"
    >
    <v-container class="mt-0 mb-0">
      <v-layout wrap>
        <v-flex xs12 md2>
          <v-btn color="info" @click="pickFile" :disabled="disabled">アップロード</v-btn>
        </v-flex>
        <v-flex xs9 md7>
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
export default {
  props: {
    drawImageArgs: {
      type: Function,
      required: true
    },
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
    resize() {
      this.disabled = true
      this.$emit('disabledChanged', this.disabled)
      const file = this.$refs.input.files[0]

      if (!file) {
        return
      }

      // this.imageName = file.name;
      const reader = new FileReader()

      reader.onload = event => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const image = new Image()
        image.crossOrigin = 'Anonymous'

        image.onload = () => {
          const drawImageArgs = this.drawImageArgs(image)

          if (drawImageArgs.length === 9) {
            canvas.width = drawImageArgs[7]
            canvas.height = drawImageArgs[8]
          }

          ctx.drawImage(...drawImageArgs)

          const base64 = canvas.toDataURL()
          const imageName = file.name
          this.$emit('resized', {
            base64,
            imageName
          })
          this.disabled = false
          this.$emit('disabledChanged', this.disabled)
        }

        image.src = event.target.result
      }

      reader.readAsDataURL(file)
    }
  }
}
</script>
