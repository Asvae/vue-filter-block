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
    module.exports = {
        props: {
            value: {default: null},
            class: {},
            title: {},
        },
        components: {
            vmThreeStateCheckbox: require('./../other/three-state-checkbox.vue'),
        },
        mixins: [
            require('./../../mixins/child')
        ],
        watch: {
            value: function (value) {
                if (value === null) {
                    this.$dispatch('filter-disabled', this.name)
                    return
                }
                this.showParentTheChange()
            }
        },
        events: {
            'set-filter': function (filter) {
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