
<script setup lang="ts">
import SearchLink from './SearchLink.vue';
import { useStorage } from '@vueuse/core';
import { FieldMetadata } from '../../FieldMetadata';


const latestVersionJql = `affectedVersion = latestReleasedVersion() AND resolution IN (Unresolved, Fixed, "Won't Fix") ORDER BY created DESC`
const recentlyFixedJql = `cf[10054] IN (Confirmed, "Community Consensus", Plausible) AND resolution IN (Fixed, "Won't Fix", "Works As Intended") ORDER BY resolved DESC`

const project = useStorage('project', [])
</script>


<template>
    <v-select :placeholder="$t(`search.project.placeholder`,$t(`field.project.label`)+': Any')" multiple :options="FieldMetadata.Select['project'].options"
            v-model="project" :reduce="(s: any) => s.key" />
    <div class="button-list">
        <SearchLink :project="project" isDefault jql="fixVersion >= earliestUnreleasedVersion() ORDER BY created DESC">Fixed bugs in next release</SearchLink>
        <SearchLink :project="project" isDefault :jql="latestVersionJql">Bugs affecting latest version</SearchLink>
        <SearchLink :project="project" isDefault jql='cf[10054] IN (Confirmed, "Community Consensus", Plausible) AND resolution = Unresolved ORDER BY created DESC'>Newest confirmed bugs</SearchLink>
        <SearchLink :project="project" isDefault jql="cf[10054] = Unconfirmed AND resolution = Unresolved ORDER BY created ASC">Oldest unconfirmed bugs</SearchLink>
        <SearchLink :project="project" isDefault jql="ORDER BY updated DESC">Recently updated bugs</SearchLink>
        <SearchLink :project="project" isDefault :jql="recentlyFixedJql">Recent resolutions by Mojang</SearchLink>
        <SearchLink :project="project" isDefault jql="resolution = Unresolved ORDER BY cf[10049] ASC">Highest priority bugs</SearchLink>
        <SearchLink :project="project" isDefault jql="resolution = Unresolved ORDER BY cf[10070] DESC">Highest voted bugs</SearchLink>
        <SearchLink :project="project" isDefault jql="(status = 'In Progress' OR assignee IS NOT EMPTY) AND resolution = Unresolved">Assigned or in progress bugs</SearchLink>
    </div>
</template>

<style scoped>
    .button-list {
        display: flex;
        flex-direction: column;
    }

    .button-list >* {
        flex-grow: 1;
    }
</style>