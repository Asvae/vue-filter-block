<template>
    <input :id="id"
           :class="class"
           type="checkbox"
           :title="title"
           :name="name"
           @click="change"
    >
</template>

<script>
    module.exports = {
        props: {
            value: {default: null},
            name: {},
            title: {},
        },
        ready: function (){
            this.setDefaultValue()
        },
        watch: {
            value: function (){
                this.setDefaultValue()
            }
        },
        methods: {
            /**
             * false -> true -> indeterminate -> false -> ...
             * @param event
             */
            change: function (event) {
                var checkbox = event.target

                if (checkbox.readOnly){
                    checkbox.checked = checkbox.readOnly = false
                    this.value = false
                    return
                }
                if (! checkbox.checked) {
                    this.value = null
                    checkbox.readOnly = checkbox.indeterminate = true
                    return
                }
                this.value = true
            },
            setDefaultValue: function (){
                var checkbox = this.$el
                var value = this.value

                switch (value) {
                    case false:
                        checkbox.checked = false
                        checkbox.readOnly = false
                        checkbox.indeterminate = false
                        break
                    case true:
                        checkbox.checked = true
                        checkbox.readOnly = false
                        checkbox.indeterminate = false
                        break
                    case null:
                        checkbox.checked = true
                        checkbox.readOnly = true
                        checkbox.indeterminate = true
                }
            }
        }
    };
</script>