module.exports = {
    filters: {
        vmRemovableInputFilter: require('./filters/removable-input-filter.vue'),
        vmThreeStateCheckboxFilter: require('./filters/three-state-checkbox-filter.vue'),
        vmPaginatorFilter: require('./filters/paginator-filter.vue'),
        vmSortingOrderFilter: require('./filters/sorting-order-filter.vue'),
    },
    other: {
        vmThreeStateCheckbox: require('./other/three-state-checkbox.vue'),
        vmPaginator: require('./other/paginator.vue'),
        vmFilterMixinTest: require('./test/filter-mixin-test.vue'),
    },
    test: {
        vmFilterMixinTest: require('./test/filter-mixin-test.vue'),
    }
}
