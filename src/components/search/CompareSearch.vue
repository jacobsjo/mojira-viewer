<script setup lang="ts">
import { BasicSearchDataField } from '../../BasicSearchData';
import { FieldMetadata } from '../../FieldMetadata';

const query = defineModel<BasicSearchDataField.Comparison>({required: true})

const meta = FieldMetadata.Compare[query.value.field]


</script>

<template>
    <div class="selects">
        {{ $t(`field.${query.field}.label`) }}&nbsp;
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
        <input type="date" class="date" v-else-if="meta.options === 'Date'" v-model="query.value"/>
        <input type="number" class="number" v-else v-model="query.value"/>
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
    height: 1.44rem;
}

.number {
    width: 4rem;
    height: 1.44rem;
}


</style>

<style>
.comp .vs__selected-options {
    max-height: 1.72rem;
    width: 2rem;
}
</style>