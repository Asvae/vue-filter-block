<template>
    <input :id="id"
           :class="class"
           :type="type"
           :name="name"
           v-model="value"
    >
</template>

<script>
    import childMixin from './../../mixins/child'

    export default {
        props: {
            type: {default: 'text'},
        },
        mixins: [childMixin],
        watch: {
            value (value) {
                value ? this.changed() : this.disabled()
            }
        }
    };
</script>