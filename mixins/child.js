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
            let value = getProperty(this.name, filters)
            self.setFilters(value)
        })

        this.defaultValue = this.value
    },
    methods: {
        getFilterObject () {
            return getObject(this.name, this.value)
        },
        /**
         * Allows to set filter from parent
         * @param filter
         */
        setFilters (value) {
            if (value === undefined) {
                this.value = this.defaultValue
                return
            }
            this.value = value
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

function getObject(reference, value) {
    let parts = reference.split('.')
    let length = parts.length
    let result = {}
    let node = result

    for (let i = 0; i < length; i++) {
        if (i === length - 1) {
            node[parts[length - 1]] = value
        } else if (node === result) {
            node = createProperty(result, parts[i])
        } else {
            node = createProperty(node, parts[i])
        }
    }

    return result
}

function getProperty(reference, object) {
    let parts = reference.split('.')
    let length = parts.length
    let property = object[parts[0]]

    for (let i = 1; i < length; i++) {
        if (!_.isObject(property)) {
            return property
        }
        property = property[parts[i]]
    }

    return property
}

function createProperty(object, property) {
    let node = {}
    object[property] = node
    return node
}
