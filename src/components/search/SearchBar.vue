<script setup lang="ts">
import { ref } from 'vue';
import { useSearchResultStore } from '../../stores/SearchResultStore'
import { useSettingsStore } from '../../stores/SettingsStore'
import BasicSearch from './BasicSearch.vue';
import { BasicSearchData, BasicSearchDataField } from '../../BasicSearchData';
import { watch } from 'vue';
import { reactive } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
import InternalLink from '../InternalLink.vue';
import { useIsMobile } from '../../Mobile';
const defaultJql = 'resolution = Unresolved AND "created" IS NOT EMPTY ORDER BY "created" DESC'
const route = useRoute()

const searchResultsStore = useSearchResultStore()
const settingsStore = useSettingsStore()

const isMobile = useIsMobile()

const emit = defineEmits(['search'])

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

async function search(switchRoute = true) {
    searchResultsStore.search(jql.value)
    router.push({
        name: isMobile.value && switchRoute ? 'browse' : undefined,
        query: {
            jql: jql.value === defaultJql ? undefined : jql.value
        }
    })
    emit('search')
}

const useJql = ref(false)
const showNoBasicWarning = ref(false)

function switchMode() {
    if (useJql.value === false) {
        useJql.value = true
        return
    }

    if (updateBasicSearch()) {
        useJql.value = false
    } else {
        showNoBasicWarning.value = true
        setTimeout(() => showNoBasicWarning.value = false, 2000)
    }
}

function updateBasicSearch() {
    const newData = BasicSearchData.tryParseJql(jql.value)
    if (newData !== undefined) {
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
    if (queryJql !== undefined && queryJql !== jql.value) {
        console.log("query update")
        jql.value = queryJql as string
        useJql.value = !updateBasicSearch()
        search(false)
    }
})

onMounted(async () => {
    await router.isReady()
    if (route.query.jql === undefined) {
        useJql.value = !updateBasicSearch()
        search(false)
    }
})

</script>

<template>
    <div id="searchBar" :class="{mobile: isMobile}">
        <InternalLink v-if="!isMobile" class="backlink" to="/"><font-awesome-icon :icon="['fas', 'house']" /></InternalLink>
        <div class="jqlSearch" v-if="useJql">
            <label>JQL: </label>
            <input id="jql" class="search-input" v-model="jql" />
        </div>
        <BasicSearch v-else v-model="basicSearchData" />
        <div class="buttons">
            <button class="search" tabindex="0" @click="() => search()">Search</button>
            <div class="jql-switcher-wrapper">
                <button class="jql-switcher" tabindex="0" @click="switchMode">{{ useJql ? 'Basic' : 'JQL' }}</button>
                <div v-if="showNoBasicWarning" ref="noBasicTooltip" class="tooltip">
                    The current JQL query can't be represented as a basic search
                </div>
            </div>
            <button v-if="!isMobile" class="darkmode-switcher" tabindex="0" @click="settingsStore.darkMode = !settingsStore.darkMode"><font-awesome-icon :icon="['fas', settingsStore.darkMode ? 'sun' : 'moon']" /></button>
        </div>
    </div>
</template>

<style scoped>
#searchBar {
    display: flex;
    align-items: start;
    padding: 0.5rem;
    gap: 0.7rem;
}

#searchBar.mobile {
    flex-direction: column;
}

.backlink {
    width: 1.7rem;
    min-width: 1.7rem;
    height: 1.7rem;
    font-size: 1.3rem;
    color: var(--text-color);
    line-height: 1.7rem;
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

#searchBar.mobile .jqlSearch {
    width: 100%;
}

#jql {
    flex-grow: 1;
    height: 1.55rem;
}

.buttons {
    display: flex;
    gap: 0.7rem;
}

button {
    height: 1.6rem;
    padding: auto;
    text-align: center;
    line-height: 1.6rem;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 0;
    padding: 0;
    font-size: unset;
}

button.search {
    background-color: rgb(26, 34, 104);
    width: 5rem;
    min-width: 5rem;
    color: white;
    height: 1.7rem;
    border-radius: 0.3rem;
    font-weight: bolder;
    border: 1px solid rgb(212, 212, 212);
}

button.search:hover {
    background-color: rgb(48, 58, 145);
}

button.search:active {
    background-color: rgb(97, 106, 184);
}


button.jql-switcher {
    color: var(--link-color);
    width: 3rem;
    min-width: 3rem;
    text-decoration: underline;
}

button.darkmode-switcher {
    color: var(--text-color);
    width: 1.5rem;
    min-width: 1.5rem;
    text-decoration: underline;
}

.jql-switcher-wrapper {
    position: relative;
}

.jql-switcher-wrapper .tooltip {
    position: absolute;
    background-color: var(--input-bg-color);
    border: 1px solid var(--accent-color);
    padding: 0.3rem;
    border-radius: 0.3rem;
    right: -2rem;
    width: 14rem;
    top: 2.7rem;
}

#searchBar.mobile .jql-switcher-wrapper .tooltip {
    right: unset;
    left: -2rem;
}

</style>