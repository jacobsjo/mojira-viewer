<script lang="ts">
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import { getComments } from '../api'
import { IssueFlair } from '../IssueFlair'
import Flair from './Flair.vue'
import DetailEntry from './DetailEntry.vue'
import { computed } from 'vue'
import AdfDoc from './adf/AdfDoc.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import IssueCard from './IssueCard.vue'
import { onUpdated } from 'vue'
import { useIssueCache } from '../stores/IssueCache'
import Spinner from './Spinner.vue'
import { onMounted } from 'vue'

// TODO sanitise route.params.issue


export const useIssueData = defineBasicLoader('getIssue', async (route) => {
    const issueCache = useIssueCache()

    return issueCache.getIssue(route.params.issue as string)
})

export const useComments = defineBasicLoader('getComments', async (route, context) => {
    return await getComments(route.params.issue as string)
})

function mapVersionList(versions: any[]) {
    return versions.map(version => version.name.replaceAll('Minecraft ', '').replaceAll('Snapshot ', ''))
}

</script>

<script setup lang="ts">
const route = useRoute()
const issueCache = useIssueCache()

const {
    data: issue,
    isLoading: isLoadingIssue,
    error: errorIssue,
    reload: reloadIssue,
} = useIssueData()

const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
    reload: reloadComments,
} = useComments()

const issueFlair = computed(() => IssueFlair.getIssueFlair(issue.value.fields))

const issueLinks = computed(() => {
    const linkTypes = new Map<Number, { type: any, inward: any[], outward: any[] }>()
    if (issue.value.fields.issuelinks !== undefined) {
        for (const link of issue.value.fields.issuelinks) {
            if (!linkTypes.has(link.type.id)) {
                linkTypes.set(link.type.id, { type: link.type, inward: [], outward: [] })
            }

            const type = linkTypes.get(link.type.id)!
            if (link.inwardIssue !== undefined) {
                type.inward.push(link.inwardIssue)
            } else if (link.outwardIssue !== undefined) {
                if (type.type.inward === type.type.outward){ // symetric links
                    type.inward.push(link.outwardIssue)
                } else {
                    type.outward.push(link.outwardIssue)
                }
            }
        }
    }
    return linkTypes
})

watch(
    () => route.params.issue,
    (issue) => {
        document.title = `${route.params.issue}`
        reloadIssue()
        reloadComments()
    }
)

onMounted(() => {
    document.title = `${route.params.issue}`
    reloadIssue()
    reloadComments()
})

watch(issue, (issue) => {
    if (issue !== undefined){
        document.title = `${route.params.issue}: ${issue.fields.summary}`
    }
})

onUpdated(() => {
    issueCache.update()
})

</script>

<template>
    <div id="container">
        <div v-if="isLoadingIssue" id="loading">
            <Spinner />
        </div>
        <div v-else-if="errorIssue" id="error">
            {{ errorIssue.message }}
        </div>
        <div v-else-if="issue === undefined" id="notfound">
            Issue not found
        </div>
        <div v-else id="issue">
            <div class="headline">
                <div class="key">
                    {{ route.params.issue }} <Flair :flair="issueFlair" />
                </div>
                <a :href="`https://report.bugs.mojang.com/servicedesk/customer/portal/2/${route.params.issue}`" target="_blank">View on Servicedesk</a>
            </div>
            <h1>{{ issue.fields.summary }}</h1>


            <DetailEntry title="Status" :values="[issue.fields.status.name]" />
            <DetailEntry title="Resolution" :values="[issue.fields.resolution?.name ?? 'None']" />
            <DetailEntry title="Confirmation Status" :values="[issue.fields.customfield_10054?.value]" />
            <DetailEntry title="Mojang Priority" :values="[issue.fields.customfield_10049?.value]" />
            <DetailEntry title="Affects Version(s)" :values="mapVersionList(issue.fields.versions)" />
            <DetailEntry title="Fix Version(s)" :values="mapVersionList(issue.fields.fixVersions)" />
            <DetailEntry title="Labels" :values="issue.fields.labels" />
            <DetailEntry title="Category"
                :values="issue.fields.customfield_10055?.map((category: any) => category.value) ?? []" />
            <DetailEntry title="Area" :values="[issue.fields.customfield_10051?.value]" />
            <DetailEntry title="Created" :values="[new Date(issue.fields.created).toLocaleString()]" />
            <DetailEntry title="Updated" :values="[new Date(issue.fields.updated).toLocaleString()]" />
            <DetailEntry title="Resolved" :values="[issue.fields.resolutiondate ? new Date(issue.fields.resolutiondate).toLocaleString() : '']" />
            <DetailEntry title="Votes" :values="[issue.fields.votes.votes.toString()]" />
            <DetailEntry title="Watchers" :values="[issue.fields.watches.watchCount.toString()]" />
            <DetailEntry title="ADO" :values="[issue.fields.customfield_10050]" />

            <h2>Description:</h2>
            <AdfDoc :node="issue.fields.description" />

            <h2 v-if="issueLinks.size > 0">Issue Links:</h2>
            <div class="links">
                <div class="linkType" v-for="linkType of issueLinks.values()">
                    <div class="inward" v-if="linkType.inward.length > 0">
                        <h3>{{ linkType.type.inward }}</h3>
                        <IssueCard v-for="linked of linkType.inward" :issue="linked" />
                    </div>
                    <div class="outward" v-if="linkType.outward.length > 0">
                        <h3>{{ linkType.type.outward }}</h3>
                        <IssueCard v-for="linked of linkType.outward" :issue="linked" />
                    </div>
                </div>
            </div>

            <h2>Comments:</h2>
            <div class="comments">
                <div v-if="isLoadingComments"><Spinner /></div>
                <div v-else-if="errorComments" class="comment-error">{{ errorComments.message }}</div>
                <div v-else-if="comments.length === 0">No comments</div>
                <div class="comment" v-else v-for="comment of comments">
                    <div class="header"><img class="avatar" :src="comment.author.avatarUrls['16x16']" alt="[user]"/>
                        {{ comment.author.displayName }}: <span class="time"> {{ new
            Date(comment.created).toLocaleString() }}</span></div>
                    <AdfDoc class="content" :node="comment.body" />
                </div>
            </div>
        </div>
   </div>
</template>


<style scoped>
#container {
    max-height: 100%;
    overflow-y: scroll;
}

#loading {
    padding-top: 15rem;
    font-size: 50pt;
}

#error {
    background-color: var(--error-bg-color);
    padding: 0.5rem;
}

#issue {
    text-align: left;
}

.headline {
    display: flex;
    flex-direction: row;
}

.headline .key {
    flex-grow: 1;
    font-size: 1.5rem;
    color: var(--key-color);
}

.headline a {
    text-align: right;
}

h1 {
    text-align: center
}

h2, h3{
    margin: 0.5rem 0 0.3rem 0;
    color: var(--accent2-color);
}

h2 {
    font-size: 16pt;
}

h3 {
    font-size: 12pt;
}

.comment-error {
    background-color: var(--error-bg-color);
    padding: 0.5rem;
}

.comment .header {
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem
}

.comment .avatar {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
}

.comment .time {
    font-weight: lighter;
}

.comment .content {
    padding: 0.25rem;
}
</style>
