module.exports = {
    data: function () {
        return {
            defaultValue: ''
        }
    },
    props: {
        value: {default: ''},
        name: {
            type: String,
            required: true,
        },
        id: {
            default: function () {
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
    created: function () {
        this.defaultValue = this.value
    },
    events: {
        /**
         * Allows to set filter from parent
         * @param filter
         */
        'set-filter': function (filter) {

            if (!(this.name in filter)) {
                this.value = this.defaultValue
                return
            }

            this.value = filter[this.name]
            this.showParentTheChange()
        }
    },
    methods: {
        showParentTheChange: function () {
            this.$dispatch('filter-changed', this.getFilterObject())
        },
        getFilterObject: function () {
            var filter = {}
            filter[this.name] = this.value
            return filter
        }
    }
}