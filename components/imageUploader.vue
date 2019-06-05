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
  mounted() {},
  computed: {},
  data() {
    return {}
  },
  methods: {
    // ボタンの有効状態の切り替わり
    disabledChanged(disabled) {
      this.$emit('disabledChanged', disabled)
    },
    resizeFinish({ base64, imageName }) {
      // 親にイベント発行
      this.$emit('update', { fileUrl: base64, fileName: imageName })
    }
  }
}
</script>
