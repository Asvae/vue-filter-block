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
                value !== null
                        ? this.changed()
                        : this.disabled()
            }
        },
        methods: {
            setFilters (value){
                if (value === undefined) {
                    this.value = null
                    return
                }

                this.value = value
                this.changed()
            }
        },
    };
</script>