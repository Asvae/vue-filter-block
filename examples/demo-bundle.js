import Vue from 'vue'
import vmFilterMixinTest from '../components/test/filter-mixin-test.vue'
import vmSelect from '../components/other/select.vue'

Vue.component('vm-select', vmSelect)

new Vue({
    el: 'body',
    components: {
        vmFilterMixinTest
    }
})