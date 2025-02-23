<script setup lang="ts">
import { watch } from 'vue';
import { BasicSearchData, BasicSearchDataField } from '../../BasicSearchData';
import SearchComponent from './SearchComponent.vue';
import { reactive } from 'vue';
import SelectSearch from './SelectSearch.vue';
import FuzzySearch from './FuzzySearch.vue';
import { FieldMetadata } from '../../FieldMetadata';
import { ref } from 'vue';
import Arrow from '../icons/Arrow.vue';

const data = defineModel<BasicSearchData>({
    required: true
})

const moreSelection = ref([])
function addMore(field: { type: string, field: string }) {
    moreSelection.value = []

    if (Object.keys(FieldMetadata.Select).includes(field.field)) {
        data.value?.search.push(new BasicSearchDataField.Select(field.field, []))
    } else {
        data.value?.search.push(new BasicSearchDataField.Comparison(field.field, "=", ""))
    }
}
</script>

<template>
    <div class="basicSearch">
        <SelectSearch v-model="data.project" />
        <FuzzySearch v-model="data.text" />
        <SearchComponent v-for="(s, i) in data.search" :key="s.key" @delete="data.search.splice(i, 1)" v-model="data.search[i]" />
        <v-select class="more" placeholder="More"
            :options="FieldMetadata.seachable.map(f => ({ field: f, label: $t(`field.${f}.label`) }))" :clearable="false"
            v-model="moreSelection" @option:selected="addMore" />

        <div class="sort">
            <label>Sort:</label>
            <button class="sortButton" :class="{ asc: data.sortAsc }" @click="data.sortAsc = !data.sortAsc">
                <Arrow />
            </button>
            <v-select class="sortSelect" placeholder=""
                :options="FieldMetadata.sortable.map(f => ({ field: f, label: $t(`field.${f}.label`) }))"
                :reduce="(field: any) => field.field" v-model="data.sort" />
        </div>
    </div>
</template>

<style scoped>
.basicSearch {
    flex-grow: 1;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    row-gap: 0.1rem;
    font-size: smaller;
    align-items: center;

}

.more {
    width: 5rem;
}

.sort {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
}

.sortButton {
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 0.9rem;
    padding: 0;
    text-align: center;
    transition: transform 0.2s;
}

.sortButton.asc {
    transform: rotateZ(180deg);
}

.sortSelect {
    width: 10rem;
}
</style>