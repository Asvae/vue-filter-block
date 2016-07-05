import Vue from 'vue'
import parentMixin from '../mixins/parent.js'

describe("Parent mixin", function () {

    it('passes down default filter', function () {
        let parent = new Vue({
            mixins: [parentMixin]
        })

        let spy = jasmine.createSpy('spy')
        let bus = parent.filters.bus
        bus.$on('set-filters', function (filters) {
            spy(filters)
        })

        parent.resetFilters()
        expect(spy.calls.count()).toEqual(1)
        expect(spy.calls.argsFor(0)[0]).toEqual({})
    })


})
