<template>
  <div v-if="isLoading">
    <v-container fill-height fluid class="screen">
      <v-layout column justify-center align-center>
        <v-progress-circular
          class="mx-auto"
          indeterminate
          :size="70"
          :width="7"
          :color="progressColor"
        ></v-progress-circular>
      </v-layout>
    </v-container>
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
  background-color: transparent;
  opacity: 0.4;
}
</style>
