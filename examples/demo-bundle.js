import Vue from 'vue'
Vue.use(require('asva-vue-modules'))

var module = {
    components: {
        vmFilterMixinTest: require('./../components/test/filter-mixin-test.vue'),
    }
}

Vue.registerModule(module)

new Vue({el: 'body'})



