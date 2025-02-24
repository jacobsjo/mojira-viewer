<script setup lang="ts">
    
    import IssueCard from './IssueCard.vue'
    import { useSearchResultStore } from '../stores/SearchResultStore'
import Spinner from './Spinner.vue';

    const searchResultsStore = useSearchResultStore()

    function loadMore(){
        searchResultsStore.searchMore()
    }
</script>

<template>
    <div id="results">
        <IssueCard v-for="issue of searchResultsStore.searchResults" :issue="issue" />
        <Spinner v-if="searchResultsStore.isLoading" />
        <div class="card more" v-if="!searchResultsStore.hasAll" @click="loadMore" @keypress:enter="loadMore" tabindex="0">
            Load more
        </div>
    </div>
</template>

<style scoped>
    #results {
        width: 25rem;
        border-right: 1px solid var(--main-border-color);
        height: 100%;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        text-align: left;
        background-color: var(--results-bg-color);
    }

    .spinner {
        font-size: 18px;
        margin-top: 1rem;
    }

    .more {
        min-height: 3.5rem;
        text-align: center;
        line-height: 3.5rem;
    }
</style>