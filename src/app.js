import Vue from 'vue'
import index from './index'

Vue.component('pullRefresh',index)

new Vue({
    el:'#app',
    data(){
        return{
            num: 0    
        }
    },
    methods:{
        refresh (done) {
            setTimeout(() => {
              this.num++
              done()    //把状态归0
            }, 500)
        }
    }
})