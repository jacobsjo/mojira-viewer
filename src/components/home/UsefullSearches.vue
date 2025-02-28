
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { BasicSearchDataField } from '../../BasicSearchData';
import SelectSearch from '../search/SelectSearch.vue';
import SearchLink from './SearchLink.vue';
import { useStorage } from '@vueuse/core';
import { FieldMetadata } from '../../FieldMetadata';


const latestVersionJql = `affectedVersion = latestReleasedVersion() AND resolution IN (Unresolved, Fixed, "Won't Fix") ORDER BY created DESC`
const recentlyFixedJql = `cf[10054] != Unconfirmed AND resolution IN (Fixed, "Won't Fix", "Works As Intended") ORDER BY resolved DESC`

const project = useStorage('project', [])
</script>


<template>
    <div class="button-list">
        <h2>Usefull Searches</h2>
        <v-select :placeholder="$t(`search.project.placeholder`,$t(`field.project.label`)+': Any')" multiple :options="FieldMetadata.Select['project'].options"
            v-model="project" />
        <SearchLink :project="project" jql="fixVersion = earliestUnreleasedVersion() ORDER BY created DESC">Fixed bugs in next release</SearchLink>
        <SearchLink :project="project" :jql="latestVersionJql">Bugs affecting latest version</SearchLink>
        <SearchLink :project="project" jql="cf[10054] != Unconfirmed AND resolution = Unresolved ORDER BY created DESC">Newest confirmed bugs</SearchLink>
        <SearchLink :project="project" jql="cf[10054] = Unconfirmed AND resolution = Unresolved ORDER BY created ASC">Oldest unconfirmed bugs</SearchLink>
        <SearchLink :project="project" jql="ORDER BY updated DESC">Recently updated bugs</SearchLink>
        <SearchLink :project="project" :jql="recentlyFixedJql">Recent resolutions by Mojang</SearchLink>
        <SearchLink :project="project" jql="resolution = Unresolved ORDER BY cf[10049] ASC">Highest priority bugs</SearchLink>
        <SearchLink :project="project" jql="resolution = Unresolved ORDER BY cf[10070] DESC">Highest voted bugs</SearchLink>
        <SearchLink :project="project" jql="status = 'In Progress' OR assignee IS NOT EMPTY AND resolution = Unresolved">Assigned or in progress bugs</SearchLink>
    </div>
</template>

<style scoped>
    h2 {
        margin: 0;
    }
    .button-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    button.search {
        width: 100%;
        cursor: pointer;
    }
</style>