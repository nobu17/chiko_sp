<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isLoading" persistent content no-click-animation fullscreen>
        <v-container fill-height fluid class="screen">
          <v-layout column justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" :color="progressColor"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      progressColor: 'rgba(255,0,0,1)'
    }
  }
}
</script>

<style scoped>
.screen {
  background-color: black;
  opacity: 0.4;
}
</style>
