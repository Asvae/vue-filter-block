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
    export default {
        props: {
            value: {default: null},
            name: {},
            title: {},
        },
        ready(){
            this.setDefaultValue()
        },
        watch: {
            value(){
                this.setDefaultValue()
            }
        },
        methods: {
            /**
             * false -> true -> indeterminate -> false -> ...
             * @param event
             */
            change(event) {
                var checkbox = event.target

                if (checkbox.readOnly) {
                    checkbox.checked = checkbox.readOnly = false
                    this.value = false
                    return
                }
                if (!checkbox.checked) {
                    this.value = null
                    checkbox.readOnly = checkbox.indeterminate = true
                    return
                }
                this.value = true
            },
            setDefaultValue() {
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