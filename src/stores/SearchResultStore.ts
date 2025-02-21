import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { search as searchApi } from '../api'
import { useIssueCache } from './IssueCache'

export const useSearchResultStore = defineStore('searchResult', () => {
    const issueCache = useIssueCache()
    const searchResults = ref<any[]>([])
    const total = ref(0)

    var project: string = ''
    var jql: string = ''

    async function search(_project: string, _jql: string){
        project = _project
        jql = _jql

        const response = await searchApi(project, jql)
        issueCache.storeIssues(response.issues)
        searchResults.value = response.issues
        total.value = response.total
    }

    async function searchMore(){
        const response = await searchApi(project, jql, searchResults.value.length)
        issueCache.storeIssues(response.issues)
        searchResults.value = searchResults.value.concat(response.issues)
        total.value = response.total
    }

    const hasAll = computed(() => searchResults.value.length >= total.value)

    return { searchResults, search, searchMore, hasAll }
})
