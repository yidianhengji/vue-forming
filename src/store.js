import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    attrs: [],
    activeIndex: 0,
    visible: false,
    printVisible: false,
    list: []
  },
  mutations: {
    changeAttrs (state, attrs) {
      state.attrs = attrs
    },
    setActiveAttrs (state, attrs) {
      state.activeIndex = attrs
    },
    setVisible (state, bool) {
      state.visible = bool
    },
    setPrintVisible (state, bool) {
      state.printVisible = bool
    },
    setList (state, arr) {
      state.list = arr
    }
  },
  actions: {

  }
})
