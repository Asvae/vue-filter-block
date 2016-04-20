<template>
    <vm-paginator :pages="pages" :max-pages="maxPages"></vm-paginator>
</template>

<script>
    import childMixin from './../../mixins/child'
    import vmPaginator from './../other/paginator.vue'

    export default {
        components: {
            vmPaginator
        },
        props: {
            pages: {
                required: true,
                type: Number,
            },
            maxPages: {
                default: 5,
                required: false,
                type: Number,
            }
        },
        mixins: [childMixin],
        events: {
            'page-changed': function (page) {
                if (page === 1) {
                    this.$dispatch('filter-disabled', this.name)
                    return
                }

                var filter = {}
                filter[this.name] = page
                this.$dispatch('filter-changed', filter)
            },
            'set-filter': function () {
                this.$broadcast('reset')
            }
        }
    }
</script>