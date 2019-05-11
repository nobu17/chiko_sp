import Vue from 'vue'

const noImageSrc = require('~/assets/img/no-image.png')
Vue.filter('imageFilter', value => {
  if (value && value !== '') {
    return value
  }
  return noImageSrc
})

Vue.filter('commaFilter', value => {
  if (!value || (typeof value !== 'number' && typeof value !== 'string')) {
    return value
  }
  const str = typeof value === 'number' ? String(value) : value
  return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
})

Vue.filter('yenFilter', value => {
  if (!value || typeof value !== 'string') {
    return value
  }
  return value + '円'
})
