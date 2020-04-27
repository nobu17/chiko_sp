import base64ToBlob from 'b64-to-blob'
import { CouponEditClinet } from '../lib/couponEditClient'
import uuid from '../lib/uuid'

export const state = () => ({
  editCoupons: []
})

export const getters = {
  editCoupons(state) {
    return state.editCoupons
  }
}

export const mutations = {
  setEditCoupons(state, { coupons }) {
    state.editCoupons = coupons
  }
}

const client = new CouponEditClinet()

export const actions = {
  async readEditCoupons({ commit, dispatch }) {
    let coupons = await client.readEditCoupons()
    if (!coupons) {
      coupons = []
    }
    // 編集前画像情報を設定して保持させる
    for (const cou of coupons) {
      cou.beforeImg = JSON.parse(JSON.stringify(cou.img))
    }
    console.log('coupons', coupons)
    commit('setEditCoupons', { coupons: coupons })
  },
  async addCouponAsync({ dispatch, state }, { coupon }) {
    // 表示順序を設定
    coupon.disporder = state.editCoupons.length + 1
    // 画像追加
    if (coupon.img.fileName !== '') {
      // uuidリネーム
      coupon.img.fileName = uuid.getUUID() + '.jpg'
      coupon.img.fileUrl = base64ToBlob(
        coupon.img.fileUrl.replace(/^.*,/, ''),
        'image/jpg'
      )
      coupon.img.fileUrl = await client.addImage(coupon.img)
    }
    await client.editCouponAsync(coupon)
    // reload
    await dispatch('readEditCoupons')
  },
  async editCouponAsync({ dispatch, state }, { coupon }) {
    // 編集前画像の削除
    if (
      coupon.beforeImg.fileUrl !== '' &&
      coupon.beforeImg.fileUrl !== coupon.img.fileUrl
    ) {
      await client.deleteImage(coupon.beforeImg)
    }
    // 画像追加
    // 画像アップロード
    if (!coupon.img.fileUrl.startsWith('http')) {
      // uuidリネーム
      coupon.img.fileName = uuid.getUUID() + '.jpg'
      coupon.img.fileUrl = base64ToBlob(
        coupon.img.fileUrl.replace(/^.*,/, ''),
        'image/jpg'
      )
      coupon.img.fileUrl = await client.addImage(coupon.img)
    }
    await client.editCouponAsync(coupon)
    // reload
    await dispatch('readEditCoupons')
  },
  async deleteCouponAsync({ commit, dispatch, state }, { removeIndex }) {
    const target = state.editCoupons[removeIndex]
    if (target) {
      // 画像削除
      if (target.img.fileName !== '') {
        await client.deleteImage(target.img)
      }
      // DB削除
      await client.deleteCouponAsync(target.id)
      // オーダー更新
      const remained = state.editCoupons.filter(
        (_, index) => index !== removeIndex
      )
      // update order and reload
      await dispatch('updateDispOrderAsync', { coupons: remained })
    } else {
      console.error('no target exists', removeIndex)
    }
  },
  async updateDispOrderAsync({ commit, dispatch, state }, { coupons }) {
    // オーダー再計算して変更されたものを格納
    const changedItems = util.reassingOrderNo(
      JSON.parse(JSON.stringify(coupons))
    )
    if (changedItems.length > 0) {
      await client.updateCouponDispOrderAsync(changedItems)
    }
    // reload
    await dispatch('readEditCoupons')
  }
}

const util = {
  reassingOrderNo(menu) {
    const changedItem = []
    let order = 1
    for (const me of menu) {
      if (me.disporder !== order) {
        me.disporder = order
        changedItem.push(me)
      }
      order++
    }
    return changedItem
  }
}
