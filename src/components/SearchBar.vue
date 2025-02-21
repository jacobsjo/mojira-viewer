<script setup lang="ts">
    import { ref } from 'vue';
    import { search as searchApi } from '../api'
    import { useSearchResultStore } from '../stores/SearchResultStore'

    const searchResultsStore = useSearchResultStore()

    const project = ref('MC');
    const jql = ref('');

    async function search(){
        searchResultsStore.search(project.value, jql.value)
    }

</script>

<template>
    <div id="searchBar">
        <label>Project: </label>     
        <select v-model="project">
            <option>MC</option>
            <option>MCPE</option>
        </select>
        <label>JQL: </label>     
        <input id="jql" v-model="jql"/>
        <div class="button" tabindex="0" @click="search" @keypress:enter="search">Search</div>
    </div>
</template>

<style scoped>
    #searchBar {
        display: flex;
        align-items: center;
        border-bottom: 1px solid black;
        padding: 0.5rem;
    }

    label {
        margin-right: 0.5rem;
    }

    select {
        width: 5rem;
        background-color: white;
        margin-right: 1rem;
    }

    select, input {
        border: 1px solid black;
        height: 1.6rem;
        box-sizing: border-box;
    }

    #jql {
        flex-grow: 1;
    }

    .button {
        height: 1.6rem;
        width: 6rem;
        background-color: rgb(34, 174, 221);
        padding: auto;
        text-align: center;
        line-height: 1.7rem;
        box-sizing: border-box;
        margin-left: 1rem;
        cursor: pointer;
        color: black;
    }

    .button:hover {
        background-color: rgb(107, 210, 245);
    }

</style>