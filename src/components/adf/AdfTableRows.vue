<script setup lang="ts">
    import AdfTableCell from './AdfTableCell.vue'

    const props = defineProps({
        nodes: Array,
    })
</script>

<template>
    <tr v-for="n of props.nodes"><AdfTableCell v-for="c of (n as any).content" :node="c" /></tr>
</template>

<style scoped>
</style>