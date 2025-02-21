<script setup lang="ts">
import AdfNodeList from './AdfNodeList.vue';


    const props = defineProps({
        node: Object,
    })
</script>

<template>
    <td v-if="props.node?.type === 'tableCell'"><AdfNodeList :nodes="props.node?.content" /></td>
    <th v-if="props.node?.type === 'tableHeader'"><AdfNodeList :nodes="props.node?.content" /></th>
</template>

<style scoped>
</style>