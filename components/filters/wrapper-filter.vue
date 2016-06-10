<style scoped>
    .filter-wrapper {
        display: flex
    }

    div.disabled {
        opacity: .7;
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
        methods: {
            disable (){
                this.disabled()
                this.active = false
            },
            enable (){
                this.active = true
                this.changed()
            },
            setFilters(filters){
                if (this.name in filters) {
                    this.value = filters[this.name]
                    this.enable()
                } else {
                    this.active = false
                }
            }
        },
        watch: {
            value () {
                if (this.active) {
                    this.changed()
                }
            }
        }
    }
</script>