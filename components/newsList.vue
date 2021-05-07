<template>
  <v-container class="m-0">
    <v-layout wrap>
      <v-flex xs12>
        <v-card v-for="(item) in filteredItems" :key="item.id" class="mt-2 mb-2">
          <v-card-title>
            <div>
              <span>{{ item.publishedAt.substr(0, 10) }}</span><br>
              <h3 class="headline">{{ item.title }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div v-html="item.content" />
          </v-card-text>
        </v-card>
        <div v-if="canDisplayMore" class="mt-4">
          <v-btn block small color="info" @click="displayAll()">More</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    initDisplayCount: {
      type: Number,
      return: false,
      default: 3
    }
  },
  data() {
    return {
      isDisplayAll: false
    }
  },
  computed: {
    filteredItems() {
      if (
        this.items &&
        this.items.length > this.initDisplayCount &&
        !this.isDisplayAll
      ) {
        return this.items.slice(0, this.initDisplayCount)
      }
      return this.items
    },
    canDisplayMore() {
      if (
        this.items &&
        this.items.length > this.initDisplayCount &&
        !this.isDisplayAll
      ) {
        return true
      }
      return false
    }
  },
  mounted() {},
  methods: {
    displayAll() {
      this.isDisplayAll = true
    }
  }
}
</script>
<style scoped>
</style>
