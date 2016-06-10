<template>
    <vm-paginator :pages="pages"
                  :max-pages="maxPages"
                  :current-page="value"
                  @page-changed="pageChanged($arguments[0])"
    ></vm-paginator>
</template>

<script>
    import childMixin from './../../mixins/child'
    import vmPaginator from './../other/paginator.vue'

    export default {
        components: {
            vmPaginator
        },
        props: {
            value: {
                default: 1,
            },
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
        methods: {
            pageChanged(page){
                return (this.value = page) === 1 ? this.disabled() : this.changed()
            },
            setFilter (){
                this.value = 1
            }
        },
    }
</script>