<template>
  <v-container class="mt-0 mb-0">
    <v-layout wrap>
      <v-flex xs12>
        <v-img :src="fileUrl | imageFilter" height="300" :contain="true"/>
      </v-flex>
      <v-flex xs12>
        <ResizableImageInput
          :draw-image-args="drawImageArgs"
          :imageName="fileName"
          @resized="resizeFinish"
          @disabledChanged="disabledChanged"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ResizableImageInput from './resizableImage'

export default {
  components: { ResizableImageInput },
  props: {
    fileName: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    }
  },
  mounted() {
    // console.log('iiii', this.value)
    // this.base64 = this.value.fileUrl
    // this.fileName = this.value.fileName
  },
  computed: {},
  data() {
    return {
      // base64: ''
      // fileName: ''
    }
  },

  methods: {
    // ボタンの有効状態の切り替わり
    disabledChanged(disabled) {
      this.$emit('disabledChanged', disabled)
    },
    resizeFinish({ base64, imageName }) {
      // 親にイベント発行
      // console.log(base64);
      // this.fileUrl = base64
      // this.fileName = imageName
      // this.$emit('input', { fileUrl: this.base64, fileName: this.fileName })
      this.$emit('update', { fileUrl: base64, fileName: imageName })
    },

    drawImageArgs(image) {
      const maxHeight = 900
      const maxWidth = 900
      let dstWidth = 0
      let dstHeight = 0
      const imageWidth = image.width
      const imageHeight = image.height
      let ratio = 0.0
      // 最大幅を超える場合比率を計算
      if (imageWidth > imageHeight) {
        if (imageWidth > maxWidth) {
          ratio = maxWidth / imageWidth
        }
      } else if (imageHeight > maxHeight) {
        ratio = maxHeight / imageHeight
      }

      if (ratio > 0) {
        dstWidth = imageWidth * ratio
        dstHeight = imageHeight * ratio
      } else {
        dstWidth = imageWidth
        dstHeight = imageHeight
      }

      return [image, 0, 0, imageWidth, imageHeight, 0, 0, dstWidth, dstHeight]
    }
  }
}
</script>
