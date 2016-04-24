<style scoped>
    .filter-wrapper {
        display: flex
    }

    .filter-wrapper > div {
        cursor: pointer;
    }

    div.disabled {
        opacity: .7;
        pointer-events: none;
    }
</style>

<template>
    <div class="filter-wrapper" :class="class">
        <div @click="enable">
            <div :class="{disabled: ! active}">
                <div :is="content" :value.sync="value"></div>
            </div>
        </div>
        <button class="btn btn-sm"
                title="Reset Filter"
                @click="disable"
                :class="{disabled: ! active}"
        >
            <i class="fa fa-times fa-lg"></i>
        </button>
    </div>
</template>

<script>
    import childMixin from './../../mixins/child'

    export default {
        mixins: [childMixin],
        data (){
            return {active: false};
        },
        props: {
            content: {
                type: String,
                required: true,
            }
        },
        events: {
            /**
             * Allows to set filter from parent
             * @param filter
             */
            'set-filter' (filter) {

                if (!(this.name in filter)) {
                    this.active = false
                    return
                }

                this.value = filter[this.name]
                this.showParentTheChange()
            }
        },
        methods: {
            disable (){
                this.$dispatch('filter-disabled', this.name)
                this.active = false
            },
            enable (){
                this.active = true
                this.showParentTheChange()
            },
        },
        watch: {
            value () {
                if (!this.active) {
                    return
                }

                this.showParentTheChange()
            }
        }
    }
</script>