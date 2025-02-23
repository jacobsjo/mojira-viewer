<script setup lang="ts">
import { BasicSearchDataField } from '../../BasicSearchData';

const query = defineModel<BasicSearchDataField.Fuzzy>({required: true})
</script>

<template>
    <input :placeholder="$t(`search.${query.field}.placeholder`)" v-model="query.value" />
</template>

<style scoped>
.selects {
    display: flex;
}

input {
    width: 15rem;
    height: 1.44rem;
}


</style>

<style>
</style>