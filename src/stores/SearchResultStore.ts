import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { search as searchApi } from '../api'
import { useIssueCache } from './IssueCache'

export const useSearchResultStore = defineStore('searchResult', () => {
    const issueCache = useIssueCache()
    const searchResults = ref<any[]>([])
    const total = ref(0)
    const isLoading = ref(false)

    var jql: string = ''

    async function search(_jql: string){
        jql = _jql

        searchResults.value = []
        isLoading.value = true
        total.value = 0

        const response = await searchApi(jql)
        issueCache.storeIssues(response.issues)
        searchResults.value = response.issues
        isLoading.value = false
        total.value = response.total
    }

    async function searchMore(){
        isLoading.value = true
        const response = await searchApi(jql, searchResults.value.length)
        issueCache.storeIssues(response.issues)
        searchResults.value = searchResults.value.concat(response.issues)
        isLoading.value = false
        total.value = response.total
    }

    const hasAll = computed(() => searchResults.value.length >= total.value)

    return { searchResults, isLoading, search, searchMore, hasAll }
})
