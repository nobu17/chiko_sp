<template>
  <v-container class="mt-0 mb-0">
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-list two-line>
            <v-list-tile v-for="item in items" :key="item.title" avatar @click="openLink(item)">
              <v-list-tile-avatar>
                <v-icon class="blue white--text">assignment</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.isoDate | isoDateFilter }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
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
    }
  },
  methods: {
    openLink(item) {
      if (item.link.startsWith('http')) {
        window.open(item.link)
      }
    }
  }
}
</script>
<style scoped>
</style>
