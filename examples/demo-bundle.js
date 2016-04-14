import Vue from 'vue'

window.addEventListener('load', function () {
    new Vue({
        el: 'body',
        components: {
            vmFilterMixinTest: require('./../components/test/filter-mixin-test.vue'),
        },
        data: function () {
            return {some: 'some1'}
        },
    })
})



