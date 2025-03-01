<script setup lang="ts">

import IssueCard from './IssueCard.vue'
import { useSearchResultStore } from '../stores/SearchResultStore'
import Spinner from './Spinner.vue';
import { onMounted } from 'vue';
import router from '../router'
import { useRoute } from 'vue-router';

const searchResultsStore = useSearchResultStore()
const route = useRoute()

onMounted(async () => {
    await router.isReady()
    searchResultsStore.search(route.query?.jql as string)
})

function loadMore() {
    console.log(searchResultsStore.error)
    searchResultsStore.searchMore()
}
</script>

<template>
    <div id="results">
        <IssueCard v-for="issue of searchResultsStore.searchResults" :issue_key="issue.key" />
        <div class="error" v-if="searchResultsStore.error !== ''">{{ searchResultsStore.error }}</div>
        <div class="spinner-container">
            <Spinner v-if="searchResultsStore.isLoading" />
        </div>
        <div class="card more" v-if="!searchResultsStore.hasAll" @click="loadMore" @keypress:enter="loadMore"
            tabindex="0">
            Load more
        </div>
    </div>
</template>

<style scoped>
#results {
    width: 25rem;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    text-align: left;
    background-color: var(--results-bg-color);
}

.error {
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    background-color: var(--error-bg-color);
}

.spinner {
    font-size: 18px;
    margin-top: 1rem;
}

.spinner-container {
    height: 2rem;
    text-align: center;
}

.more {
    min-height: 3.5rem;
    text-align: center;
    line-height: 3.5rem;
    width: 100%
}
</style>