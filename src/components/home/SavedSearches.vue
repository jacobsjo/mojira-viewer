
<script setup lang="ts">
import { onUpdated } from 'vue';
import { useSaveStore } from '../../stores/SaveStore';
import IssueCard from '../IssueCard.vue';
import { useIssueCache } from '../../stores/IssueCache';
import { onMounted } from 'vue';
import { useSortable } from '@vueuse/integrations/useSortable'
import { useTemplateRef } from 'vue';
import SearchLink from './SearchLink.vue';
import SaveSearchButton from '../search/SaveSearchButton.vue';

const saveStore = useSaveStore()

const list = useTemplateRef<HTMLElement>('search-list')

useSortable(list, saveStore.savedSearches)

</script>

<template>
    <div class="searches" ref="search-list">
        <div class="empty" v-if="saveStore.savedSearches.length === 0">&mdash; Save searches by clicking the <font-awesome-icon :icon="['far', 'star']" /> icon &mdash;</div>
        <SearchLink v-for="search of saveStore.savedSearches" :jql="search.jql">{{search.name}}</SearchLink>
</div>
</template>

<style scoped>
.searches {
    display: flex;
    flex-direction: column;
}

.searches >* {
    flex-grow: 1;
}

</style>