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
        <i class="fa fa-lg" :class="iconClass"></i>
    </span>
</template>

<script>

    module.exports = {
        props: {
            value: {default: null},
        },
        mixins: [
            require('./../../mixins/child')
        ],
        watch: {
            value: function (value) {
                if (value === null) {
                    return this.$dispatch('filter-disabled', this.name)
                }

                return this.showParentTheChange()
            }
        },
        computed: {
            iconClass: function () {
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
            toggle: function () {
                switch (this.value) {
                    case null:
                        return this.value = 'asc'
                    case 'asc':
                        return this.value = 'desc'
                    case 'desc':
                        return this.value = null
                }
            }
        }
    }
</script>