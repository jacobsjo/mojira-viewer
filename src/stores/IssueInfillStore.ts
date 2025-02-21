import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { getIssues } from '../api'

export const useIssueInfillStore = defineStore('issueInfill', () => {
    const infill = reactive(new Map<string, any>())

    var interrests: string[] = []

    function registerInfillInterest(key: string){
        if (infill.has(key) || interrests.includes(key))
            return

        interrests.push(key)
    }

    async function update(){
        if (interrests.length > 0){
            const issues = await getIssues(interrests)
            for (const issue of issues){
                infill.set(issue.key, issue)
            }
            console.log(infill)
            interrests = []
        }
    }

    return { infill, registerInfillInterest, update }
})
