<style scoped>
    span {
        vertical-align: text-top;
    }
    span > input[type="checkbox"] {
        margin: 0;
    }
</style>

<template>
    <span>
        <vm-three-state-checkbox
                :id="id"
                :class="class"
                :title="title"
                :value.sync="value"
                :name="name"
        ></vm-three-state-checkbox>
    </span>
</template>

<script>
    import childMixin from './../../mixins/child'
    import vmThreeStateCheckbox from './../other/three-state-checkbox.vue'

    export default {
        props: {
            value: {default: null},
            class: {},
            title: {},
        },
        components: {
            vmThreeStateCheckbox,
        },
        mixins: [childMixin],
        watch: {
            value (value) {
                if (value === null) {
                    this.$dispatch('filter-disabled', this.name)
                    return
                }
                this.showParentTheChange()
            }
        },
        events: {
            'set-filter' (filter) {
                if (!(this.name in filter)) {
                    this.value = null
                    return
                }

                this.value = filter[this.name]
                this.showParentTheChange()
            }
        },
    };
</script>