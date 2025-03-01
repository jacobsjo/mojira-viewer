import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { search as searchApi } from '../api'
import { useIssueCache } from './IssueCache'

export const useSearchResultStore = defineStore('searchResult', () => {
    const defaultJql = 'resolution = Unresolved ORDER BY created DESC'
    
    const issueCache = useIssueCache()
    const searchResults = ref<any[]>([])
    const total = ref(0)
    const isLoading = ref(false)
    const error = ref<string>("")

    var lastSearch: string = defaultJql

    async function search(jql?: string){
        lastSearch = jql ?? lastSearch
        searchResults.value = []
        total.value = 0

        searchMore()
    }

    async function searchMore(){
        isLoading.value = true
        try {
            const response = await searchApi(lastSearch, searchResults.value.length)
            if (response.statusCode && response.statusCode >= 400){
                error.value = "Invalid search query"
            } else {
                issueCache.storeIssues(response.issues)
                searchResults.value = searchResults.value.concat(response.issues)
                total.value = response.total
                error.value = ""
            }
        } catch (e) {
            if (e instanceof Error){
                error.value = e.message
            } else {
                error.value = "unknown error during search"
            }
        }
        isLoading.value = false
    }

    const hasAll = computed(() => searchResults.value.length >= total.value)

    return {searchResults, isLoading, error, search, searchMore, hasAll, defaultJql}
})
