<script setup lang="ts">
    
    import IssueCard from './IssueCard.vue'
    import { useSearchResultStore } from '../stores/SearchResultStore'

    const searchResultsStore = useSearchResultStore()

    function loadMore(){
        searchResultsStore.searchMore()
    }
</script>

<template>
    <div id="results">
        <IssueCard v-for="issue of searchResultsStore.searchResults" :issue="issue" />
        <div class="card more" v-if="!searchResultsStore.hasAll" @click="loadMore" @keypress:enter="loadMore" tabindex="0">Load more</div>
    </div>
</template>

<style scoped>
    #results {
        width: 25rem;
        border-right: 1px solid black;
        height: 100%;
        box-sizing: border-box;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        text-align: left;
    }


    .more {
        min-height: 3.5rem;
        text-align: center;
        line-height: 3.5rem;
    }
</style>