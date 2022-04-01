/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import Connection_ from '~/assets/serverConnection'

export const state = () => ({
  CartItems: [

  ],
  totalSemDisconto: 0,
  discount: 0,
  total: 0,
  Products: [],
  name_: '',
  email: '',
  contact: '',
  location: '',
  sales: []
})

export const mutations = {
  AddToCart (state, newProduct) {
    const CartItems = state.CartItems
    const product = state.CartItems.find(ele => ele.ProductId == newProduct.ProductId)
    if (newProduct.price) {
      if (product !== undefined) {
        state.CartItems.forEach((ele) => {
          if (ele.ProductId == newProduct.ProductId) {
            ele.quantity = newProduct.quantity
            ele.discount = newProduct.discount
            ele.productName = newProduct.productName
            ele.price = newProduct.price
            ele.imgId = newProduct.imgId
            ele.tips = newProduct.tips
          }
        })
      } else {
        CartItems.push({ ...newProduct })
      }
      let discount = 0
      let Total = 0
      let totalSemDisconto = 0
      // add total, discount...
      state.CartItems.forEach((ele) => {
        discount += (ele.price * (ele.discount * 0.01)) * ele.quantity
        Total += (ele.price - (ele.price * (ele.discount * 0.01))) * ele.quantity
        totalSemDisconto += ele.price * ele.quantity
      })
      state.discount = discount
      state.total = Total
      state.totalSemDisconto = totalSemDisconto
    }
  },
  resetForm (state) {
    state.CartItems = []
    state.name_ = ''
    state.email = ''
    state.contact = ''
    state.location = ''
    state.totalSemDisconto = 0
    state.discount = 0
    state.total = 0
    console.log(state)
  },
  getAllProducts (state, allProducts) {
    state.Products = [...allProducts]
    console.log(state.Products)
  },

  OnDelete (state, id) {
    const items = state.CartItems.filter((item) => {
      return item.ProductId !== id
    })
    state.CartItems = [...items]
    console.log(state.CartItems)
  },
  // for the form
  modifyName (state, name_) {
    state.name_ = name_
  },
  modifyEmail (state, email) {
    state.email = email
  },
  modifyContact (state, contact) {
    state.contact = contact
  },
  modifyLocation (state, location) {
    state.location = location
  },
  modifySales (state, allSales) {
    state.sales = [...allSales]
  }
}

export const actions = {
  async getAllProducts (context) {
    const data = await Connection_.getAllProducts()
    if (data.sucess) {
      context.commit('getAllProducts', data.sucess)
    } else {
      console.log(data)
    }
  },
  async getAllSales_ (context) {
    const data = await Connection_.getAllSales()
    if (data.sucess) {
      context.commit('modifySales', data.sucess)
    } else {
      console.log(data)
    }
  }
}
