<script setup lang="ts">
import { BasicSearchDataField } from '../../BasicSearchData';
import { FieldMetadata } from '../../FieldMetadata';

const query = defineModel<BasicSearchDataField.Comparison>({required: true})

const meta = FieldMetadata.Compare[query.value.field]


</script>

<template>
    <div class="selects">
        <v-select class="comp" :options="['<', '<=', '=', '>=', '>']" v-model="query.comparator" :clearable="false" :searchable="false"/>
        <v-select class="version" v-if="meta.options === 'Version'"
            :options="[
                {value:'latestReleasedVersion()', label:'Latest'},
                {value:'earliestUnreleasedVersion()', label:'Next Unreleased'}
            ]"
            label="label"
            :reduce="(version: any) => version.value"
            taggable push-tags
            :createOption="(version: string) => ({value: `'${version}'`, label: version})"
            v-model="query.value"/>
        <input type="date" class="date search-input" v-else-if="meta.options === 'Date'" v-model="query.value"/>
        <input type="number" class="number search-input" v-else v-model="query.value"/>
    </div>
</template>

<style scoped>
.selects {
    display: flex;
    align-items: center;
}

.comp {
    width: 3.5rem;
}

.version {
    width: 10rem;
}

.date {
    width: 8rem;
}

.number {
    width: 4rem;
}

.search-input {
    border-radius: 0 var(--vs-border-radius) var(--vs-border-radius) 0;
}


</style>

<style>
.comp .vs__selected-options {
    max-height: 1.72rem;
    width: 2rem;
}

.v-select.comp >div {
    border-radius: var(--vs-border-radius) 0 0 var(--vs-border-radius);
}

.v-select.version >div {
    border-radius: 0 var(--vs-border-radius) var(--vs-border-radius) 0;
}


</style>