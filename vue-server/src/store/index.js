import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sizearr: []
  },
  actions: {},
  mutations: {
    addsize(state) {
      let obj = {
        name: '',
        item: [{
          title: "",
          value: ""
        }]
      }
      this.state.sizearr.push(obj)
    },
    additem(state, index) {
      let obj = {
        title: "",
        value: ""
      }
      this.state.sizearr[index].item.push(obj)
    },
    delsizearr(state, index) {
      this.state.sizearr.splice(index, 1)
    },
    delitem(state, obj) {
      this.state.sizearr[obj.sizearrIndex].item.splice(obj.canindex, 1)
    }
  },
  getters: {}
})

export default store
