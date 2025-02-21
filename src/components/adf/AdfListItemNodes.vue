<script setup lang="ts">
    import AdfNodeList from './AdfNodeList.vue'

    const props = defineProps({
        nodes: Array,
    })
</script>

<template>
    <li v-for="n of props.nodes"><AdfNodeList :nodes="(n as any).content" /></li>
</template>

<style scoped>
</style>