<script setup lang="ts">
import { BasicSearchDataField } from '../../BasicSearchData';
import { FieldMetadata } from '../../FieldMetadata';

const query = defineModel<BasicSearchDataField.Select>({required: true})

const meta = FieldMetadata.Select[query.value.field]
</script>

<template>
    <v-select multiple 
        :placeholder="$t(`search.${query.field}.placeholder`,$t(`field.${query.field}.label`)+': Any')"
        :options="meta.options"
        :taggable="meta.any ?? false"
        v-model="query.selected"
        :reduce="(s: any) => (typeof s === 'string') ? s : s.key"
        :filter="(options: (string | {'key': string, 'label': string})[] , search: string) => options.filter((s: any) => (
            (typeof s === 'string')
            ? s.toLowerCase().includes(search.toLowerCase())
            : s.label.toLowerCase().includes(search.toLowerCase()) || s.key.toLowerCase().startsWith(search.toLowerCase())
        ))"
        />
</template>

<style scoped>
.v-select {
    min-width: 12rem;
    max-width: 20rem;
}
</style>