<template>
    <input :id="id"
           :class="class"
           :type="type"
           :name="name"
           v-model="value"
    >
</template>

<script>
    module.exports = {
        props: {
            type: {default: 'text'},
        },
        mixins: [
            require('./../../mixins/child')
        ],
        watch: {
            value: function (value) {
                if (! value){
                    this.$dispatch('filter-disabled', this.name)
                    return
                }

                this.showParentTheChange()
            }
        }
    };
</script>