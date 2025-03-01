import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useSaveStore = defineStore('savedIssues', () => {
    const savedIssues = useStorage<string[]>('saved-issues', [])
    const savedSearches = useStorage<{jql: string, name: string}[]>('saved-searches', [])

    return { savedIssues, savedSearches }
})
