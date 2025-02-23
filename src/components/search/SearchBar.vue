<script setup lang="ts">
    import { ref } from 'vue';
    import { useSearchResultStore } from '../../stores/SearchResultStore'
import BasicSearch from './BasicSearch.vue';
import { BasicSearchData, BasicSearchDataField } from '../../BasicSearchData';
import { watch } from 'vue';
import { reactive } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
    const defaultJql = 'resolution = Unresolved AND "created" IS NOT EMPTY ORDER BY "created" DESC'
    const route = useRoute()

    const searchResultsStore = useSearchResultStore()

    const jql = ref(defaultJql);
    const basicSearchData = reactive<BasicSearchData>({
        project: new BasicSearchDataField.Select('project', []),
        text: new BasicSearchDataField.Fuzzy('text', ''),
        search: [],
        sort: null,
        sortAsc: true
    })

    watch(basicSearchData, () => {
        jql.value = BasicSearchData.toJql(basicSearchData)
    })

    async function search(){
        searchResultsStore.search(jql.value)
        router.push({query: {
            jql: jql.value === defaultJql ? undefined : jql.value
        }})
    }

    const useJql = ref(false)

    function switchMode(){
        if (useJql.value === false){
            useJql.value = true
            return
        }

        if (updateBasicSearch()){
            useJql.value = false
        }
    }

    function updateBasicSearch(){
        const newData = BasicSearchData.tryParseJql(jql.value)
        if (newData !== undefined){
            basicSearchData.project = newData.project
            basicSearchData.text = newData.text
            basicSearchData.search = newData.search
            basicSearchData.sort = newData.sort
            basicSearchData.sortAsc = newData.sortAsc
            return true
        } else {
            return false
        }
    }

    watch(() => route.query.jql, (queryJql) => {
        if (queryJql !== undefined && queryJql !== jql.value){
            console.log("query update")
            jql.value = queryJql as string
            useJql.value = !updateBasicSearch()
            search()
        }
    })

    onMounted(async() => {
        await router.isReady()
        if (route.query.jql === undefined){
            useJql.value = !updateBasicSearch()
            search()
        }
    })

</script>

<template>
    <div id="searchBar">
        <div class="jqlSearch" v-if="useJql" >
            <label>JQL: </label>     
            <input id="jql" v-model="jql"/>
        </div>
        <BasicSearch v-else v-model="basicSearchData" />
        <div class="button search" tabindex="0" @click="search" @keypress:enter="search">Search</div>
        <div class="button mode-switcher" tabindex="0" @click="switchMode" @keypress:enter="switchMode">{{useJql ? 'Basic' : 'JQL'}}</div>
    </div>
</template>

<style scoped>
    #searchBar {
        display: flex;
        align-items: center;
        border-bottom: 1px solid black;
        padding: 0.5rem;
        gap: 0.7rem;
    }

    label {
        margin-right: 0.5rem;
    }

    select {
        width: 5rem;
        background-color: white;
        margin-right: 1rem;
    }

    .jqlSearch {
        flex-grow: 1;
        align-items: center;
        display: flex;
    }

    #jql {
        flex-grow: 1;
        height: 1.44rem;
    }

    .button {
        height: 1.6rem;
        padding: auto;
        text-align: center;
        line-height: 1.7rem;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
    }

    .button.search {
        background-color: rgb(34, 174, 221);
        width: 6rem;
    }

    .button.search:hover {
        background-color: rgb(107, 210, 245);
    }

    .button.mode-switcher {
        color: blue;
        width: 3rem;
        text-decoration: underline;
    }



</style>