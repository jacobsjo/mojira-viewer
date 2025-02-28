import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useSavedIssuesStore = defineStore('savedIssues', () => {
    const savedIssues = useStorage<Set<string>>('saved-issues', new Set<string>())

    return { savedIssues }
})
