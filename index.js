import _components from './components/components'
import _child from './mixins/child'
import _parent from './mixins/parent'

export default {
    components: _components
}

export var childMixin = _child
export var parentMixin = _parent
export var components = _components

export var vmPaginatorFilter = _components.vmPaginatorFilter
export var vmRemovableInputFilter = _components.vmRemovableInputFilter
export var vmSortingOrderFilter = _components.vmSortingOrderFilter
export var vmThreeStateCheckboxFilter = _components.vmThreeStateCheckboxFilter
export var vmWrapperFilter = _components.vmWrapperFilter
