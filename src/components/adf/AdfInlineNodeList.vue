<script setup lang="ts">
    import AdfInlineNode from './AdfInlineNode.vue'

    const props = defineProps({
        nodes: Array,
    })
</script>

<template>
    <AdfInlineNode v-for="n of props.nodes" :node="n as any" />
</template>

<style scoped>
</style>