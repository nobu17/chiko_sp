import base64ToBlob from 'b64-to-blob'
import { ImageCouponClient } from '../lib/imageCouponClient'
import uuid from '../lib/uuid'

export const state = () => ({
  editCoupons: [],
  availableCoupons: []
})

export const getters = {
  editCoupons(state) {
    return state.editCoupons
  },
  availableCoupons(state) {
    return state.availableCoupons
  }
}

export const mutations = {
  setEditCoupons(state, { coupons }) {
    state.editCoupons = coupons
  },
  setAvailableCoupons(state, { coupons }) {
    state.availableCoupons = coupons
  }
}

const client = new ImageCouponClient()

export const actions = {
  async readEditCoupons({ commit, dispatch }) {
    let coupons = await client.readAsync()
    if (!coupons) {
      coupons = []
    }
    commit('setEditCoupons', { coupons: coupons })
  },
  async readAvailableCoupons({ commit, dispatch }) {
    let coupons = await client.readAsync()
    if (!coupons) {
      coupons = []
    }
    coupons = coupons.filter(c => !c.disabled)
    commit('setAvailableCoupons', { coupons: coupons })
  },
  async addCouponAsync({ dispatch, state }, { coupon }) {
    // 画像追加
    if (coupon.img.fileName !== '') {
      // uuidリネーム
      coupon.img.fileName = uuid.getUUID() + '.jpg'
      coupon.img.fileUrl = base64ToBlob(
        coupon.img.fileUrl.replace(/^.*,/, ''),
        'image/jpg'
      )
      coupon.img.fileUrl = await client.addImageAsync(coupon.img)
    }
    await client.editAsync(coupon)
    // reload
    await dispatch('readEditCoupons')
  },
  async editCouponAsync({ dispatch, state }, { coupon }) {
    // 画像アップロード
    if (!coupon.img.fileUrl.startsWith('http')) {
      // uuidリネーム
      coupon.img.fileName = uuid.getUUID() + '.jpg'
      coupon.img.fileUrl = base64ToBlob(
        coupon.img.fileUrl.replace(/^.*,/, ''),
        'image/jpg'
      )
      coupon.img.fileUrl = await client.addImageAsync(coupon.img)
    }
    await client.editAsync(coupon)
    // reload
    await dispatch('readEditCoupons')
  },
  async deleteCouponAsync({ commit, dispatch, state }, { removeIndex }) {
    const target = state.editCoupons[removeIndex]
    if (target) {
      // DB削除
      await client.deleteAsync(target.id)
      // reload
      await dispatch('readEditCoupons')
    } else {
      console.error('no target exists', removeIndex)
    }
  }
}
