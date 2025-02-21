<script setup lang="ts">

    import AdfNodeList from './AdfNodeList.vue'

    const props = defineProps({
        node: Object,
    })
</script>

<template>
    <div class="adf-doc">
        <AdfNodeList :nodes="props.node?.content" />
    </div>
</template>

<style scoped>
</style>