<script setup lang="ts">
import { BasicSearchDataField } from '../../BasicSearchData';
import { FieldMetadata } from '../../FieldMetadata';

const query = defineModel<BasicSearchDataField.Select>({required: true})

const meta = FieldMetadata.Select[query.value.field]
</script>

<template>
    <v-select :placeholder="$t(`search.${query.field}.placeholder`,$t(`field.${query.field}.label`)+': Any')" multiple :options="meta.options" :taggable="meta.any ?? false"
        v-model="query.selected" />
</template>

<style scoped>
.v-select {
    min-width: 10rem;
    max-width: 20rem;
}
</style>