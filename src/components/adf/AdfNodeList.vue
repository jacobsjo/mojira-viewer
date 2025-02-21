<script setup lang="ts">
    import AdfNode from './AdfNode.vue'

    const props = defineProps({
        nodes: Array,
    })
</script>

<template>
    <AdfNode v-for="n of nodes" :node="n as any" />
</template>

<style scoped>
</style>