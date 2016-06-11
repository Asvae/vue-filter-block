import _ from 'lodash'
import Vue from 'vue'
import storage from './../libs/LocalStorage'

export default {
    filters: {
        data: {},
        storageName: null,
        timeout: 500,
    },
    data: function () {
        return {
            filters: {
                toUpdate: false,
                bus: new Vue,
            },
        }
    },
    /**
     * We want to check if local storage key is specified.
     * And if yes — load filters from local storage.
     */
    ready () {
        // Override prototype property.
        // Should be done for each component instance.
        this.$options.filters.data = {}

        // Register listeners
        let self = this
        this.filters.bus.$on('change', function (filters) {
            _.each(filters, function (value, key) {
                self.$options.filters.data[key] = value
                self.registerUpdate()
            })
        })
        this.filters.bus.$on('disable', function (key) {
            delete self.$options.filters.data[key]
            self.registerUpdate()
        })

        // Inform children if we have filters to share.
        if (this.$options.filters.storageName !== null) {
            let savedFilters = storage.getValue(this.$options.filters.storageName)
            this.filters.bus.$emit('set-filters', savedFilters)
            this.registerUpdate()
        }
    },
    methods: {
        setFilters: function () {
            this.$broadcast('set-filters', this.$options.filters.data)
        },
        resetFilters: function () {
            this.$options.filters.data = {}
            this.setFilters()
            this.registerUpdate()
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
                this.filtersFormed(filters)
            }.bind(this), this.$options.filters.timeout)
        },
        filtersFormed (){
            console.warn('Override the "filtersFormed" method to get updates on filters change. Component name is: ' + this.constructor.name)
        },
        saveFilters () {
            storage.setValue(this.$options.filters.storageName, this.$options.filters.data)
        },
        loadState (state) {
            this.$options.filters.data = {}
            this.filters.bus.$emit('set-filters', state)
        },
    },
}