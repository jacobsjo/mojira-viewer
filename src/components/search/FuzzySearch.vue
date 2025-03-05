<script setup lang="ts">
import { BasicSearchDataField } from '../../BasicSearchData';

const query = defineModel<BasicSearchDataField.Fuzzy>({required: true})

const emit = defineEmits(['search'])
</script>

<template>
    <input class="search-input" inputmode="search":placeholder="$t(`search.${query.field}.placeholder`)" @keypress.enter="emit('search')" v-model="query.value" />
</template>

<style scoped>
.selects {
    display: flex;
}

input {
    width: 15rem;
}

</style>

<style>
</style>