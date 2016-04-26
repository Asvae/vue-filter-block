import Vue from 'vue'
import vmSortingOrderFilter from './../components/filters/sorting-order-filter.vue'
import $ from 'jquery'


describe("Alert component", function () {

    var parent, child;

    var filterChangedSpy = jasmine.createSpy('filter-changed')
    var filterDisabledSpy = jasmine.createSpy('filter-disabled')

    beforeEach(function() {

        var parentComponent = {
            template: `
        <vm-sorting-order-filter
            name="order"
            v-ref:child
        ></vm-sorting-order-filter>
        `,
            components: {
                vmSortingOrderFilter
            },
            events: {
                'filter-changed': function (filters){
                    filterChangedSpy(filters)
                },
                'filter-disabled': function (key){
                    filterDisabledSpy(key)
                },
            }
        }

        parent = new Vue(parentComponent).$mount().$appendTo(document.body)
        child = parent.$refs.child
    });

    it('should change values', function () {
        expect(child.value).toBe(null)
        child.toggle()
        expect(child.value).toBe('asc')
        child.toggle()
        expect(child.value).toBe('desc')
        child.toggle()
        expect(child.value).toBe(null)
    })

    it("should support async execution of test preparation and expectations", function (done) {
        expect(getClass(child)).toBe('fa fa-sort')
        $(child.$el).click()
        Vue.nextTick(function () {
            expect(getClass(child)).toBe('fa fa-sort-asc');
            expect(filterChangedSpy.calls.count()).toBe(1)
            expect(filterChangedSpy.calls.mostRecent().args[0]).toEqual({'order': 'asc'})
            $(child.$el).click()
            Vue.nextTick(function () {
                expect(getClass(child)).toBe('fa fa-sort-desc')
                expect(filterChangedSpy.calls.count()).toBe(2)
                expect(filterChangedSpy.calls.mostRecent().args[0]).toEqual({'order': 'desc'})
                $(child.$el).click()
                Vue.nextTick(function () {
                    expect(getClass(child)).toBe('fa fa-sort');
                    expect(filterDisabledSpy.calls.count()).toBe(1)
                    expect(filterDisabledSpy.calls.mostRecent().args[0]).toBe('order')
                    done();
                })
            })
        })
    });
})

function getClass(child) {
    return $(child.$el).children().first().attr('class')
}