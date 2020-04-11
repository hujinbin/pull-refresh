import Vue from 'vue'
import index from '../src/index'

describe('pull-refresh.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(index)
    const vm = new Constructor().$mount()
  })
})