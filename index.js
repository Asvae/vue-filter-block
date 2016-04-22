import _components from './components/components'
import _child from './mixins/child'
import _parent from './mixins/parent'

export default {
    mixins: {
        child: _child,
        parent: _parent,
    },
    components: _components,
}

export var childMixin = _child
export var parentMixin = _parent
export var components = _components

