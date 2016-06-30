import Vue from 'vue'
import vmSortingOrderFilter from './../components/filters/sorting-order-filter.vue'
import $ from 'jquery'

describe("Alert component", function () {

    var parent, child;

    var changeCount = 0
    var lastFilters = {}
    var disableCount = 0
    var disableKey = ''

    beforeEach(function () {

        var parentComponent = {
            template: `
        <vm-sorting-order-filter
            name="order"
            :bus="bus"
            v-ref:child
        ></vm-sorting-order-filter>
        `,
            ready() {
                this.bus.$on('change', function (filters) {
                    changeCount += 1
                    lastFilters = filters
                })
                this.bus.$on('disable', function (key) {
                    disableCount += 1
                    disableKey = key
                })
            },
            components: {
                vmSortingOrderFilter
            },
            data(){
                return {
                    bus: new Vue,
                }
            },
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
            expect(changeCount).toBe(1)
            expect(lastFilters).toEqual({'order': 'asc'})
            $(child.$el).click()
            Vue.nextTick(function () {
                expect(getClass(child)).toBe('fa fa-sort-desc')
                expect(changeCount).toBe(2)
                expect(lastFilters).toEqual({'order': 'desc'})
                $(child.$el).click()
                Vue.nextTick(function () {
                    expect(getClass(child)).toBe('fa fa-sort')
                    expect(disableCount).toBe(1)
                    expect(disableKey).toBe('order')
                    done()
                })
            })
        })
    });
})

function getClass(child) {
    return $(child.$el).children().first().attr('class')
}