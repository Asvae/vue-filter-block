<style>
    .filter-column-sorter {
        cursor: pointer;
    }
</style>

<template>
    <span class="filter-column-sorter">
        {{text}}
        <i class="fa fa-lg"
           :class="iconClass"
           @click="toggle"
        ></i>
    </span>
</template>

<script>

    import filterWrapperMixin from './../../../resources/assets/js/vue/mixins/filters/filter-wrapper-mixin'

    export default {
        mixins: [filterWrapperMixin],
        computed: {
            iconClass: function (){
                if (! this.active){
                    return 'fa-sort'
                }

                if (this.value === 'desc'){
                    return 'fa-sort-desc'
                }

                if (this.value === 'asc'){
                    return 'fa-sort-asc'
                }
            },
        },
        props: {
            value: {
                default: 'desc'
            },
            text: {
                default: '',
            }
        },
        methods: {
            toggle: function (){
                if (! this.active){
                    this.active = true
                    this.value = 'desc'
                    return
                }
                if (this.value === 'desc') {
                    this.value = 'asc'
                    return
                }
                if (this.value === 'asc') {
                    this.active = false
                }
            }
        }
    }
</script>