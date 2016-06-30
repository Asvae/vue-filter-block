<template>
    <select class="form-control" v-model="value">
        <option :value="1">One</option>
        <option :value="2">Two</option>
        <option :value="3">Three</option>
    </select>
</template>

<script>
    export default {
        props: {
            value: {default: 1}
        }
    }
</script>