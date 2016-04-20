import _ from 'lodash'
import storage from './../libs/LocalStorage'

module.exports = {
    filters: {
        data: {},
        storageName: null,
        timeout: 500,
    },
    data: function () {
        return {
            filters: {
                toUpdate: false,
            },
        }
    },
    events: {
        'filter-changed': function (filters) {
            _.each(filters, function (value, key) {
                this.$options.filters.data[key] = value
                this.registerUpdate()
            }.bind(this))
        },
        'filter-disabled': function (key) {
            delete this.$options.filters.data[key]
            this.registerUpdate()
        },
        // 'filters-formed' is triggered when filters are ready to be sent.
    },
    /**
     * We want to check if local storage key is specified.
     * And if yes — load filters from local storage.
     */
    ready: function () {
        // Override prototype property.
        // Should be done for each component instance.
        this.$options.filters.data = {}
        
        if (this.$options.filters.storageName === null) {
            return
        }

        this.$broadcast('set-filter', this.loadFilters())
        return this.registerUpdate()
    },
    methods: {
        setFilters: function () {
            this.$broadcast('set-filter', this.$options.filters.data)
        },
        resetFilters: function () {
            this.$options.filters.data = {}
            this.setFilters()
        },

        /**
         * We will set timeout if function is specified.
         */
        registerUpdate: function () {
            if (this.filters.toUpdate) {
                return;
            }

            this.filters.toUpdate = true

            setTimeout(function () {
                this.filters.toUpdate = false
                this.saveFilters()
                var filters = _.clone(this.$options.filters.data)
                this.$emit('filters-formed', filters)
            }.bind(this), this.$options.filters.timeout)
        },
        loadFilters: function () {
            return storage.getValue(this.$options.filters.storageName)
        },
        saveFilters: function () {
            storage.setValue(this.$options.filters.storageName, this.$options.filters.data)
        },
        loadState: function (state){
            this.$options.filters.data = {}
            this.$broadcast('set-filter', state)
        },
    },
}