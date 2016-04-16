<template>
    <vm-paginator :pages="pages" :max-pages="maxPages"></vm-paginator>
</template>

<script>
    module.exports = {
        components: {
            vmPaginator: require('./../other/paginator.vue'),
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
        mixins: [
            require('./../../mixins/child')
        ],
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