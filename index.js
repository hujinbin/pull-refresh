import pullRefresh from './src/index'

const install = Vue => {
    Vue.component(pullRefresh.name, pullRefresh)
}

export {
    install,
    pullRefresh,
}