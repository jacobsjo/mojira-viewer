import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useSavedIssuesStore = defineStore('savedIssues', () => {
    const savedIssues = useStorage<string[]>('saved-issues', [])

    return { savedIssues }
})
