import Vue from 'vue'
import asvaVueFilters from './../index'

new Vue(
    {
        el: 'body',
        components: {
            vmFilterMixinTest: asvaVueFilters.components.vmFilterMixinTest,
        }
    })