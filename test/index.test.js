const expect = chai.expect;
import Vue from 'vue'
import pullRefresh from '../src/index'

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('pullRefresh.vue', () => {
    it('pullRefresh是否存在',()=>{
        expect(pullRefresh).to.be.ok;
    })
    it('测试是否生效', () => {
        const Constructor = Vue.extend(pullRefresh)
        const vm = new Constructor().$mount();
        // expect(vm.$el.querySelector('.pull'))
        //   .to.equal('下拉即可刷新...')
    })
})