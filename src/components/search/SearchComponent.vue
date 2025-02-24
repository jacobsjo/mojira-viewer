<script setup lang="ts">
import SelectSearch from "./SelectSearch.vue";
import CompareSearch from "./CompareSearch.vue";
import FuzzySearch from "./FuzzySearch.vue";
import { BasicSearchDataField } from "../../BasicSearchData";
import Remove from "../icons/Remove.vue";

const searchData = defineModel<BasicSearchDataField>({required: true})
const emits = defineEmits(['delete'])
</script>

<template>
    <div class="searchComponent">
        <div class="label">{{ $t(`field.${searchData.field}.label`)}}:</div>
        <SelectSearch v-if="(searchData instanceof BasicSearchDataField.Select)" v-model="searchData" />
        <CompareSearch v-else-if="(searchData instanceof BasicSearchDataField.Comparison)" v-model="searchData" />
        <FuzzySearch v-else-if="(searchData instanceof BasicSearchDataField.Fuzzy)" v-model="searchData" />
        <button class="vs__clear" @click="emits('delete')"><Remove /></button>
    </div>
</template>

<style scoped>
.searchComponent {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
}

.label {
    font-size: 8pt;
}
</style>