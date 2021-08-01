import Vue from 'vue'
import pullRefresh from '../src/index'

describe('pullRefresh.vue', () => {
    it('pullRefresh是否存在',()=>{
        expect(pullRefresh).to.be.ok;
    })
    it('测试是否生效', () => {
        const Constructor = Vue.extend(Button)
        const vm = new Constructor().$mount()
        expect(vm.$el.querySelector('.loading').textContent)
          .to.equal('加载中...')
    })
})