import vmRemovableInputFilter from './filters/removable-input-filter.vue'
import vmThreeStateCheckboxFilter from './filters/three-state-checkbox-filter.vue'
import vmPaginatorFilter from './filters/paginator-filter.vue'
import vmSortingOrderFilter from './filters/sorting-order-filter.vue'

import vmThreeStateCheckbox from './other/three-state-checkbox.vue'
import vmPaginator from './other/paginator.vue'

import vmFilterMixinTest from './test/filter-mixin-test.vue'

export default {
    // Filters
    vmRemovableInputFilter,
    vmThreeStateCheckboxFilter,
    vmPaginatorFilter,
    vmSortingOrderFilter,

    // Not filters.
    vmThreeStateCheckbox,
    vmPaginator,

    // Test page
    vmFilterMixinTest,
}
