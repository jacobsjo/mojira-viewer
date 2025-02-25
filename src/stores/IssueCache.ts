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

    var currentUpdate: Promise<boolean> | undefined = undefined

    function update(): Promise<boolean>{
        if (currentUpdate == undefined){
            currentUpdate = u()
        } 
        return currentUpdate

        async function u(){
            try {
                var lastSize = Number.POSITIVE_INFINITY
                while (cacheRequests.size > 0 && cacheRequests.size < lastSize){
                    lastSize = cacheRequests.size
                    const issues = await getIssues(Array.from(cacheRequests))
                    storeIssues(issues)
                }
                cacheRequests.clear()
                return true
            } catch {
                cacheRequests.clear()
                return false
            }
        }
    }

    async function getIssue(key: string, maxAge: number = 1000*60*15 /* 15 Minutes */): Promise<any>{
        registerInterest(key, maxAge)
        const sucess = await update()
        if (cache.has(key)){
            return cache.get(key)?.issue
        } else if (sucess) {
            return undefined
        } else {
            throw new TypeError('NetworkError trying to get Issue')
        }
    }

    function storeIssues(issues: any[]){
        for (const issue of issues){
            cache.set(issue.key, {timestamp: Date.now(), issue: issue})
            cacheRequests.delete(issue.key)
        }
    }

    return { cache, registerInterest, update, getIssue, storeIssues }
})
