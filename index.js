import components from './components/components'

import child from './mixins/child'
import parent from './mixins/parent'

export default {
    mixins: {
        child,
        parent,
    },
    components,
}