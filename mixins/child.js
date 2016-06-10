import _ from 'lodash'
import Vue from 'vue'

export default{
    data () {
        return {
            defaultValue: ''
        }
    },
    props: {
        value: {
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        bus: {type: Vue},
        id: {
            default () {
                var component_name = _.kebabCase(this.constructor.name);

                if (component_name.substring(0, 3) === 'vm-')
                    component_name = component_name.substring(3)

                return component_name + '-' + this._uid
            },
        },
        class: {
            default: '',
            type: String,
        }
    },
    ready () {
        let self = this

        this.bus.$on('set-filters', function (filters) {
            console.log(filters)
            self.setFilters(filters)
        })

        this.defaultValue = this.value
    },
    methods: {
        getFilterObject () {
            var filter = {}
            filter[this.name] = this.value
            return filter
        },
        /**
         * Allows to set filter from parent
         * @param filter
         */
        setFilters (filters) {
            if (!(this.name in filters)) {
                this.value = this.defaultValue
                return
            }

            this.value = filters[this.name]
            this.changed()
        },
        changed (){
            this.bus.$emit('change', this.getFilterObject())
        },
        disabled (){
            this.bus.$emit('disable', this.name)
        }
    }
}
