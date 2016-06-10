<style>
    .filter-column-sorter {
        cursor: pointer;
    }

    .filter-column-sorter:hover {
        background-color: rgba(51, 122, 183, 0.15);
    }
</style>

<template>
    <span class="filter-column-sorter" @click="toggle">
        <slot></slot>
        <i class="fa" :class="iconClass"></i>
    </span>
</template>

<script>

    import childMixin from './../../mixins/child'

    export default {
        props: {
            value: {default: null},
        },
        mixins: [childMixin],
        watch: {
            value (value) {
                value === null ? this.disabled() : this.changed()
            }
        },
        computed: {
            iconClass () {
                switch (this.value) {
                    case null:
                        return 'fa-sort'
                    case 'asc':
                        return 'fa-sort-asc'
                    case 'desc':
                        return 'fa-sort-desc'
                }
            },
        },
        methods: {
            // null -> asc -> desc -> null -> ...
            toggle () {
                switch (this.value) {
                    case null:
                        return this.value = 'asc'
                    case 'asc':
                        return this.value = 'desc'
                    case 'desc':
                        return this.value = null
                }
            },
        },
    }
</script>