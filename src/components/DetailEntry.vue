<script setup lang="ts">
    const props = defineProps({
        title: String,
        value: String,
        values: Array
    })
</script>

<template>
    <div class="detail">
        <span class="detailTitle">{{ $props.title }}:</span>
        <span v-if="$props.value" class="detailValue">{{ $props.value }}</span>
        <div v-if="$props.values" class="detailValue" v-for="value of $props.values">{{ value }}</div>
    </div>
 </template>


<style scoped>
    .detail {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        row-gap: 0;
    }

    .detailTitle {
        font-weight: bolder;
    }

    .detailValue {
        white-space: nowrap;
    }
</style>