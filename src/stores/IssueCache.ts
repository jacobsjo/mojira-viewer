import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getIssues } from '../api'

type CacheEntry = {
    timestamp: number,
    issue: any
}

export const useIssueCache = defineStore('issueCache', () => {
    const cache = reactive(new Map<string, CacheEntry>())
    var cacheRequests: Set<string> = new Set<string>()

    function registerInterest(key: string, maxAge: number = Number.POSITIVE_INFINITY){
        if ((!cache.has(key) || Date.now()-cache.get(key)!.timestamp > maxAge) && !cacheRequests.has(key))
            cacheRequests.add(key)
    }

    async function update(){
        while (cacheRequests.size > 0){
            const issues = await getIssues(Array.from(cacheRequests))
            storeIssues(issues)
        }
    }

    async function getIssue(key: string, maxAge: number = 1000*60*15 /* 15 Minutes */){
        registerInterest(key, maxAge)
        await update()
        return cache.get(key)?.issue
    }

    function storeIssues(issues: any[]){
        for (const issue of issues){
            cache.set(issue.key, {timestamp: Date.now(), issue: issue})
            cacheRequests.delete(issue.key)
        }
    }

    return { cache, registerInterest, update, getIssue, storeIssues }
})
